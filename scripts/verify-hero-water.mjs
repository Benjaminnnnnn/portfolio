import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { chromium } from "playwright-core";

const origin = process.argv[2] ?? "http://127.0.0.1:3109";
const output = "artifacts/hero-water";
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
  // Observe actual GPU uploads without adding a production debug API.
  await page.addInitScript(() => {
    window.localStorage.setItem("theme", "light");
    window.localStorage.setItem("sound", "off");
    window.__water = { strength: 0, time: 0, pointer: [0.5, 0.5], seen: false };
    const locations = new WeakMap();
    const prototype = window.WebGL2RenderingContext.prototype;
    const getLocation = prototype.getUniformLocation;
    prototype.getUniformLocation = function (program, name) {
      const location = getLocation.call(this, program, name);
      if (location) locations.set(location, name);
      return location;
    };
    const uniform1f = prototype.uniform1f;
    prototype.uniform1f = function (location, value) {
      const name = locations.get(location);
      if (name === "uWaterStrength" && value > 0) {
        window.__water.strength = value;
        window.__water.seen = true;
        window.__water.updatedAt = performance.now();
      }
      if (name === "uWaterTime" && value > 0) window.__water.time = value;
      return uniform1f.call(this, location, value);
    };
    const uniform2f = prototype.uniform2f;
    prototype.uniform2f = function (location, x, y) {
      if (locations.get(location) === "uWaterPointer") window.__water.pointer = [x, y];
      return uniform2f.call(this, location, x, y);
    };
  });
  await page.goto(origin, { waitUntil: "networkidle" });
  await page.locator(".home-root.intro-ready").waitFor({ timeout: 30000 });
  await page.waitForTimeout(2500);
  assert.equal(await page.evaluate(() => window.__water.seen), false, "Water should be off before pointer movement");
  await page.screenshot({ path: `${output}/hero-idle.png` });
  await page.mouse.move(680, 420);
  await page.waitForTimeout(1500);
  const hover = await page.evaluate(() => ({ ...window.__water }));
  assert.ok(hover.strength > 0.95, "Hover strength was not uploaded to the shader");
  await page.screenshot({ path: `${output}/hero-hover-a.png` });
  await page.waitForTimeout(700);
  assert.ok(await page.evaluate((time) => window.__water.time > time, hover.time), "Water waves are not animated");
  await page.screenshot({ path: `${output}/hero-hover-b.png` });
  await page.mouse.move(1050, 450);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${output}/hero-hover-right.png` });
  await page.keyboard.press("d");
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `${output}/hero-hover-dark.png` });
  await page.evaluate(() => window.dispatchEvent(new window.Event("blur")));
  await page.waitForTimeout(2200);
  assert.ok(await page.evaluate(() => window.__water.strength < 0.005), "Shimmer did not fade after leaving");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.evaluate(() => { window.__water.seen = false; });
  await page.mouse.move(680, 420);
  await page.waitForTimeout(700);
  assert.equal(await page.evaluate(() => window.__water.seen), false, "Reduced motion still uploads an active shimmer");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  // Let media-query ScrollTrigger refreshes settle before changing sections.
  await page.waitForTimeout(600);
  await page.locator("#home-scroll").evaluate((scroller) => scroller.scrollTo({ top: scroller.scrollHeight, behavior: "instant" }));
  await page.waitForTimeout(3000);
  await page.evaluate(() => { window.__water.seen = false; });
  await page.mouse.move(700, 450);
  await page.waitForTimeout(1500);
  const contactState = await page.evaluate(() => ({ ...window.__water, scrollTop: document.getElementById("home-scroll").scrollTop, height: document.getElementById("home-scroll").clientHeight }));
  assert.ok(contactState.scrollTop > contactState.height, "Test did not reach the contact section");
  await page.screenshot({ path: `${output}/contact-no-water.png` });
  assert.ok(!contactState.seen || contactState.strength < 0.005, `Water effect remained active outside the hero: ${JSON.stringify(contactState)}`);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.keyboard.press("t");
  await page.waitForTimeout(3000);
  await page.evaluate(() => window.dispatchEvent(new window.PointerEvent("pointermove", { clientX: 195, clientY: 420, pointerType: "touch" })));
  await page.waitForTimeout(2200);
  assert.ok(await page.evaluate(() => window.__water.strength < 0.005), "Touch input left a stuck hover");
  await page.screenshot({ path: `${output}/hero-mobile.png` });
  assert.deepEqual(errors, []);
  const result = { hover: "passed", animatedWaves: "passed", fadeOut: "passed", reducedMotion: "passed", heroOnly: "passed", touch: "passed", errors };
  await fs.writeFile(`${output}/verification.json`, JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
}
