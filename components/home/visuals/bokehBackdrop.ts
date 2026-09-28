import * as THREE from "three";

// Background field for the home canvas: vignette -> swirl -> sine -> shatter
// -> bokeh, then an output pass that tints a base colour. Shaders, parameters
// and colours follow the reference implementation this shell was recovered
// from (see .web-shader-extractor/replay-manifest.json for provenance).

const passVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const vignetteFragment = /* glsl */ `
  precision mediump float;
  varying vec2 vUv;
  uniform float uRadius;
  uniform float uFalloff;
  uniform float uDisplace;
  uniform float uSkew;
  uniform float uAngle;
  uniform vec3 uVignetteColor;
  uniform vec2 uPos;
  uniform vec2 uResolution;
  uniform vec3 uClearColor;
  uniform float uEdgeIntensity;
  mat2 rot(float a) { return mat2(cos(a), -sin(a), sin(a), cos(a)); }
  void main() {
    vec2 uv = vUv;
    vec4 color = vec4(vec3(1.0), 0.0);
    float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    float displacement = (luma - 0.5) * uDisplace * 0.5;
    vec2 aspectRatio = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 skew = vec2(uSkew, 1.0 - uSkew);
    float halfRadius = uRadius * 0.5;
    float innerEdge = halfRadius - uFalloff * halfRadius * 0.5;
    float outerEdge = halfRadius + uFalloff * halfRadius * 0.5;
    vec2 scaledUV = uv * aspectRatio * rot(uAngle * 6.28318530718) * skew;
    vec2 scaledPos = uPos * aspectRatio * rot(uAngle * 6.28318530718) * skew;
    float radius = distance(scaledUV, scaledPos);
    float falloff = smoothstep(innerEdge + displacement, outerEdge + displacement, radius);
    float brighten = max(uEdgeIntensity, 0.0);
    float darken = max(-uEdgeIntensity, 0.0);
    falloff = mix(falloff, 0.0, brighten);
    falloff = mix(falloff, 1.0, darken);
    gl_FragColor = vec4(mix(uClearColor, uVignetteColor, falloff), falloff);
  }
`;

const swirlFragment = /* glsl */ `
  precision mediump float;
  varying vec2 vUv;
  uniform vec2 uResolution;
  uniform sampler2D tInput;
  uniform float uRadius;
  uniform float uAngle;
  uniform float uPhase;
  uniform float uTime;
  uniform float uMix;
  uniform vec2 uPos;
  void main() {
    vec2 uv = vUv;
    float angle = uAngle * 10.0;
    vec2 originalUV = uv;
    uv -= uPos;
    vec2 R = vec2(uv.x * uResolution.x / uResolution.y, uv.y);
    float distanceToCenter = length(R);
    if (distanceToCenter <= uRadius) {
      float rot = atan(R.y, R.x) + angle * smoothstep(uRadius, 0.0, distanceToCenter);
      uv = vec2(cos(rot + uTime / 20.0 + uPhase * 6.28318530718), sin(rot + uTime / 20.0 + uPhase * 6.28318530718));
      uv = distanceToCenter * uv + uPos;
    }
    float t = smoothstep(0.0, uRadius, distanceToCenter);
    vec2 mixedUV = mix(uv, originalUV, t);
    gl_FragColor = texture2D(tInput, mix(vUv, mixedUV, uMix));
  }
`;

const sineFragment = /* glsl */ `
  precision mediump float;
  varying vec2 vUv;
  uniform sampler2D tInput;
  uniform float uMixRadius;
  uniform vec2 uPos;
  uniform float uFrequency;
  uniform float uAmplitude;
  uniform float uRotation;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMousePos;
  uniform float uTrackMouse;
  void main() {
    vec2 uv = vUv;
    vec2 waveCoord = vUv.xy * 2.0 - 1.0;
    float time = uTime * 0.25;
    float frequency = 20.0 * uFrequency;
    float amp = uAmplitude * 0.2;
    float waveX = sin((waveCoord.y + uPos.y) * frequency + time) * amp;
    float waveY = sin((waveCoord.x - uPos.x) * frequency + time) * amp;
    waveCoord.xy += vec2(mix(waveX, 0.0, uRotation), mix(0.0, waveY, uRotation));
    vec2 finalUV = waveCoord * 0.5 + 0.5;
    float aspectRatio = uResolution.x / uResolution.y;
    vec2 mPos = uPos + mix(vec2(0.0), uMousePos - 0.5, uTrackMouse);
    float dist = max(0.0, 1.0 - distance(uv * vec2(aspectRatio, 1.0), mPos * vec2(aspectRatio, 1.0)) * 4.0 * (1.0 - uMixRadius));
    uv = mix(uv, finalUV, dist);
    gl_FragColor = texture2D(tInput, uv);
  }
`;

