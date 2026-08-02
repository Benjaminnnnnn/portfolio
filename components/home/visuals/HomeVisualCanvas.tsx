"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

const screenVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const backdropFragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uThemeMix;
  uniform vec2 uPointer;
  uniform vec2 uResolution;
  uniform vec3 uLightBg;
  uniform vec3 uLightVignette;
  uniform vec3 uLightOutput;
  uniform vec3 uDarkBg;
  uniform vec3 uDarkVignette;
  uniform vec3 uDarkOutput;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0)), f.x), f.y);
  }

  void main() {
    vec2 uv = vUv;
    vec2 warped = uv + vec2(noise(uv * 2.1), noise(uv.yx * 2.7)) * 0.12;
    float sweep = warped.x * 0.82 + warped.y * 0.7;
    float bands = sin(sweep * 10.0 - 1.5) + 0.48 * sin(sweep * 18.0 + 2.1);
    float cream = smoothstep(0.36, 1.12, bands + noise(warped * 4.0) * 0.56);
    cream = mix(cream, smoothstep(0.14, 0.74, cream), 0.72);
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 vignetteUv = (uv - uPointer) * vec2(aspect, 1.0);
    float vignette = smoothstep(0.12, 1.05, length(vignetteUv));
    vec3 lightBlue = vec3(0.70, 0.84, 0.92);
    vec3 lightWarm = vec3(1.0, 0.984, 0.925);
    vec3 lightColor = mix(lightBlue, lightWarm, cream * 0.94);
    float darkFalloff = min(mix(vignette, 1.0, 0.72), 0.82);
    vec3 darkColor = mix(uDarkBg, uDarkVignette, darkFalloff);
    vec3 color = mix(lightColor, darkColor, smoothstep(0.0, 1.0, uThemeMix));
    color += (hash(gl_FragCoord.xy + floor(uTime * 2.0)) - 0.5) * 0.014;
    gl_FragColor = vec4(color, 1.0);
  }
`;

const glassVertex = /* glsl */ `
  varying vec3 worldNormal;
  varying vec3 eyeVector;
  varying float modelLocalY;
  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vec4 mvPosition = viewMatrix * worldPos;
    gl_Position = projectionMatrix * mvPosition;
    worldNormal = normalize(modelMatrix * vec4(normal, 0.0)).xyz;
    eyeVector = normalize(worldPos.xyz - cameraPosition);
    modelLocalY = position.y;
  }
