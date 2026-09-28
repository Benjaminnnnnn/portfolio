import * as THREE from "three";

// Falling sticker field for the hero and contact sections. Particle rules
// (spawn box, wind, spin, scale in/out, unique respawn, click bursts) follow
// the reference implementation; the cursor push and pre-aged first frame
// are local additions. Rendered as one instanced atlas in the refraction
// layer, so the glass lettering bends stickers that pass behind it.

const CONFIG = {
  count: 12, spawnWidth: 32, clickSpawnWidth: 24, spawnHeight: 24, clickSpawnHeight: 24, positionY: 24,
  fallDistance: 48, zDepth: 4, zOffset: -6, windStrength: 1.8, windFrequency: 0.3, scale: 1.4, clickScale: 1.4,
  rotationSpeed: 0.8, fallSpeed: 1.8, enterDurationRatio: 0.05, maxOneShot: 384,
  // Local: cursor push.
  pushRadius: 3.4, pushStrength: 0.9, pushDamping: 3,
};
const MAX_INSTANCES = 512;

const vertexShader = /* glsl */ `
  attribute vec4 uvRect;
  varying vec2 vAtlasUv;
  void main() {
    vAtlasUv = uvRect.xy + uv * uvRect.zw;
    gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
  }
`;
const fragmentShader = /* glsl */ `
  uniform sampler2D map;
  varying vec2 vAtlasUv;
  void main() {
    vec4 color = texture2D(map, vAtlasUv);
    if (color.a < 0.01) discard;
    gl_FragColor = color;
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

type Particle = {
  x: number; y: number; z: number; startY: number; fallSpeed: number; rotation: number; rotationSpeed: number;
  scale: number; texture: number; windPhase: number; windAmplitude: number; emitAt: number; started: boolean;
  dead: boolean; oneShot: boolean; originX: number; originY: number; vx: number; vy: number;
};

type Atlas = { texture: THREE.CanvasTexture; rects: Float32Array; aspects: number[] };

const nextPow2 = (n: number) => 2 ** Math.ceil(Math.log2(Math.max(1, n)));

function buildAtlas(images: HTMLImageElement[]): Atlas {
  const w = Math.max(...images.map((i) => i.width)), h = Math.max(...images.map((i) => i.height));
  const cols = Math.ceil(Math.sqrt(images.length)), rows = Math.ceil(images.length / cols);
  const cellW = w + 4, cellH = h + 4, width = nextPow2(cols * cellW), height = nextPow2(rows * cellH);
  const canvas = document.createElement("canvas");
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const rects = new Float32Array(images.length * 4);
  const aspects: number[] = [];
  images.forEach((img, i) => {
    const x = (i % cols) * cellW + 2, y = Math.floor(i / cols) * cellH + 2;
    ctx.drawImage(img, x, y);
    rects.set([(x + 0.5) / width, 1 - (y + img.height - 0.5) / height, (img.width - 1) / width, (img.height - 1) / height], i * 4);
    aspects.push(img.width / img.height);
  });
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = false;
  texture.minFilter = texture.magFilter = THREE.LinearFilter;
  return { texture, rects, aspects };
}

function pickUnique(count: number, used: Set<number>) {
  if (used.size >= count) return Math.floor(Math.random() * count);
  const free = [...Array(count).keys()].filter((i) => !used.has(i));
  return free[Math.floor(Math.random() * free.length)];
}

function spawn(p: Particle, mode: "scroll" | "click") {
  const height = mode === "click" ? CONFIG.clickSpawnHeight : CONFIG.spawnHeight;
  const jitter = Math.min(0.5 * Math.max(height, 0), 8);
  const dy = mode === "click" ? CONFIG.positionY + (2 * Math.random() - 1) * jitter : CONFIG.positionY + Math.random() * Math.max(height, 0);
  p.x = p.originX + (Math.random() - 0.5) * (mode === "click" ? CONFIG.clickSpawnWidth : CONFIG.spawnWidth);
  p.y = p.originY + dy;
  p.z = (Math.random() - 0.5) * CONFIG.zDepth + CONFIG.zOffset;
  p.startY = p.y;
  p.fallSpeed = CONFIG.fallSpeed * (0.6 + 0.8 * Math.random());
  p.rotation = Math.random() * Math.PI * 2;
  p.rotationSpeed = (Math.random() - 0.5) * CONFIG.rotationSpeed * 2;
  p.windPhase = Math.random() * Math.PI * 2;
  p.windAmplitude = 0.3 + Math.random() * CONFIG.windStrength;
  p.dead = false; p.started = true; p.emitAt = 0; p.vx = 0; p.vy = 0;
}

const blank = (texture: number, oneShot: boolean): Particle => ({
  x: 0, y: 0, z: 0, startY: 0, fallSpeed: 0, rotation: 0, rotationSpeed: 0, scale: 1, texture, windPhase: 0,
  windAmplitude: 0, emitAt: 0, started: true, dead: false, oneShot, originX: 0, originY: 0, vx: 0, vy: 0,
});

export type StickerEmitter = { name: string; offsetY: number; active: boolean };

export function createStickerRain(urls: string[], manager?: THREE.LoadingManager) {
  const group = new THREE.Group();
  let atlas: Atlas | null = null;
  const geometry = new THREE.PlaneGeometry(2, 2);
  geometry.setAttribute("uvRect", new THREE.InstancedBufferAttribute(new Float32Array(MAX_INSTANCES * 4), 4));
  const material = new THREE.ShaderMaterial({ uniforms: { map: { value: null } }, vertexShader, fragmentShader, transparent: true, depthWrite: false, toneMapped: false });
  const mesh = new THREE.InstancedMesh(geometry, material, MAX_INSTANCES);
  mesh.frustumCulled = false;
  mesh.count = 0;
  mesh.layers.set(0);
  group.add(mesh);

  const emitters = new Map<string, { offsetY: number; active: boolean; particles: Particle[]; clock: number; lastEmit: number }>();
  const dummy = new THREE.Object3D();
  const drawList: { p: Particle; offsetY: number }[] = [];

  const loader = new THREE.ImageLoader(manager);
  Promise.all(urls.map((url) => loader.loadAsync(url))).then((images) => {
    atlas = buildAtlas(images);
    material.uniforms.map.value = atlas.texture;
  }).catch((error: unknown) => console.error("Unable to load stickers", error));

  const seed = (reducedMotion: boolean) => {
    const count = atlas!.aspects.length;
    const order = [...Array(count).keys()].sort(() => Math.random() - 0.5);
    return Array.from({ length: Math.min(CONFIG.count, count) }, (_, i) => {
      const p = blank(order[i], false);
      spawn(p, "scroll");
      // Local: start mid-fall so the section is not empty on arrival.
      const age = reducedMotion ? 0.3 + 0.45 * Math.random() : Math.random() * 0.7;
      p.y = p.startY - age * CONFIG.fallDistance;
      return p;
    });
  };

  return {
    group,
    get ready() { return atlas !== null; },
    /** Emit a burst from a world point (click). */
    burst(name: string, worldX: number, worldY: number) {
      const emitter = emitters.get(name);
      if (!emitter || !atlas) return;
      const count = atlas.aspects.length;
      let delay = 0.05 * Math.random();
      for (let i = 0; i < count; i++) {
        const p = blank(i, true);
        p.originX = worldX;
        p.originY = worldY - emitter.offsetY - CONFIG.positionY;
        p.started = false;
        p.emitAt = emitter.clock + delay;
        delay += 0.04 + 0.04 * Math.random();
        emitter.particles.push(p);
      }
      const shots = emitter.particles.filter((p) => p.oneShot);
      if (shots.length > CONFIG.maxOneShot) {
        const drop = new Set(shots.sort((a, b) => a.emitAt - b.emitAt).slice(0, shots.length - CONFIG.maxOneShot));
        emitter.particles = emitter.particles.filter((p) => !drop.has(p));
      }
    },
    /**
     * pointerWorld: cursor on the z=0 plane (null when absent); pointerSpeed:
     * world units per second, used for the local push interaction.
     */
    update(delta: number, sections: StickerEmitter[], pointerWorld: THREE.Vector3 | null, pointerSpeed: number, reducedMotion: boolean) {
      if (!atlas) return;
      const dt = Math.min(delta, 0.1);
      drawList.length = 0;
      for (const section of sections) {
        let emitter = emitters.get(section.name);
        if (!emitter) {
          emitter = { offsetY: section.offsetY, active: section.active, particles: seed(reducedMotion), clock: 0, lastEmit: 0 };
          emitters.set(section.name, emitter);
        }
        emitter.offsetY = section.offsetY;
        emitter.active = section.active;
        if (!section.active) continue;
        const motion = reducedMotion ? 0 : 1;
        emitter.clock += dt;
        const used = new Set<number>();
        for (const p of emitter.particles) if (!p.oneShot && !p.dead && p.started) used.add(p.texture);
        let removed = false;
        for (const p of emitter.particles) {
          if (!p.started) {
            if (emitter.clock < p.emitAt) continue;
            spawn(p, p.oneShot ? "click" : "scroll");
          }
          if (p.dead) { removed ||= p.oneShot; continue; }
          p.y -= p.fallSpeed * dt * motion;
          p.x += Math.sin(emitter.clock * CONFIG.windFrequency + p.windPhase) * p.windAmplitude * dt * motion;
          p.rotation += p.rotationSpeed * dt * motion;
          // Local: the moving cursor bats nearby stickers aside and spins them.
          if (pointerWorld && motion) {
            const dx = p.x - pointerWorld.x, dy = p.y + emitter.offsetY - pointerWorld.y;
            const dist = Math.hypot(dx, dy);
            if (dist < CONFIG.pushRadius && dist > 1e-3) {
              const falloff = 1 - dist / CONFIG.pushRadius;
              const kick = CONFIG.pushStrength * falloff * (0.35 + Math.min(pointerSpeed, 40) * 0.08);
              p.vx += (dx / dist) * kick;
              p.vy += (dy / dist) * kick;
              p.rotationSpeed += (dx > 0 ? 1 : -1) * falloff * Math.min(pointerSpeed, 40) * 0.01;
            }
          }
          p.x += p.vx * dt; p.y += p.vy * dt;
          const damp = Math.exp(-CONFIG.pushDamping * dt);
          p.vx *= damp; p.vy *= damp;
          p.rotationSpeed = THREE.MathUtils.clamp(p.rotationSpeed, -6, 6);
          const progress = THREE.MathUtils.clamp((p.startY - p.y) / CONFIG.fallDistance, 0, 1);
          let s = 1;
          if (progress < CONFIG.enterDurationRatio) s = progress / CONFIG.enterDurationRatio;
          else if (progress > 0.9) s = (1 - progress) / 0.1;
          p.scale = THREE.MathUtils.clamp(s, 0, 1);
          if (p.y < p.startY - CONFIG.fallDistance) {
            if (p.oneShot) { p.dead = true; removed = true; continue; }
            used.delete(p.texture);
            p.texture = pickUnique(atlas.aspects.length, used);
            used.add(p.texture);
            p.emitAt = Math.max(emitter.lastEmit, emitter.clock) + 0.04 + 0.04 * Math.random();
            emitter.lastEmit = p.emitAt;
            p.started = false;
            continue;
          }
          drawList.push({ p, offsetY: emitter.offsetY });
        }
        if (removed) emitter.particles = emitter.particles.filter((p) => !p.oneShot || !p.dead);
      }
      drawList.sort((a, b) => a.p.z - b.p.z);
      const uv = geometry.getAttribute("uvRect") as THREE.InstancedBufferAttribute;
      const n = Math.min(drawList.length, MAX_INSTANCES);
      for (let i = 0; i < n; i++) {
        const { p, offsetY } = drawList[i];
        const size = (p.oneShot ? CONFIG.clickScale : CONFIG.scale) * p.scale;
        const aspect = atlas.aspects[p.texture] ?? 1;
        dummy.position.set(p.x, p.y + offsetY, p.z);
        dummy.rotation.set(0, 0, p.rotation);
        dummy.scale.set(size * aspect, size, 1);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        const r = p.texture * 4;
        uv.setXYZW(i, atlas.rects[r], atlas.rects[r + 1], atlas.rects[r + 2], atlas.rects[r + 3]);
      }
      mesh.count = n;
      mesh.visible = n > 0;
      mesh.instanceMatrix.needsUpdate = true;
      uv.needsUpdate = true;
    },
    dispose() {
      geometry.dispose();
      material.dispose();
      atlas?.texture.dispose();
    },
  };
}