const shatterFragment = /* glsl */ `
  precision mediump float;
  varying vec2 vUv;
  uniform sampler2D tInput;
  uniform float uAmount;
  uniform float uSpread;
  uniform float uAngle;
  uniform float uTime;
  uniform float uSkew;
  uniform float uCellScale;
  uniform vec2 uPos;
  uniform vec2 uResolution;
  uniform float uMixRadius;
  uniform int uMixRadiusInvert;
  uniform int uEasing;
  uniform vec2 uMousePos;
  uniform float uTrackMouse;
  uniform float uRoundness;
  vec2 random2(vec2 p) { return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453); }
  mat2 rot(float a) { return mat2(cos(a), -sin(a), sin(a), cos(a)); }
  float ease(int mode, float t) {
    if (mode == 1) return 1.0 - (1.0 - t) * (1.0 - t);
    if (mode == 2) return t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
    return t;
  }
  void main() {
    vec2 uv = vUv;
    float aspectRatio = uResolution.x / uResolution.y;
    vec2 skew = mix(vec2(1.0), vec2(1.0, 0.0), uSkew);
    vec2 st = (uv - uPos) * vec2(aspectRatio, 1.0) * uCellScale * uAmount;
    st = st * rot(uAngle * 2.0 * 3.14159265359) * skew;
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);
    float m_dist = 15.0;
    float m_dist2 = 15.0;
    vec2 m_point = vec2(0.0);
    for (int j = -1; j <= 1; j++) {
      for (int i = -1; i <= 1; i++) {
        vec2 neighbor = vec2(float(i), float(j));
        vec2 point = random2(i_st + neighbor);
        point = 0.5 + 0.5 * sin(5.0 + uTime * 0.2 + 6.2831 * point);
        vec2 diff = neighbor + point - f_st;
        float dist = length(diff);
        if (dist < m_dist) {
          m_dist2 = m_dist;
          m_dist = dist;
          m_point = point;
        } else if (dist < m_dist2) {
          m_dist2 = dist;
        }
      }
    }
    vec2 offset = (m_point * 0.2 * uSpread * 2.0) - (uSpread * 0.2);
    float cornerSoft = smoothstep(0.0, max(0.0001, uRoundness) * 2.0, m_dist2 - m_dist);
    float edgeSoft = smoothstep(0.0, max(0.0001, uRoundness), m_dist) * cornerSoft;
    offset *= edgeSoft;
    vec2 mPos = uPos + mix(vec2(0.0), uMousePos - 0.5, uTrackMouse);
    float rawDist = max(0.0, 1.0 - distance(uv * vec2(aspectRatio, 1.0), mPos * vec2(aspectRatio, 1.0)) * 4.0 * (1.0 - uMixRadius));
    if (uMixRadiusInvert == 1) rawDist = 1.0 - rawDist;
    float dist = ease(uEasing, rawDist);
    gl_FragColor = texture2D(tInput, uv + offset * dist);
  }
`;

const bokehFragment = /* glsl */ `
  precision mediump float;
  varying vec2 vUv;
  uniform sampler2D tInput;
  uniform sampler2D tBlueNoise;
  uniform float uAmount;
  uniform float uTilt;
  uniform vec2 uPos;
  uniform vec2 uResolution;
  uniform vec2 uBlueNoiseResolution;
  uniform vec2 uMousePos;
  uniform float uTrackMouse;
  #define PI2 6.28318530718
  #define ITERATIONS 32.0
  #define GOLDEN_ANGLE 2.39996323
  vec2 Sample(in float theta, inout float r) {
    r += 1.0 / r;
    return (r - 1.0) * vec2(cos(theta), sin(theta));
  }
  float getBlueNoiseOffset(vec2 st) {
    vec2 texSize = uBlueNoiseResolution;
    vec2 uv = fract(st * (uResolution / texSize) * vec2(texSize.x / texSize.y, 1.0));
    return mod((texture2D(tBlueNoise, uv).r - 0.5) * PI2, PI2);
  }
  vec4 Bokeh(sampler2D tex, vec2 uv, float blurRadius) {
    vec3 accumulatedColor = vec3(0.0);
    vec3 accumulatedWeights = vec3(0.0);
    float accumulatedAlpha = 0.0;
    float aspectRatio = uResolution.x / uResolution.y;
    vec2 basePixelSize = vec2(1.0 / aspectRatio, 1.0) * 0.04 * 0.075;
    float r = 1.0;
    float noiseOffset = (getBlueNoiseOffset(uv) - 0.5) * 0.01;
    float noiseAngle = noiseOffset * PI2;
    mat2 rotationMatrix = mat2(cos(noiseAngle), -sin(noiseAngle), sin(noiseAngle), cos(noiseAngle));
    for (float j = 0.0; j < GOLDEN_ANGLE * ITERATIONS; j += GOLDEN_ANGLE) {
      vec2 offset = Sample(j, r) * basePixelSize * blurRadius;
      float jitterAmount = 0.05 * (sin(j * 0.1) * 0.5 + 0.5);
      offset *= 1.0 + jitterAmount * sin(j * 0.7 + noiseOffset);
      vec4 colorSample = texture2D(tex, uv + rotationMatrix * offset);
      vec3 bokehWeight = vec3(5.0) + pow(colorSample.rgb, vec3(9.0)) * 150.0;
      accumulatedAlpha += colorSample.a;
      accumulatedColor += colorSample.rgb * bokehWeight;
      accumulatedWeights += bokehWeight;
    }
    return vec4(accumulatedColor / accumulatedWeights, accumulatedAlpha / ITERATIONS);
  }
  void main() {
    if (uAmount == 0.0) { gl_FragColor = vec4(0.0); return; }
    vec2 pos = uPos + mix(vec2(0.0), uMousePos - 0.5, uTrackMouse);
    float dis = distance(vUv, pos) * 1000.0;
    float tilt = mix(1.0 - dis * 0.001, dis * 0.001, uTilt);
    gl_FragColor = Bokeh(tInput, vUv, uAmount * tilt);
  }
`;