`;

const glassFragment = /* glsl */ `
  precision highp float;
  uniform float uIorR;
  uniform float uIorY;
  uniform float uIorG;
  uniform float uIorC;
  uniform float uIorB;
  uniform float uIorP;
  uniform float uSaturation;
  uniform float uChromaticAberration;
  uniform float uRefractPower;
  uniform float uFresnelPower;
  uniform float uShininess;
  uniform float uDiffuseness;
  uniform vec3 uLight;
  uniform float uBrightness;
  uniform float uContrast;
  uniform float uGamma;
  uniform float uSpecularStrength;
  uniform float uFresnelStrength;
  uniform vec3 uFresnelSideDir;
  uniform vec4 uTintColorA;
  uniform vec4 uTintColorB;
  uniform vec2 uTintLocalYRange;
  uniform float uTintEnabled;
  uniform float uTintMix;
  uniform float uTintThicknessMinAlpha;
  uniform float uTintThicknessMaxAlpha;
  uniform vec2 uScreenResolutionPx;
  uniform sampler2D uTexture;
  uniform float uSceneRefractionEnabled;
  uniform float uRgbRefraction;
  uniform int uLoop;
  varying vec3 worldNormal;
  varying vec3 eyeVector;
  varying float modelLocalY;

  float random(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  vec3 sat(vec3 rgb, float adjustment) {
    const vec3 W = vec3(0.2125, 0.7154, 0.0721);
    return mix(vec3(dot(rgb, W)), rgb, adjustment);
  }

  float fresnel(vec3 eyeDir, vec3 normal, float power) {
    return pow(1.0 - abs(dot(eyeDir, normal)), power);
  }

  float specular(vec3 light, vec3 normal, vec3 eyeDir, float shininess, float diffuseness) {
    vec3 lightVector = normalize(-light);
    vec3 halfVector = normalize(eyeDir + lightVector);
    float kDiffuse = max(0.0, dot(normal, lightVector));
    float kSpecular = pow(abs(dot(normal, halfVector)), shininess);
    return kSpecular + kDiffuse * diffuseness;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uScreenResolutionPx.xy;
    vec3 normal = normalize(worldNormal);
    if (!gl_FrontFacing) normal = -normal;
    vec3 eyeDir = normalize(eyeVector);
    vec3 color = vec3(0.0);
    float noise = random(uv) * 0.025;

    if (uSceneRefractionEnabled > 0.5) {
      if (uRgbRefraction > 0.5) {
        vec3 refractVecR = refract(eyeDir, normal, 1.0 / uIorR);
        vec3 refractVecG = refract(eyeDir, normal, 1.0 / uIorG);
        vec3 refractVecB = refract(eyeDir, normal, 1.0 / uIorB);
        for (int i = 0; i < 3; i++) {
          float slide = float(i) / float(uLoop) * 0.1 + noise;
          float offset = (uRefractPower + slide) * uChromaticAberration;
          color.r += texture2D(uTexture, uv + refractVecR.xy * offset).r;
          color.g += texture2D(uTexture, uv + refractVecG.xy * offset).g;
          color.b += texture2D(uTexture, uv + refractVecB.xy * offset).b;
        }
      } else {
        vec3 refractVecR = refract(eyeDir, normal, 1.0 / uIorR);
        vec3 refractVecY = refract(eyeDir, normal, 1.0 / uIorY);
        vec3 refractVecG = refract(eyeDir, normal, 1.0 / uIorG);
        vec3 refractVecC = refract(eyeDir, normal, 1.0 / uIorC);
        vec3 refractVecB = refract(eyeDir, normal, 1.0 / uIorB);
        vec3 refractVecP = refract(eyeDir, normal, 1.0 / uIorP);
        for (int i = 0; i < 3; i++) {
          float slide = float(i) / float(uLoop) * 0.1 + noise;
          float r = texture2D(uTexture, uv + refractVecR.xy * (uRefractPower + slide) * uChromaticAberration).r * 0.5;
          vec3 ys = texture2D(uTexture, uv + refractVecY.xy * (uRefractPower + slide) * uChromaticAberration).rgb;
          float y = (ys.r * 2.0 + ys.g * 2.0 - ys.b) / 6.0;
          float g = texture2D(uTexture, uv + refractVecG.xy * (uRefractPower + slide * 2.0) * uChromaticAberration).g * 0.5;
          vec3 cs = texture2D(uTexture, uv + refractVecC.xy * (uRefractPower + slide * 2.5) * uChromaticAberration).rgb;
          float c = (cs.g * 2.0 + cs.b * 2.0 - cs.r) / 6.0;
          float b = texture2D(uTexture, uv + refractVecB.xy * (uRefractPower + slide * 3.0) * uChromaticAberration).b * 0.5;
          vec3 ps = texture2D(uTexture, uv + refractVecP.xy * (uRefractPower + slide) * uChromaticAberration).rgb;
          float p = (ps.b * 2.0 + ps.r * 2.0 - ps.g) / 6.0;
          color += vec3(r + (2.0 * p + 2.0 * y - c) / 3.0, g + (2.0 * y + 2.0 * c - p) / 3.0, b + (2.0 * c + 2.0 * p - y) / 3.0);
        }
      }
      color /= float(uLoop);
    } else {
      color = texture2D(uTexture, uv).rgb;
    }

    color = sat(color, uSaturation) * uBrightness;
    color = (color - 0.5) * uContrast + 0.5;
    color = pow(max(color, 0.0), vec3(1.0 / max(uGamma, 0.0001)));
    float range = max(uTintLocalYRange.y - uTintLocalYRange.x, 0.00001);
    float gradient = clamp((modelLocalY - uTintLocalYRange.x) / range, 0.0, 1.0);
    vec4 tint = mix(uTintColorB, uTintColorA, gradient);
    float thicknessMask = clamp(1.0 - abs(dot(normal, eyeDir)), 0.0, 1.0);
    float tintAlpha = tint.a * mix(uTintThicknessMaxAlpha, uTintThicknessMinAlpha, thicknessMask);
    float tintK = clamp(uTintEnabled, 0.0, 1.0) * tintAlpha;
    vec3 transmittance = pow(clamp(tint.rgb, 0.001, 1.0), vec3(clamp(uTintMix, 0.01, 3.0)));
    color = mix(color, color * transmittance, tintK);
    color += specular(uLight, normal, eyeDir, uShininess, uDiffuseness) * uSpecularStrength;
    float sideMask = smoothstep(-0.5, 0.5, dot(normal, normalize(uFresnelSideDir)));
    color += fresnel(eyeDir, normal, uFresnelPower) * sideMask * uFresnelStrength;
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

const postVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = position.xy * 0.5 + 0.5;
    gl_Position = vec4(position.xy, 1.0, 1.0);
  }
`;

const flareFragment = /* glsl */ `
  precision highp float;
  uniform sampler2D tDiffuse;
  uniform vec2 uResolution;
  uniform float uStreakScale;
  uniform vec3 uTailColor;
  varying vec2 vUv;

  float luma(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }
  float brightMask(float lum) {
    float m = clamp(max(lum - 0.99, 0.0) / 0.01, 0.0, 1.0);
    m = m * m * (3.0 - 2.0 * m);
    m = pow(m, 32.0);
    float gm = clamp((m - 0.88) / 0.12, 0.0, 1.0);
    return m * gm;
  }
  vec3 sampleBright(vec2 uv) {
    vec3 c = texture2D(tDiffuse, uv).rgb;
    return c * brightMask(luma(c));
  }
  vec3 streak(vec2 dirPx) {
    vec3 acc = vec3(0.0);
    vec2 pixel = floor(vUv * uResolution);
    float h = fract(52.9829189 * fract(dot(pixel, vec2(0.06711056, 0.00583715))));
    float phase = step(0.5, h) * 0.5;
    for (int i = 1; i <= 8; i++) {
      float dist = float(i) * 1.5 + phase;
      float weight = 1.0 / (1.0 + dist * 0.22);
      weight *= weight;
      float tail = pow(clamp(dist / 8.0, 0.0, 1.0), 0.5);
      vec3 ramp = mix(vec3(1.0), uTailColor, tail);
      vec2 offset = dirPx * dist;
      acc += sampleBright(vUv + offset) * weight * ramp;
      acc += sampleBright(vUv - offset) * weight * ramp;
    }
    return acc;
  }
  void main() {
    vec3 base = texture2D(tDiffuse, vUv).rgb;
    vec2 px = (1.0 / max(uResolution, vec2(1.0))) * uStreakScale;
    vec3 flare = base * brightMask(luma(base)) * 1.2;
    const float c30 = 0.8660254;
    const float s30 = 0.5;
    flare += streak(vec2(0.0, px.y));
    flare += streak(vec2(px.x * c30, px.y * s30));
    flare += streak(vec2(px.x * c30, -px.y * s30));
    gl_FragColor = vec4(flare * 0.525, 1.0);
  }
`;

const compositeFragment = /* glsl */ `
  precision highp float;
  uniform sampler2D tBase;
  uniform sampler2D tFlare;
  varying vec2 vUv;
  void main() {
    gl_FragColor = vec4(texture2D(tBase, vUv).rgb + texture2D(tFlare, vUv).rgb, 1.0);
    #include <colorspace_fragment>
  }
`;

type HomeVisualCanvasProps = {
  onProgress?: (progress: number) => void;
  onReady?: () => void;
};

type ModelRecord = {
  group: THREE.Group;
  kind: "hello" | "cnt" | "cursor";
};

function centerObject(object: THREE.Object3D) {
  object.updateMatrixWorld(true);
  const center = new THREE.Box3().setFromObject(object).getCenter(new THREE.Vector3());
  object.position.sub(center);
}

function disposeObject(object: THREE.Object3D) {
  const disposedMaterials = new Set<THREE.Material>();
  object.traverse((node) => {
    if (!(node instanceof THREE.Mesh) && !(node instanceof THREE.Sprite)) return;
    if (node instanceof THREE.Mesh) node.geometry.dispose();
    const materials = Array.isArray(node.material) ? node.material : [node.material];
    materials.forEach((material) => {
      if (!disposedMaterials.has(material)) {
        disposedMaterials.add(material);
        material.dispose();
      }
    });
  });
}

function makeGlassMaterial(texture: THREE.Texture, screenSize: THREE.Vector2, yRange: THREE.Vector2) {
  const tintA = new THREE.Color("#009dff");
  return new THREE.ShaderMaterial({
    vertexShader: glassVertex,
    fragmentShader: glassFragment,
    side: THREE.DoubleSide,
    transparent: true,
    toneMapped: false,
    uniforms: {
      uTexture: { value: texture },
      uIorR: { value: 1.15 }, uIorY: { value: 1.16 }, uIorG: { value: 1.18 },
      uIorC: { value: 1.22 }, uIorB: { value: 1.22 }, uIorP: { value: 1.22 },
      uRefractPower: { value: 0.72 }, uChromaticAberration: { value: 0.14 },
      uSaturation: { value: 1.2 }, uShininess: { value: 120 }, uDiffuseness: { value: 0.1 },
      uFresnelPower: { value: 1 }, uBrightness: { value: 0.78 }, uContrast: { value: 0.9 },
      uGamma: { value: 1 }, uSpecularStrength: { value: 1.2 }, uFresnelStrength: { value: 0.24 },
      uFresnelSideDir: { value: new THREE.Vector3(-1, 1, -1) },
      uTintColorA: { value: new THREE.Vector4(tintA.r, tintA.g, tintA.b, 1) },
      uTintColorB: { value: new THREE.Vector4(1, 1, 1, 1) },
      uTintLocalYRange: { value: yRange }, uTintEnabled: { value: 1 }, uTintMix: { value: 1 },
      uTintThicknessMinAlpha: { value: 1 }, uTintThicknessMaxAlpha: { value: 0.92 },
      uScreenResolutionPx: { value: screenSize }, uSceneRefractionEnabled: { value: 1 },
      uRgbRefraction: { value: 1 }, uLoop: { value: 3 }, uLight: { value: new THREE.Vector3(4, 9, 0.5) },
    },
  });
}

export default function HomeVisualCanvas({ onProgress, onReady }: HomeVisualCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    let disposed = false;
    let frame = 0;
    let assetsReady = false;
    let firstFrameRendered = false;
    let readySent = false;
    let readyAt = 0;
    const models: ModelRecord[] = [];
    const glassMaterials: THREE.ShaderMaterial[] = [];
    const decorativeSprites: THREE.Sprite[] = [];
    const textures: THREE.Texture[] = [];
    const pointer = new THREE.Vector2();
    const screenSize = new THREE.Vector2(1, 1);
    const timer = new THREE.Timer();
    timer.connect(document);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.dataset.engine = `three.js r${THREE.REVISION}`;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 32);

    const refractionTarget = new THREE.WebGLRenderTarget(1, 1, {
      minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
      depthBuffer: true, stencilBuffer: false, samples: 0,
    });
    const sceneTarget = new THREE.WebGLRenderTarget(1, 1, {
      minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
      depthBuffer: true, stencilBuffer: false, samples: 0,
    });
    const flareTarget = new THREE.WebGLRenderTarget(1, 1, {
      minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
      depthBuffer: false, stencilBuffer: false,
    });
    flareTarget.texture.colorSpace = THREE.LinearSRGBColorSpace;
    const postScene = new THREE.Scene();
    const postCamera = new THREE.Camera();
    const postQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));
    postQuad.frustumCulled = false;
    postScene.add(postQuad);
    const flareMaterial = new THREE.ShaderMaterial({
      vertexShader: postVertex,
      fragmentShader: flareFragment,
      depthTest: false,
      depthWrite: false,
      toneMapped: false,
      uniforms: {
        tDiffuse: { value: sceneTarget.texture },
        uResolution: { value: screenSize },
        uStreakScale: { value: 8 },
        uTailColor: { value: new THREE.Color("#ffa300") },
      },
    });
    const compositeMaterial = new THREE.ShaderMaterial({
      vertexShader: postVertex,
      fragmentShader: compositeFragment,
      depthTest: false,
      depthWrite: false,
      toneMapped: false,
      uniforms: { tBase: { value: sceneTarget.texture }, tFlare: { value: flareTarget.texture } },
    });
    let themeMix = document.documentElement.dataset.theme === "dark" ? 1 : 0;
    const lightFlareTail = new THREE.Color("#ffa300");
    const darkFlareTail = new THREE.Color("#1600ff");
    const lightTintA = new THREE.Color("#009dff");
    const darkTintA = new THREE.Color("#64c3ff");
    const lightTintB = new THREE.Color("#ffffff");
    const darkTintB = new THREE.Color("#8e9dc4");
    const tintA = new THREE.Color();
    const tintB = new THREE.Color();
    const backdropUniforms = {
      uTime: { value: 0 },
      uThemeMix: { value: themeMix },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: screenSize },
      uLightBg: { value: new THREE.Color("#ffead6") },
      uLightVignette: { value: new THREE.Color("#6196ff") },
      uLightOutput: { value: new THREE.Color("#acffb9") },
      uDarkBg: { value: new THREE.Color("#2c4bd5") },
      uDarkVignette: { value: new THREE.Color("#00000d") },
      uDarkOutput: { value: new THREE.Color("#00344c") },
    };
    const backdrop = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({ vertexShader: screenVertex, fragmentShader: backdropFragment, uniforms: backdropUniforms, depthWrite: false, depthTest: false, toneMapped: false }),
    );
    backdrop.frustumCulled = false;
    backdrop.renderOrder = -100;
    backdrop.layers.set(0);
    scene.add(backdrop);
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
    ambientLight.layers.set(0);
    scene.add(ambientLight);
    const cursorLight = new THREE.DirectionalLight(0xffffff, 4.5);
    cursorLight.position.set(5, 8, 12);
    cursorLight.layers.set(0);
    scene.add(cursorLight);

    const manager = new THREE.LoadingManager();
    manager.onStart = () => onProgress?.(0);
    manager.onProgress = (_url, loaded, total) => onProgress?.(Math.round((loaded / Math.max(1, total)) * 100));
    manager.onLoad = () => {
      assetsReady = true;
      onProgress?.(100);
    };
    const loader = new GLTFLoader(manager);
    const textureLoader = new THREE.TextureLoader(manager);

    const loadModel = async (kind: ModelRecord["kind"], url: string) => {
      const gltf = await loader.loadAsync(url);
      if (disposed) return;
      const object = clone(gltf.scene);
      centerObject(object);
      object.traverse((node) => {
        if (!(node instanceof THREE.Mesh)) return;
        node.geometry.computeBoundingBox();
        const bounds = node.geometry.boundingBox;
        if (kind === "cursor") {
          node.material = new THREE.MeshPhysicalMaterial({ color: "#087ff0", roughness: 0.2, clearcoat: 1, clearcoatRoughness: 0.08 });
          node.layers.set(0);
        } else {
          const yRange = new THREE.Vector2(bounds?.min.y ?? 0, bounds?.max.y ?? 1);
          const glassMaterial = makeGlassMaterial(refractionTarget.texture, screenSize, yRange);
          glassMaterials.push(glassMaterial);
          node.material = glassMaterial;
          node.layers.set(10);
        }
      });
      const group = new THREE.Group();
      group.add(object);
      if (kind === "hello") {
        group.position.set(-0.1, 0, 2);
        group.rotation.y = THREE.MathUtils.degToRad(240);
        group.scale.setScalar(window.innerWidth <= 760 ? 19 : 22);
      } else if (kind === "cnt") {
        group.position.set(0, -28, 2);
        group.rotation.x = -Math.PI;
        group.scale.setScalar(19);
      } else {
        group.position.set(window.innerWidth <= 760 ? 6.6 : 11.6, window.innerWidth <= 760 ? -5.6 : -4.2, -3);
        group.rotation.z = Math.PI / 4;
        group.scale.setScalar(0.1);
      }
      scene.add(group);
      models.push({ group, kind });
    };

    const spriteSpecs = [
      ["/sticker_img/s_09.png", -6.4, 5.4, 2.1, -0.18],
      ["/sticker_img/s_10.png", -5.3, 1.9, 1.9, 0.08],
      ["/sticker_img/s_06.png", -0.2, -0.2, 1.85, 0.05],
      ["/sticker_img/s_05.png", 11.1, 4.4, 2.0, -0.08],
    ] as const;
    spriteSpecs.forEach(([url, x, y, size, rotation]) => {
      const texture = textureLoader.load(url, (loaded) => {
        loaded.colorSpace = THREE.SRGBColorSpace;
        loaded.needsUpdate = true;
      });
      textures.push(texture);
      const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false, toneMapped: false });
      material.rotation = rotation;
      const sprite = new THREE.Sprite(material);
      sprite.position.set(x, y, 0.6);
      sprite.scale.set(size, size, 1);
      sprite.layers.set(0);
      scene.add(sprite);
      decorativeSprites.push(sprite);
    });

    void Promise.all([
      loadModel("hello", "/model/hello.gltf"),
      loadModel("cnt", "/model/cnt.gltf"),
      loadModel("cursor", "/model/cursor.glb"),
    ]).catch((error: unknown) => {
      if (!disposed) console.error("Unable to load the home scene models", error);
    });

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      const safeWidth = Math.max(1, width);
      const safeHeight = Math.max(1, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(safeWidth, safeHeight, false);
      renderer.getDrawingBufferSize(screenSize);
      refractionTarget.setSize(Math.max(1, Math.floor(screenSize.x * 0.5)), Math.max(1, Math.floor(screenSize.y * 0.5)));
      sceneTarget.setSize(Math.max(1, Math.floor(screenSize.x)), Math.max(1, Math.floor(screenSize.y)));
      flareTarget.setSize(Math.max(1, Math.floor(screenSize.x * 0.5)), Math.max(1, Math.floor(screenSize.y * 0.5)));
      flareMaterial.uniforms.uStreakScale.value = 8 * (safeWidth / 1920);
      camera.aspect = safeWidth / safeHeight;
      const horizontalFov = window.innerWidth <= 760 ? 38 : 60;
      camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(horizontalFov) / 2) / camera.aspect));
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
      pointer.y = -(event.clientY / Math.max(1, window.innerHeight)) * 2 + 1;
    };
    const onPointerLeave = () => pointer.set(0, 0);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    const animate = (timestamp: number) => {
      if (disposed) return;
      timer.update(timestamp);
      const delta = Math.min(timer.getDelta(), 0.1);
      const elapsed = timer.getElapsed();
      backdropUniforms.uTime.value = elapsed;
      const dark = document.documentElement.dataset.theme === "dark";
      themeMix = THREE.MathUtils.damp(themeMix, dark ? 1 : 0, 7, delta);
      backdropUniforms.uThemeMix.value = themeMix;
      backdropUniforms.uPointer.value.set(pointer.x * 0.5 + 0.5, pointer.y * 0.5 + 0.5);
      flareMaterial.uniforms.uTailColor.value.lerpColors(
        lightFlareTail,
        darkFlareTail,
        themeMix,
      );
      tintA.lerpColors(lightTintA, darkTintA, themeMix);
      tintB.lerpColors(lightTintB, darkTintB, themeMix);
      glassMaterials.forEach((glassMaterial) => {
        const uniforms = glassMaterial.uniforms;
        uniforms.uShininess.value = THREE.MathUtils.lerp(120, 100, themeMix);
        uniforms.uDiffuseness.value = THREE.MathUtils.lerp(0.1, 0.05, themeMix);
        uniforms.uFresnelPower.value = THREE.MathUtils.lerp(1, 3, themeMix);
        uniforms.uFresnelStrength.value = THREE.MathUtils.lerp(0.24, 0.72, themeMix);
        uniforms.uTintThicknessMaxAlpha.value = THREE.MathUtils.lerp(0.92, 0.4, themeMix);
        uniforms.uTintColorA.value.set(tintA.r, tintA.g, tintA.b, 1);
        uniforms.uTintColorB.value.set(tintB.r, tintB.g, tintB.b, 1);
      });
      const root = document.getElementById("home-scroll");
      const progress = root ? root.scrollTop / Math.max(1, root.scrollHeight - root.clientHeight) : 0;
      const contactTop = document.getElementById("contact")?.getBoundingClientRect().top ?? window.innerHeight;
      const contactReveal = 1 - THREE.MathUtils.smoothstep(contactTop, 0, window.innerHeight * 0.75);
      const heroDecorOpacity = 1 - THREE.MathUtils.smoothstep(progress, 0.04, 0.12);
      decorativeSprites.forEach((sprite) => {
        sprite.material.opacity = heroDecorOpacity;
        sprite.visible = heroDecorOpacity > 0.001;
      });

      if (assetsReady && firstFrameRendered && !readySent) {
        readySent = true;
        readyAt = elapsed;
        onReady?.();
      }
      const entrance = readyAt ? Math.min(1, (elapsed - readyAt) / 1.2) : 0;
      const entranceEase = 1 - Math.pow(1 - entrance, 3);

      models.forEach(({ group, kind }) => {
        if (kind === "hello" || kind === "cnt") {
          const baseY = kind === "hello" ? (progress < 0.12 ? 0 : 24) : THREE.MathUtils.lerp(-28, 0, contactReveal);
          const floatY = 0.18 * Math.sin(1.2 * elapsed) + 0.06 * Math.sin(0.6 * elapsed);
          group.position.y = THREE.MathUtils.damp(group.position.y, baseY + floatY, 5, delta);
          const baseRotation = kind === "hello" ? THREE.MathUtils.lerp(THREE.MathUtils.degToRad(240), THREE.MathUtils.degToRad(4), entranceEase) : -Math.PI;
          group.rotation.y = THREE.MathUtils.damp(group.rotation.y, baseRotation + pointer.x * 0.1 + progress * Math.PI * 0.3, 4, delta);
          group.rotation.x = THREE.MathUtils.damp(group.rotation.x, (kind === "cnt" ? -Math.PI : 0) + pointer.y * -0.06, 4, delta);
          group.position.x = (kind === "hello" ? -0.1 : 0) + pointer.x * 0.2;
        } else {
          const cursorX = window.innerWidth <= 760 ? 6.6 : 11.6;
          const cursorY = window.innerWidth <= 760 ? -5.6 : -4.2;
          group.position.x = cursorX + pointer.x * 0.35;
          group.position.y = (progress < 0.12 ? cursorY : -24) + pointer.y * 0.25 + Math.sin(elapsed * 1.2) * 0.06;
          group.rotation.y = pointer.x * 0.2;
        }
      });

      camera.position.z = THREE.MathUtils.lerp(32, 24, entranceEase);
      camera.position.x = THREE.MathUtils.damp(camera.position.x, -pointer.x * 1.4, 3.2, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, -pointer.y * 0.84, 3.2, delta);
      camera.lookAt(-pointer.x * 0.12, -pointer.y * 0.12, 0);

      const previousMask = camera.layers.mask;
      camera.layers.set(0);
      renderer.setRenderTarget(refractionTarget);
      renderer.clear();
      renderer.render(scene, camera);
      camera.layers.mask = previousMask;
      camera.layers.enable(0);
      camera.layers.enable(10);
      renderer.setRenderTarget(sceneTarget);
      renderer.clear();
      renderer.render(scene, camera);
      postQuad.material = flareMaterial;
      renderer.setRenderTarget(flareTarget);
      renderer.clear();
      renderer.render(postScene, postCamera);
      postQuad.material = compositeMaterial;
      renderer.setRenderTarget(null);
      renderer.clear();
      renderer.render(postScene, postCamera);
      firstFrameRendered = true;
      frame = requestAnimationFrame(animate);
    };
    camera.layers.enable(0);
    camera.layers.enable(10);
    frame = requestAnimationFrame(animate);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      resizeObserver.disconnect();
      timer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Sprite) object.material.dispose();
      });
      models.forEach(({ group }) => disposeObject(group));
      textures.forEach((texture) => texture.dispose());
      backdrop.geometry.dispose();
      backdrop.material.dispose();
      refractionTarget.dispose();
      sceneTarget.dispose();
      flareTarget.dispose();
      postQuad.geometry.dispose();
      flareMaterial.dispose();
      compositeMaterial.dispose();
      renderer.dispose();
    };
  }, [onProgress, onReady]);

  return (
    <div className="home-scene" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
