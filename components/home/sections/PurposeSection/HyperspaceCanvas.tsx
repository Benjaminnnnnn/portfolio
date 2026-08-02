"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform vec3 iResolution;
  uniform float iTime;
  uniform float uScrollDuration;
  uniform vec3 uStripeColorA;
  uniform vec3 uStripeColorB;

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

  void main() {
    gl_FragColor = vec4(sampleHyperspace(gl_FragCoord.xy), 1.0);
    #include <colorspace_fragment>
  }
`;

export function HyperspaceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    const section = canvas?.closest<HTMLElement>("#hyper");
    if (!canvas || !container || !section) return;

    let frame = 0;
    let disposed = false;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: "high-performance" });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector3(1440, 900, 1) },
      uScrollDuration: { value: 2 },
      uStripeColorA: { value: new THREE.Color("#009dff") },
      uStripeColorB: { value: new THREE.Color("#64c3ff") },
    };
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, depthTest: false, depthWrite: false, toneMapped: false }),
    );
    plane.frustumCulled = false;
    scene.add(plane);
    const timer = new THREE.Timer();
    timer.connect(document);

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio, 1.5);
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(Math.max(1, width), Math.max(1, height), false);
      uniforms.iResolution.value.set(Math.max(1, width) * pixelRatio, Math.max(1, height) * pixelRatio, pixelRatio);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const animate = (timestamp: number) => {
      if (disposed) return;
      timer.update(timestamp);
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      uniforms.iTime.value = THREE.MathUtils.clamp((-rect.top / travel) * 2, 0, 2);
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      timer.dispose();
      plane.geometry.dispose();
      plane.material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="hyper-canvas" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