const outputFragment = /* glsl */ `
  precision mediump float;
  varying vec2 vUv;
  uniform sampler2D tInput;
  uniform vec3 uBgColor;
  uniform vec3 uOutputColor;
  uniform float uOutputMix;
  vec3 overlay(vec3 base, vec3 blend) {
    return mix(2.0 * base * blend, 1.0 - 2.0 * (1.0 - base) * (1.0 - blend), step(0.5, base));
  }
  void main() {
    vec3 base = mix(uBgColor, overlay(uBgColor, vec3(1.0)), 0.61);
    vec3 blend = clamp(texture2D(tInput, vUv).rgb + uOutputColor * 0.35, 0.0, 1.0);
    gl_FragColor = vec4(base * mix(vec3(1.0), blend, clamp(uOutputMix, 0.0, 1.0)), 1.0);
    #include <colorspace_fragment>
  }
`;

const PALETTE = {
  light: { bg: new THREE.Color("#ffead6"), vignette: new THREE.Color("#6196ff"), output: new THREE.Color("#acffb9"), outputMix: 0.65, edgeIntensity: -0.16 },
  dark: { bg: new THREE.Color("#2c4bd5"), vignette: new THREE.Color("#00000d"), output: new THREE.Color("#00344c"), outputMix: 0.95, edgeIntensity: -0.82 },
};
const RESOLUTION_SCALE = 0.3;
const MOBILE_POS = new THREE.Vector2(0.5, -0.1);

function whiteNoiseTexture(size = 128) {
  const data = new Uint8Array(size * size * 4);
  for (let i = 0; i < data.length; i += 4) {
    const v = Math.floor(255 * Math.random());
    data[i] = data[i + 1] = data[i + 2] = v;
    data[i + 3] = 255;
  }
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
}

