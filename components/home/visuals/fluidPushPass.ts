import * as THREE from "three";

// Pointer "push" fluid applied to the finished frame: a small stable-fluids
// solver (curl -> vorticity/splat -> divergence -> pressure -> gradient ->
// advect) whose velocity smears the image with a spectral fringe. Shaders and
// defaults follow the reference FluidPushPass (see .web-shader-extractor).

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = position.xy * 0.5 + 0.5;
    gl_Position = vec4(position.xy, 1.0, 1.0);
  }
`;

const curl = /* glsl */ `
  uniform sampler2D uVelocity;
  uniform vec2 uTexelSize;
  varying vec2 vUv;
  void main() {
    float left = texture2D(uVelocity, vUv - vec2(uTexelSize.x, 0.0)).y;
    float right = texture2D(uVelocity, vUv + vec2(uTexelSize.x, 0.0)).y;
    float top = texture2D(uVelocity, vUv + vec2(0.0, uTexelSize.y)).x;
    float bottom = texture2D(uVelocity, vUv - vec2(0.0, uTexelSize.y)).x;
    gl_FragColor = vec4(0.5 * (right - left - top + bottom), 0.0, 0.0, 1.0);
  }
`;

const vorticity = /* glsl */ `
  uniform sampler2D uVelocity;
  uniform sampler2D uCurl;
  uniform vec2 uTexelSize;
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform vec2 uPointerDelta;
  uniform float uCurlStrength;
  uniform float uSplatRadius;
  uniform float uSplatForce;
  varying vec2 vUv;
  void main() {
    float left = abs(texture2D(uCurl, vUv - vec2(uTexelSize.x, 0.0)).x);
    float right = abs(texture2D(uCurl, vUv + vec2(uTexelSize.x, 0.0)).x);
    float top = abs(texture2D(uCurl, vUv + vec2(0.0, uTexelSize.y)).x);
    float bottom = abs(texture2D(uCurl, vUv - vec2(0.0, uTexelSize.y)).x);
    float center = texture2D(uCurl, vUv).x;
    vec2 force = vec2(top - bottom, right - left);
    float forceLength = length(force);
    force = forceLength > 0.0001 ? force / forceLength : vec2(0.0);
    force *= uCurlStrength * center;
    force.y *= -1.0;
    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity += force * 0.016;
    velocity = clamp(velocity, vec2(-1000.0), vec2(1000.0));
    vec2 mouseUv = uPointer / max(uResolution, vec2(0.0001));
    vec2 diff = vUv - mouseUv;
    diff.x *= uResolution.x / max(uResolution.y, 0.0001);
    float pointerMask = exp(-dot(diff, diff) / max(uSplatRadius, 0.0001));
    velocity += (uPointerDelta / max(uResolution, vec2(0.0001))) * pointerMask * uSplatForce;
    gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`;

const divergence = /* glsl */ `
  uniform sampler2D uVelocity;
  uniform vec2 uTexelSize;
  varying vec2 vUv;
  void main() {
    float left = texture2D(uVelocity, vUv - vec2(uTexelSize.x, 0.0)).x;
    float right = texture2D(uVelocity, vUv + vec2(uTexelSize.x, 0.0)).x;
    float top = texture2D(uVelocity, vUv + vec2(0.0, uTexelSize.y)).y;
    float bottom = texture2D(uVelocity, vUv - vec2(0.0, uTexelSize.y)).y;
    gl_FragColor = vec4(0.5 * (right - left + top - bottom), 0.0, 0.0, 1.0);
  }
`;

const clear = /* glsl */ `void main() { gl_FragColor = vec4(0.0); }`;

const pressure = /* glsl */ `
  uniform sampler2D uPressure;
  uniform sampler2D uDivergence;
  uniform vec2 uTexelSize;
  varying vec2 vUv;
  void main() {
    float left = texture2D(uPressure, vUv - vec2(uTexelSize.x, 0.0)).x;
    float right = texture2D(uPressure, vUv + vec2(uTexelSize.x, 0.0)).x;
    float top = texture2D(uPressure, vUv + vec2(0.0, uTexelSize.y)).x;
    float bottom = texture2D(uPressure, vUv - vec2(0.0, uTexelSize.y)).x;
    float d = texture2D(uDivergence, vUv).x;
    gl_FragColor = vec4((left + right + top + bottom - d) * 0.25, 0.0, 0.0, 1.0);
  }
`;

const gradient = /* glsl */ `
  uniform sampler2D uVelocity;
  uniform sampler2D uPressure;
  uniform vec2 uTexelSize;
  varying vec2 vUv;
  void main() {
    float left = texture2D(uPressure, vUv - vec2(uTexelSize.x, 0.0)).x;
    float right = texture2D(uPressure, vUv + vec2(uTexelSize.x, 0.0)).x;
    float top = texture2D(uPressure, vUv + vec2(0.0, uTexelSize.y)).x;
    float bottom = texture2D(uPressure, vUv - vec2(0.0, uTexelSize.y)).x;
    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity -= vec2(right - left, top - bottom);
    gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`;

const advect = /* glsl */ `
  uniform sampler2D uProjectedVelocity;
  uniform vec2 uTexelSize;
  uniform float uDissipation;
  varying vec2 vUv;
  void main() {
    vec2 velocity = texture2D(uProjectedVelocity, vUv).xy;
    vec2 coord = clamp(vUv - velocity * uTexelSize * 0.016, 0.0, 1.0);
    vec2 advected = texture2D(uProjectedVelocity, coord).xy;
    advected /= 1.0 + uDissipation * 0.016;
    gl_FragColor = vec4(advected, 0.0, 1.0);
  }
`;

const display = /* glsl */ `
  uniform sampler2D tDiffuse;
  uniform sampler2D uVelocity;
  uniform vec2 uSimSize;
  uniform float uDisplacementStrength;
  uniform float uChromaticBoost;
  uniform float uEffectEnabled;
  varying vec2 vUv;
  vec3 spectrum(float x) { return cos((x - vec3(0.0, 0.5, 1.0)) * vec3(0.6, 1.0, 0.5) * 3.14); }
  void main() {
    vec2 velocity = texture2D(uVelocity, vUv).xy;
    float effectEnabled = step(0.5, uEffectEnabled);
    vec2 displacement = velocity / max(uSimSize, vec2(1.0)) * uDisplacementStrength * effectEnabled;
    float velocityMagnitude = length(displacement);
    vec4 color = vec4(0.0);
    vec3 weightSum = vec3(0.0);
    for (int index = 0; index < 4; index++) {
      float t = float(index) / 3.0;
      vec3 weight = max(vec3(0.0), cos((t - vec3(0.0, 0.5, 1.0)) * 3.14159 * 0.5));
      vec4 sampleColor = texture2D(tDiffuse, clamp(vUv - displacement * 0.3 * (t + 0.3) * velocityMagnitude, 0.0, 1.0));
      color.rgb += sampleColor.rgb * weight;
      weightSum += weight;
    }
    color.rgb /= max(weightSum, vec3(0.0001));
    vec3 spectralHighlight = spectrum(sin(velocityMagnitude * 2.0) * 0.4 + 0.6);
    color.rgb += spectralHighlight * smoothstep(0.2, 0.8, velocityMagnitude) * 0.5 * uChromaticBoost * effectEnabled;
    gl_FragColor = vec4(color.rgb, 1.0);
    #include <colorspace_fragment>
  }
`;

type Options = { strength?: number; radius?: number; velocityScale?: number; chromaticStrength?: number; pressureIterations?: number; curlStrength?: number; velocityDissipation?: number; simResolution?: number };

export function createFluidPushPass({ strength = 0.3, radius = 1.5, velocityScale = 1, chromaticStrength = 0.002, pressureIterations = 4, curlStrength = 0, velocityDissipation = 3, simResolution = 160 }: Options = {}) {
  const target = () => new THREE.WebGLRenderTarget(1, 1, {
    depthBuffer: false, stencilBuffer: false, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, type: THREE.HalfFloatType,
  });
  let velocityRead = target(), velocityWrite = target();
  const curlTarget = target(), vortTarget = target(), divergenceTarget = target(), projected = target();
  let pressureA = target(), pressureB = target();
  const texel = new THREE.Vector2(1, 1);
  const resolution = new THREE.Vector2(1, 1);
  const simSize = new THREE.Vector2(simResolution, simResolution);
  const pointer = new THREE.Vector2(-1, -1);
  const pointerDelta = new THREE.Vector2();
  const make = (fragmentShader: string, uniforms: Record<string, THREE.IUniform> = {}) => new THREE.ShaderMaterial({ vertexShader: vertex, fragmentShader, uniforms, depthTest: false, depthWrite: false, transparent: false, toneMapped: false });
  const curlM = make(curl, { uVelocity: { value: null }, uTexelSize: { value: texel } });
  const vortM = make(vorticity, {
    uVelocity: { value: null }, uCurl: { value: null }, uTexelSize: { value: texel }, uResolution: { value: resolution },
    uPointer: { value: pointer }, uPointerDelta: { value: pointerDelta }, uCurlStrength: { value: curlStrength },
    uSplatRadius: { value: Math.max(0.002 * radius, 0.0005) }, uSplatForce: { value: Math.max(3000 * velocityScale, 0) },
  });
  const divM = make(divergence, { uVelocity: { value: null }, uTexelSize: { value: texel } });
  const clearM = make(clear);
  const presM = make(pressure, { uPressure: { value: null }, uDivergence: { value: null }, uTexelSize: { value: texel } });
  const gradM = make(gradient, { uVelocity: { value: null }, uPressure: { value: null }, uTexelSize: { value: texel } });
  const advM = make(advect, { uProjectedVelocity: { value: null }, uTexelSize: { value: texel }, uDissipation: { value: velocityDissipation } });
  const dispM = make(display, {
    tDiffuse: { value: null }, uVelocity: { value: null }, uSimSize: { value: simSize },
    uDisplacementStrength: { value: Math.max(strength / 0.3, 0) }, uChromaticBoost: { value: Math.max(chromaticStrength / 0.004, 0) }, uEffectEnabled: { value: 1 },
  });
  const scene = new THREE.Scene();
  const camera = new THREE.Camera();
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), dispM);
  quad.frustumCulled = false;
  scene.add(quad);
  const draw = (renderer: THREE.WebGLRenderer, material: THREE.ShaderMaterial, to: THREE.WebGLRenderTarget | null) => {
    quad.material = material;
    renderer.setRenderTarget(to);
    renderer.clear();
    renderer.render(scene, camera);
  };
  let effectEnabled = true;

  return {
    setSize(width: number, height: number) {
      const aspect = width / Math.max(height, 1);
      const simW = aspect > 1 ? Math.round(simResolution * aspect) : simResolution;
      const simH = aspect > 1 ? simResolution : Math.round(simResolution / Math.max(aspect, 1e-4));
      [velocityRead, velocityWrite, curlTarget, vortTarget, divergenceTarget, pressureA, pressureB, projected].forEach((t) => t.setSize(simW, simH));
      texel.set(1 / simW, 1 / simH);
      resolution.set(width, height);
      simSize.set(simW, simH);
    },
    /** pointerPx/deltaPx are in drawing-buffer pixels, y up. */
    setPointer(pointerPx: THREE.Vector2, deltaPx: THREE.Vector2) {
      pointer.copy(pointerPx);
      pointerDelta.copy(deltaPx);
    },
    setEffectEnabled(enabled: boolean) {
      effectEnabled = enabled;
      dispM.uniforms.uEffectEnabled.value = enabled ? 1 : 0;
    },
    render(renderer: THREE.WebGLRenderer, input: THREE.Texture) {
      if (effectEnabled) {
        curlM.uniforms.uVelocity.value = velocityRead.texture;
        draw(renderer, curlM, curlTarget);
        vortM.uniforms.uVelocity.value = velocityRead.texture;
        vortM.uniforms.uCurl.value = curlTarget.texture;
        draw(renderer, vortM, vortTarget);
        divM.uniforms.uVelocity.value = vortTarget.texture;
        draw(renderer, divM, divergenceTarget);
        draw(renderer, clearM, pressureA);
        for (let i = 0; i < pressureIterations; i++) {
          presM.uniforms.uPressure.value = pressureA.texture;
          presM.uniforms.uDivergence.value = divergenceTarget.texture;
          draw(renderer, presM, pressureB);
          [pressureA, pressureB] = [pressureB, pressureA];
        }
        gradM.uniforms.uVelocity.value = vortTarget.texture;
        gradM.uniforms.uPressure.value = pressureA.texture;
        draw(renderer, gradM, projected);
        advM.uniforms.uProjectedVelocity.value = projected.texture;
        draw(renderer, advM, velocityWrite);
        [velocityRead, velocityWrite] = [velocityWrite, velocityRead];
      }
      dispM.uniforms.tDiffuse.value = input;
      dispM.uniforms.uVelocity.value = velocityRead.texture;
      draw(renderer, dispM, null);
    },
    dispose() {
      [velocityRead, velocityWrite, curlTarget, vortTarget, divergenceTarget, pressureA, pressureB, projected].forEach((t) => t.dispose());
      [curlM, vortM, divM, clearM, presM, gradM, advM, dispM].forEach((m) => m.dispose());
      quad.geometry.dispose();
    },
  };
}
