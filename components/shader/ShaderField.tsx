"use client";

import { useEffect, useRef } from "react";

// A soft, domain-warped aurora drawn with raw WebGL. Colors ease toward the
// `colors` prop, so a parent can retint the field (e.g. on card hover).
// Pauses offscreen; draws one still frame under prefers-reduced-motion.

const vertex = `attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }`;

const fragment = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;
uniform vec3 uA;
uniform vec3 uB;
uniform vec3 uC;
uniform float uAlpha;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.03 + 11.7; a *= 0.5; }
  return v;
}
void main() {
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes.xy) / min(uRes.x, uRes.y);
  float t = uTime * 0.045;
  vec2 q = vec2(fbm(p * 1.4 + t), fbm(p * 1.4 - t + 3.1));
  vec2 r = vec2(fbm(p * 1.8 + 2.4 * q + vec2(1.7, 9.2) + t * 1.3), fbm(p * 1.8 + 2.4 * q + vec2(8.3, 2.8) - t));
  float f = fbm(p * 1.6 + 2.2 * r + (uPointer - 0.5) * 0.35);
  vec3 col = mix(uA, uB, smoothstep(0.15, 0.85, f));
  col = mix(col, uC, smoothstep(0.35, 1.0, length(r)) * 0.8);
  float bands = smoothstep(0.25, 0.95, f + 0.35 * r.y);
  float glow = pow(bands, 1.6);
  // Keep the edges calm so content stays readable.
  float vignette = smoothstep(1.25, 0.2, length((uv - 0.5) * vec2(1.3, 1.0)));
  gl_FragColor = vec4(col, glow * vignette * uAlpha);
}`;

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

type Props = { colors: readonly [string, string, string]; className?: string; intensity?: number };

export function ShaderField({ colors, className = "", intensity = 1 }: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const target = useRef(colors.map(hexToRgb));
  target.current = colors.map(hexToRgb);

  useEffect(() => {
    const el = canvas.current;
    const gl = el?.getContext("webgl", { premultipliedAlpha: false, antialias: false, alpha: true });
    if (!el || !gl) return;
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = (name: string) => gl.getUniformLocation(program, name);
    const [uRes, uTime, uPointer, uA, uB, uC, uAlpha] = ["uRes", "uTime", "uPointer", "uA", "uB", "uC", "uAlpha"].map(u);

    const current = target.current.map((c) => [...c]);
    const pointer = [0.5, 0.5], pointerGoal = [0.5, 0.5];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = true, raf = 0, last = performance.now(), elapsed = 12;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const { width, height } = el.getBoundingClientRect();
      el.width = Math.max(1, Math.round(width * dpr * 0.5));
      el.height = Math.max(1, Math.round(height * dpr * 0.5));
      gl.viewport(0, 0, el.width, el.height);
    };
    const draw = () => {
      for (let i = 0; i < 3; i++) for (let k = 0; k < 3; k++) current[i][k] += (target.current[i][k] - current[i][k]) * 0.05;
      pointer[0] += (pointerGoal[0] - pointer[0]) * 0.04;
      pointer[1] += (pointerGoal[1] - pointer[1]) * 0.04;
      gl.uniform2f(uRes, el.width, el.height);
      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uPointer, pointer[0], pointer[1]);
      gl.uniform3fv(uA, current[0]);
      gl.uniform3fv(uB, current[1]);
      gl.uniform3fv(uC, current[2]);
      gl.uniform1f(uAlpha, intensity);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = (now: number) => {
      elapsed += Math.min(now - last, 50) / 1000;
      last = now;
      draw();
      if (visible) raf = requestAnimationFrame(loop);
    };
    const onPointer = (e: PointerEvent) => {
      pointerGoal[0] = e.clientX / window.innerWidth;
      pointerGoal[1] = 1 - e.clientY / window.innerHeight;
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduced) { last = performance.now(); raf = requestAnimationFrame(loop); }
    });
    const ro = new ResizeObserver(() => { resize(); if (reduced) draw(); });

    resize();
    if (reduced) {
      for (let i = 0; i < 3; i++) current[i] = [...target.current[i]];
      draw();
    } else {
      io.observe(el);
      window.addEventListener("pointermove", onPointer, { passive: true });
    }
    ro.observe(el);
    // Retint still frames when colors change under reduced motion.
    const retint = reduced ? window.setInterval(() => { for (let i = 0; i < 3; i++) current[i] = [...target.current[i]]; draw(); }, 400) : 0;
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.clearInterval(retint);
      window.removeEventListener("pointermove", onPointer);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [intensity]);

  return <canvas ref={canvas} className={`shader-field ${className}`} aria-hidden="true" />;
}
