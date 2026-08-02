"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

const vertexShader = /* glsl */ `
  varying vec3 vWorldNormal;
  varying vec3 vEyeVector;

  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vec4 mvPosition = viewMatrix * worldPos;
    gl_Position = projectionMatrix * mvPosition;
    vWorldNormal = normalize(modelMatrix * vec4(normal, 0.0)).xyz;
    vEyeVector = normalize(worldPos.xyz - cameraPosition);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform vec3 iResolution;
  uniform float iTime;
  uniform float uScrollDuration;
  uniform vec3 uAccentColor;
  uniform vec3 uStripeColorA;
  uniform vec3 uStripeColorB;
  uniform float uStripeReveal;
  uniform float uOpacity;
  uniform vec3 uLight;
  uniform float uShininess;
  uniform float uDiffuseness;
  uniform float uSpecularStrength;
  uniform float uFresnelPower;
  uniform float uFresnelStrength;
  uniform vec3 uFresnelSideDir;
  varying vec3 vWorldNormal;
  varying vec3 vEyeVector;

  float hash21(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
  }

  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }

  vec3 sampleHyperspace(vec2 fragCoord) {
    vec2 R = iResolution.xy;
    float baseScale = max(1.0, min(R.x, R.y));
    vec2 u = (fragCoord * 2.0 - R) / baseScale;
    float dur = max(uScrollDuration, 1e-4);
    float time = clamp(iTime, 0.0, dur);
    float t = clamp(time / dur, 0.0, 1.0);
    const float cellDensity = 100.0;
    vec2 polar = vec2(atan(u.y, u.x) / 3.0, length(u));
    float angleCoord = (6.0 - polar.x) * cellDensity;
    float angleId = floor(angleCoord) + 0.5;
    float angleCell = abs(fract(angleCoord) - 0.5);
    float radialCoord = (6.0 - polar.y) * cellDensity;
    vec2 q = vec2(angleId, radialCoord);
    float travel = smoothstep(0.0, 1.0, t);
    float keepProbability = mix(0.18, 1.0, travel);
    float scrollSpeed = mix(0.7, 3.6, travel);
    float trailLength = mix(2.7, 0.975, travel);
    float raySeq = fract((angleId + 0.5) * 0.61803398875);
    float keepEdge = 0.025;
    float keepMask = 1.0 - smoothstep(keepProbability - keepEdge, keepProbability + keepEdge, raySeq);
    float phaseBase = (q.y * 0.02 + q.x * 0.4) * fract(q.x * 0.61);
    vec4 spark = max(1.0 - fract(vec4(7.0, 6.0, 4.0, 0.0) * 0.02 + phaseBase + time * scrollSpeed) * trailLength, 0.0);
    float channelMix = max(max(spark.r, spark.g), spark.b);
    float edge = max(fwidth(channelMix) * 1.5, 2.0 / max(iResolution.y, 1.0));
    float star = smoothstep(0.12 - edge, 0.12 + edge, channelMix);
    const float starThinness = 0.13;
    float thinEdge = max(fwidth(angleCell) * 1.5, 0.002);
    float thinMask = 1.0 - smoothstep(starThinness - thinEdge, starThinness + thinEdge, angleCell);
    star *= thinMask * keepMask;
    float radialBoost = pow(smoothstep(0.1, 1.0, polar.y), 1.25);
    float intensity = mix(0.0, 6.5, t * 1.2);
    float stripeBlend = hash21(vec2(angleId, 19.713));
    vec3 stripeRgb = mix(uStripeColorA, uStripeColorB, stripeBlend);
    vec3 hsvA = rgb2hsv(max(uStripeColorA, vec3(1e-5)));
    vec3 hsvB = rgb2hsv(max(uStripeColorB, vec3(1e-5)));
    float dh = abs(hsvA.x - hsvB.x);
    dh = min(dh, 1.0 - dh);
    float hueBand = clamp(dh * 1.25 + 0.04, 0.07, 0.24);
    vec3 hsv = rgb2hsv(max(stripeRgb, vec3(1e-5)));
    float idHash = hash21(vec2(angleId, 6.18));
    float idHash2 = hash21(vec2(angleId, 91.7));
    float scrollPhase = time * scrollSpeed;
    float hueAnim = sin(scrollPhase * 0.52 + angleId * 0.29 + idHash * 6.2831853) * (hueBand * 0.85);
    float hueStripe = (idHash - 0.5) * hueBand * 2.0;
    hsv.x = fract(hsv.x + hueStripe + hueAnim);
    hsv.y = clamp(hsv.y * mix(0.96, 1.06, idHash2), 0.0, 1.0);
    hsv.z = clamp(hsv.z * mix(0.97, 1.05, idHash), 0.0, 1.0);
    vec3 sparkColor = hsv2rgb(hsv);
    float pulse = mix(0.78, 1.0, smoothstep(0.14, 0.5, channelMix));
    sparkColor *= pulse;
    return intensity * radialBoost * sparkColor * star;
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
    vec3 stripes = sampleHyperspace(gl_FragCoord.xy);
    float reveal = clamp(uStripeReveal, 0.0, 1.0);
    float stripeLuma = dot(stripes, vec3(0.299, 0.587, 0.114));
    float darken = smoothstep(0.0, 0.88, reveal);
    vec3 darkBase = mix(uAccentColor, vec3(0.0), darken);
    float gapMask = (1.0 - smoothstep(0.035, 0.12, stripeLuma)) * reveal;
    float crackGuard = 1.0 - smoothstep(0.68, 0.94, reveal);
    vec3 rgb = darkBase + stripes * reveal + uAccentColor * gapMask * 0.07 * crackGuard;
    vec3 normal = normalize(vWorldNormal);
    if (!gl_FrontFacing) normal = -normal;
    vec3 eyeDir = normalize(vEyeVector);
    float glossMask = mix(1.0, smoothstep(0.1, 0.48, stripeLuma), reveal);
    float specularLight = specular(uLight, normal, eyeDir, uShininess, uDiffuseness);
    rgb += specularLight * uSpecularStrength * glossMask;
    float f = fresnel(eyeDir, normal, uFresnelPower);
    float sideDot = dot(normal, normalize(uFresnelSideDir));
    float sideMask = smoothstep(-0.5, 0.5, sideDot);
    rgb += f * sideMask * vec3(uFresnelStrength) * glossMask;
    float alpha = clamp(uOpacity, 0.0, 1.0);
    if (alpha <= 0.0001) discard;
    gl_FragColor = vec4(rgb, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

const REST_SCALE = 0.1;
const REF_MARGIN_PX = 120;
const PEAK_PADDING = 1.64;
const SCALE_SMOOTHING = 32;

export function CursorMorphCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = document.getElementById("hyper");
    if (!canvas || !section) return;

    let frame = 0;
    let disposed = false;
    let cursorMesh: THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial> | null = null;
    let radius = 1;
    let currentScale = REST_SCALE;
    let scaleInitialized = false;
    let pointerInside = false;
    let lightAngle = Math.atan2(9, 4);
    const defaultLightAngle = lightAngle;
    const lightRadius = Math.hypot(4, 9);
    const pointer = new THREE.Vector2(0.5, 0.5);
    const raycaster = new THREE.Raycaster();
    const pointerPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const pointerHit = new THREE.Vector3();
    const timer = new THREE.Timer();
    timer.connect(document);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 32);

    const outer = new THREE.Group();
    const spinner = new THREE.Group();
    const counterTilt = new THREE.Group();
    outer.rotation.z = THREE.MathUtils.degToRad(45);
    counterTilt.rotation.z = THREE.MathUtils.degToRad(-45);
    outer.add(spinner);
    spinner.add(counterTilt);
    scene.add(outer);

    const uniforms = {
      iResolution: { value: new THREE.Vector3(1, 1, 1) },
      iTime: { value: 0 },
      uScrollDuration: { value: 2 },
      uOpacity: { value: 1 },
      uAccentColor: { value: new THREE.Color("#009dff") },
      uStripeColorA: { value: new THREE.Color("#009dff") },
      uStripeColorB: { value: new THREE.Color("#64c3ff") },
      uStripeReveal: { value: 0 },
      uLight: { value: new THREE.Vector3(4, 9, 0.5) },
      uShininess: { value: 120 },
      uDiffuseness: { value: 0.1 },
      uSpecularStrength: { value: 1.2 },
      uFresnelPower: { value: 1 },
      uFresnelStrength: { value: 0.24 },
      uFresnelSideDir: { value: new THREE.Vector3(-1, 1, -1) },
    };
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      toneMapped: false,
      side: THREE.FrontSide,
    });

    const loader = new GLTFLoader();
    loader.load(
      "/model/cursor.glb",
      (gltf) => {
        if (disposed) return;
        gltf.scene.updateMatrixWorld(true);
        const parts: THREE.BufferGeometry[] = [];
        gltf.scene.traverse((object) => {
          if (!(object instanceof THREE.Mesh) || !object.geometry) return;
          const geometry = object.geometry.clone();
          geometry.applyMatrix4(object.matrixWorld);
          parts.push(geometry);
        });
        const merged = mergeGeometries(parts, false);
        parts.forEach((geometry) => geometry.dispose());
        if (!merged) return;
        merged.computeBoundingBox();
        const center = merged.boundingBox?.getCenter(new THREE.Vector3()) ?? new THREE.Vector3();
        merged.translate(-center.x, -center.y, -center.z);
        merged.computeBoundingSphere();
        radius = Math.max(merged.boundingSphere?.radius ?? 1, 0.0001);
        cursorMesh = new THREE.Mesh(merged, material);
        cursorMesh.frustumCulled = false;
        cursorMesh.renderOrder = 12;
        cursorMesh.scale.setScalar(REST_SCALE);
        counterTilt.add(cursorMesh);
      },
      undefined,
      (error) => console.error("Unable to load cursor transition model", error),
    );

    const resize = () => {
      const width = Math.max(1, window.innerWidth);
      const height = Math.max(1, window.innerHeight);
      const pixelRatio = Math.min(window.devicePixelRatio, 2);
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false);
      const drawingBuffer = renderer.getDrawingBufferSize(new THREE.Vector2());
      uniforms.iResolution.value.set(drawingBuffer.x, drawingBuffer.y, pixelRatio);
      camera.aspect = width / height;
      const horizontalFov = window.innerWidth <= 760 ? 38 : 60;
      camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(horizontalFov) / 2) / camera.aspect));
      camera.updateProjectionMatrix();
    };
    const onPointerMove = (event: PointerEvent) => {
      pointer.set(event.clientX / Math.max(1, window.innerWidth), 1 - event.clientY / Math.max(1, window.innerHeight));
      pointerInside = true;
    };
    const onPointerLeave = () => { pointerInside = false; };
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    resize();

    const animate = (timestamp: number) => {
      if (disposed) return;
      timer.update(timestamp);
      const delta = Math.min(timer.getDelta(), 0.1);
      const viewportWidth = Math.max(1, window.innerWidth);
      const viewportHeight = Math.max(1, window.innerHeight);
      const rect = section.getBoundingClientRect();
      const viewportCenter = viewportHeight * 0.5;
      const visible = Boolean(cursorMesh) && rect.top < viewportHeight + Math.max(REF_MARGIN_PX * 2, 480) && rect.bottom > -REF_MARGIN_PX * 6;
      canvas.style.visibility = visible ? "visible" : "hidden";

      let reveal = 0;
      if (visible && cursorMesh) {
        const worldHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) * 0.5) * camera.position.z;
        const worldWidth = worldHeight * camera.aspect;
        const enterProgress = THREE.MathUtils.smoothstep(
          THREE.MathUtils.clamp((viewportCenter - (rect.top + REF_MARGIN_PX)) / viewportHeight, 0, 1),
          0,
          1,
        );
        const peakScale = Math.hypot(worldWidth, worldHeight) * PEAK_PADDING / radius;
        const expandedScale = THREE.MathUtils.lerp(REST_SCALE, peakScale, enterProgress);
        const shrinkEnd = viewportCenter + REF_MARGIN_PX - rect.height;
        const shrinkStart = Math.min(viewportHeight, shrinkEnd + viewportHeight);
        const beforeShrink = rect.top > shrinkStart;
        const shrinking = rect.top <= shrinkStart && rect.top > shrinkEnd;
        const shrinkProgress = rect.top <= shrinkEnd
          ? 1
          : rect.top >= shrinkStart
            ? 0
            : 1 - THREE.MathUtils.smoothstep(rect.top, shrinkEnd, shrinkStart);
        const targetScale = beforeShrink
          ? expandedScale
          : shrinking
            ? THREE.MathUtils.lerp(expandedScale, REST_SCALE, shrinkProgress)
            : REST_SCALE;
        currentScale = scaleInitialized
          ? THREE.MathUtils.damp(currentScale, targetScale, SCALE_SMOOTHING, delta)
          : targetScale;
        scaleInitialized = true;
        cursorMesh.scale.setScalar(currentScale);
        reveal = THREE.MathUtils.clamp((currentScale - REST_SCALE) / Math.max(peakScale - REST_SCALE, 0.000001), 0, 1);
        uniforms.uStripeReveal.value = reveal;
        uniforms.iTime.value = 2 * THREE.MathUtils.clamp((viewportHeight - rect.top) / Math.max(1, viewportHeight + rect.height), 0, 1);

        const topAnchor = rect.top + REF_MARGIN_PX;
        const bottomAnchor = rect.bottom - REF_MARGIN_PX;
        const screenY = beforeShrink
          ? Math.max(viewportCenter, topAnchor)
          : shrinking
            ? viewportCenter
            : Math.min(viewportCenter, bottomAnchor);
        outer.position.y = (0.5 - screenY / viewportHeight) * worldHeight;

        const spin = shrinking
          ? Math.PI + THREE.MathUtils.clamp((shrinkProgress - 0.6) / 0.4, 0, 1) * Math.PI
          : beforeShrink
            ? THREE.MathUtils.clamp(reveal / 0.4, 0, 1) * Math.PI
            : Math.PI * 2;
        spinner.rotation.y = spin;

        if (pointerInside && window.innerWidth > 760) {
          raycaster.setFromCamera(new THREE.Vector2(pointer.x * 2 - 1, pointer.y * 2 - 1), camera);
          if (raycaster.ray.intersectPlane(pointerPlane, pointerHit)) {
            const targetAngle = Math.atan2(-pointerHit.y, -pointerHit.x);
            const angleDelta = Math.atan2(Math.sin(targetAngle - lightAngle), Math.cos(targetAngle - lightAngle));
            lightAngle += angleDelta * (1 - Math.exp(-6 * delta));
          }
        } else {
          const angleDelta = Math.atan2(Math.sin(defaultLightAngle - lightAngle), Math.cos(defaultLightAngle - lightAngle));
          lightAngle += angleDelta * (1 - Math.exp(-6 * delta));
        }
        uniforms.uLight.value.set(lightRadius * Math.cos(lightAngle), lightRadius * Math.sin(lightAngle), 0.5);

        const dark = document.documentElement.dataset.theme === "dark";
        uniforms.uShininess.value = dark ? 100 : 120;
        uniforms.uDiffuseness.value = dark ? 0.05 : 0.1;
        uniforms.uFresnelPower.value = dark ? 3 : 1;
        uniforms.uFresnelStrength.value = dark ? 0.72 : 0.24;
        uniforms.uFresnelSideDir.value.set(-1, 1, -1);
      }

      const root = document.documentElement;
      root.style.setProperty("--arrow-reveal", reveal.toFixed(4));
      root.style.setProperty("--hyper-opacity", THREE.MathUtils.clamp((reveal - 0.82) / 0.18, 0, 1).toFixed(4));
      root.dataset.arrowFullscreen = reveal >= 0.5 ? "true" : "false";
      root.dataset.inverse = reveal >= 0.5 ? "true" : "false";
      renderer.clear();
      if (visible && cursorMesh) renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.documentElement.style.removeProperty("--arrow-reveal");
      document.documentElement.style.removeProperty("--hyper-opacity");
      delete document.documentElement.dataset.arrowFullscreen;
      delete document.documentElement.dataset.inverse;
      timer.dispose();
      cursorMesh?.geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="cursor-transition-canvas" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
