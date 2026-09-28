// Checks the home background chain, fluid push and glass light by observing
// real WebGL uniform uploads (no production debug API).
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { chromium } from "playwright-core";

const origin = process.argv[2] ?? "http://127.0.0.1:3109";
const output = "artifacts/hero-shader";
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: ["--use-angle=metal", "--enable-webgl", "--ignore-gpu-blocklist"],
});
const errors = [];
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  await page.addInitScript(() => {
    window.localStorage.setItem("theme", "light");
    window.localStorage.setItem("sound", "off");
    window.__gl = { effectEnabled: [], shatter: 0, bokeh: 0, vignettePos: [0.5, 0.5], light: [0, 0, 0] };
    const names = new WeakMap();
    const proto = window.WebGL2RenderingContext.prototype;
    const getLocation = proto.getUniformLocation;
    proto.getUniformLocation = function (program, name) {
      const location = getLocation.call(this, program, name);
      if (location) names.set(location, name);
      return location;
    };
    const u1f = proto.uniform1f;
    proto.uniform1f = function (location, value) {
      const name = names.get(location);
      if (name === "uEffectEnabled") window.__gl.effectEnabled.push(value);
      if (name === "uCellScale") window.__gl.shatter += 1;
      if (name === "uTilt") window.__gl.bokeh += 1;
      return u1f.call(this, location, value);
    };
    const u2f = proto.uniform2f;
    proto.uniform2f = function (location, x, y) {
      if (names.get(location) === "uPos") window.__gl.vignettePos = [x, y];
      return u2f.call(this, location, x, y);
    };
    const u3f = proto.uniform3f;
    proto.uniform3f = function (location, x, y, z) {
      if (names.get(location) === "uLight") window.__gl.light = [x, y, z];
      return u3f.call(this, location, x, y, z);
    };
  });
  await page.goto(origin, { waitUntil: "networkidle" });
  await page.locator(".home-root.intro-ready").waitFor({ timeout: 30000 });
  await page.waitForTimeout(2000);
  const idle = await page.evaluate(() => ({ ...window.__gl, effectEnabled: window.__gl.effectEnabled.slice(-5) }));
  assert.ok(idle.shatter > 0 && idle.bokeh > 0, "Background chain passes (shatter, bokeh) are not running");
  // three.js uploads a uniform only when it changes, so check the latest value.
  assert.ok(idle.effectEnabled.at(-1) !== 1, "Fluid push is on before the pointer moves");
  await page.screenshot({ path: `${output}/hero-idle.png` });

  for (let i = 0; i <= 20; i++) { await page.mouse.move(400 + i * 30, 460); await page.waitForTimeout(16); }
  const moving = await page.evaluate(() => ({ ...window.__gl, effectEnabled: window.__gl.effectEnabled.slice(-3) }));
  assert.ok(moving.effectEnabled.includes(1), "Fluid push did not turn on while the pointer moved");
  await page.screenshot({ path: `${output}/hero-drag.png` });
  await page.waitForTimeout(1500);
  const settled = await page.evaluate(() => ({ ...window.__gl, effectEnabled: window.__gl.effectEnabled.slice(-3) }));
  assert.equal(settled.effectEnabled.at(-1), 0, "Fluid push stayed on after the pointer stopped");
  assert.ok(settled.vignettePos[0] > 0.6, `Vignette did not follow the pointer to the right: ${settled.vignettePos}`);
  const lightRight = settled.light;
  await page.mouse.move(200, 200);
  await page.waitForTimeout(1500);
  const lightLeft = await page.evaluate(() => window.__gl.light);
  assert.ok(Math.hypot(lightLeft[0] - lightRight[0], lightLeft[1] - lightRight[1]) > 0.5, "Glass light did not follow the pointer");

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.evaluate(() => { window.__gl.effectEnabled = []; });
  for (let i = 0; i <= 10; i++) { await page.mouse.move(400 + i * 40, 500); await page.waitForTimeout(16); }
  assert.ok(await page.evaluate(() => window.__gl.effectEnabled.every((v) => v === 0)), "Reduced motion still runs the fluid push");
  await page.emulateMedia({ reducedMotion: "no-preference" });

  await page.keyboard.press("d");
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `${output}/hero-dark.png` });
  assert.deepEqual(errors, []);
  const result = { backgroundChain: "passed", fluidOnMove: "passed", fluidIdleOff: "passed", vignetteFollowsPointer: "passed", lightFollowsPointer: "passed", reducedMotion: "passed", errors };
  await fs.writeFile(`${output}/verification.json`, JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
}