export function createBokehBackdrop() {
  const resolution = new THREE.Vector2(1, 1);
  const time = { value: 0 };
  const pos = new THREE.Vector2(0.5, 0.5); // smoothed pointer, shared by the pointer passes
  const mouse = new THREE.Vector2(0.5, 0.5);
  const noise = whiteNoiseTexture();
  const common = () => ({ tInput: { value: null as THREE.Texture | null }, uResolution: { value: resolution }, uTime: time, uPos: { value: pos }, uMousePos: { value: mouse }, uTrackMouse: { value: 1 } });
  const make = (fragmentShader: string, uniforms: Record<string, THREE.IUniform>) => new THREE.ShaderMaterial({
    vertexShader: passVertex, fragmentShader, uniforms: { ...common(), ...uniforms },
    blending: THREE.NoBlending, depthTest: false, depthWrite: false, toneMapped: false,
  });

  const vignette = make(vignetteFragment, {
    uRadius: { value: 0.354 }, uFalloff: { value: 1 }, uDisplace: { value: 0 }, uSkew: { value: 0.54 }, uAngle: { value: 0 },
    uEdgeIntensity: { value: PALETTE.light.edgeIntensity }, uVignetteColor: { value: PALETTE.light.vignette.clone() }, uClearColor: { value: PALETTE.light.bg.clone() },
  });
  const swirl = make(swirlFragment, { uRadius: { value: 0.25 }, uAngle: { value: 0.1 }, uPhase: { value: 0 }, uMix: { value: 0.5 } });
  const sine = make(sineFragment, { uMixRadius: { value: 1 }, uFrequency: { value: 0.35 }, uAmplitude: { value: 1.18 }, uRotation: { value: 0 } });
  const shatterPos = new THREE.Vector2(0.5, 0.5);
  const shatter = make(shatterFragment, {
    uAmount: { value: 1 }, uSpread: { value: 0.9 }, uAngle: { value: -45 / 360 }, uSkew: { value: 0.9 }, uCellScale: { value: 16 },
    uMixRadius: { value: 1 }, uMixRadiusInvert: { value: 0 }, uEasing: { value: 1 }, uRoundness: { value: 0.02 },
    uPos: { value: shatterPos }, uMousePos: { value: new THREE.Vector2(0.5, 0.5) },
  });
  const bokehPos = MOBILE_POS.clone();
  const bokeh = make(bokehFragment, {
    tBlueNoise: { value: noise }, uBlueNoiseResolution: { value: new THREE.Vector2(128, 128) },
    uAmount: { value: 3.125 * 0.754 }, uTilt: { value: 0.5 }, uPos: { value: bokehPos },
  });
  const passes = [vignette, swirl, sine, shatter, bokeh];

  const output = new THREE.ShaderMaterial({
    vertexShader: passVertex, fragmentShader: outputFragment,
    uniforms: { tInput: { value: null }, uBgColor: { value: PALETTE.light.bg.clone() }, uOutputColor: { value: PALETTE.light.output.clone() }, uOutputMix: { value: PALETTE.light.outputMix } },
    depthTest: false, depthWrite: false, toneMapped: false,
  });

  const target = () => new THREE.WebGLRenderTarget(1, 1, { depthBuffer: false });
  let read = target();
  let write = target();
  const scene = new THREE.Scene();
  const camera = new THREE.Camera();
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), vignette);
  quad.frustumCulled = false;
  scene.add(quad);

  const goalBg = new THREE.Color(), goalVignette = new THREE.Color(), goalOutput = new THREE.Color();
  const pointerGoal = new THREE.Vector2(0.5, 0.5);
  let frame = 0;

  return {
    material: output,
    setSize(cssWidth: number, cssHeight: number) {
      const w = Math.max(1, Math.floor(cssWidth * RESOLUTION_SCALE));
      const h = Math.max(1, Math.floor(cssHeight * RESOLUTION_SCALE));
      resolution.set(w, h);
      read.setSize(w, h);
      write.setSize(w, h);
    },
    /**
     * pointerUv: pointer in [0,1] with y up, or null when outside the page.
     * mobile: pins every pass to the reference's resting position.
     */
    render(renderer: THREE.WebGLRenderer, elapsed: number, themeMix: number, pointerUv: THREE.Vector2 | null, mobile: boolean) {
      time.value = elapsed;
      if (mobile) {
        pos.copy(MOBILE_POS);
        mouse.copy(MOBILE_POS);
        shatterPos.copy(MOBILE_POS);
      } else {
        pointerGoal.set(0.5, 0.5);
        if (pointerUv) pointerGoal.set(THREE.MathUtils.clamp(pointerUv.x, 0, 1), THREE.MathUtils.clamp(pointerUv.y, 0, 1));
        pos.lerp(pointerGoal, pointerUv ? 0.1 : 0.05);
        mouse.copy(pos);
        shatterPos.set(0.5, 0.5);
      }
      goalBg.lerpColors(PALETTE.light.bg, PALETTE.dark.bg, themeMix);
      goalVignette.lerpColors(PALETTE.light.vignette, PALETTE.dark.vignette, themeMix);
      goalOutput.lerpColors(PALETTE.light.output, PALETTE.dark.output, themeMix);
      vignette.uniforms.uClearColor.value.lerp(goalBg, 0.1);
      vignette.uniforms.uVignetteColor.value.lerp(goalVignette, 0.1);
      vignette.uniforms.uEdgeIntensity.value = THREE.MathUtils.lerp(PALETTE.light.edgeIntensity, PALETTE.dark.edgeIntensity, themeMix);
      output.uniforms.uBgColor.value.copy(vignette.uniforms.uClearColor.value);
      output.uniforms.uOutputColor.value.lerp(goalOutput, 0.1);
      output.uniforms.uOutputMix.value = THREE.MathUtils.lerp(PALETTE.light.outputMix, PALETTE.dark.outputMix, themeMix);

      // The reference re-renders the field every second frame.
      if (frame++ % 2 === 0) {
        const previous = renderer.getRenderTarget();
        for (const pass of passes) {
          pass.uniforms.tInput.value = read.texture;
          quad.material = pass;
          renderer.setRenderTarget(write);
          renderer.render(scene, camera);
          const swap = read; read = write; write = swap;
        }
        renderer.setRenderTarget(previous);
      }
      output.uniforms.tInput.value = read.texture;
    },
    dispose() {
      passes.forEach((pass) => pass.dispose());
      output.dispose();
      read.dispose();
      write.dispose();
      noise.dispose();
      quad.geometry.dispose();
    },
  };
}
