import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { chromium } from "playwright-core";

const origin = process.argv[2] ?? "http://127.0.0.1:3000";
const routes = ["/", "/reunimos", "/inspire_mono", "/wasm_design_utils", "/adrive", "/shore_icon", "/teambition"];
const chromePath = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browser = await chromium.launch({ executablePath: chromePath, headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: "light" });
await context.addInitScript(() => {
  window.localStorage.removeItem("theme");
  window.localStorage.setItem("sound", "off");
});
const page = await context.newPage();
const pageErrors = [];
page.on("pageerror", (error) => pageErrors.push(error.stack ?? error.message));

for (const route of routes) {
  const response = await page.goto(`${origin}${route}`, { waitUntil: "networkidle" });
  assert.equal(response?.status(), 200, `${route} did not return 200`);
  assert.ok((await page.title()).length > 4, `${route} is missing a document title`);
  const brokenVisibleImages = await page.locator("img:visible").evaluateAll((images) => images.filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.getAttribute("src")));
  assert.deepEqual(brokenVisibleImages, [], `${route} has broken visible images`);
}

await page.goto(origin, { waitUntil: "networkidle" });
await page.waitForTimeout(2_500);
assert.equal(await page.locator("canvas").count(), 3, "home WebGL canvases did not mount");
assert.deepEqual(
  await page.locator("main [data-section]").evaluateAll((sections) => sections.map((section) => section.dataset.section)),
  ["hero", "about", "work", "purpose", "contact"],
  "home section composition changed",
);
await page.mouse.move(1180, 680);
await page.waitForTimeout(100);
assert.equal(
  await page.locator(".site-status-center").innerText(),
  "1180 X 0680 Y",
  "pointer coordinates are not synchronized",
);
await page.keyboard.press("l");
assert.equal(await page.getByRole("button", { name: "Theme: light" }).innerText(), "THEME[L]", "L did not select light mode");
await page.keyboard.press("d");
assert.equal(await page.locator("html.dark").count(), 1, "D did not select dark mode");
assert.equal(await page.evaluate(() => window.localStorage.getItem("theme")), "dark", "dark mode was not persisted");
await page.keyboard.press("a");
assert.equal(await page.getByRole("button", { name: "Theme: system" }).innerText(), "THEME[A]", "A did not select auto mode");
assert.equal(await page.locator("html.light").count(), 1, "auto mode did not resolve the light system preference");
await page.getByRole("button", { name: "Theme: system" }).hover();
assert.equal(await page.locator(".shortcut-help").getAttribute("aria-hidden"), "false", "theme shortcut help did not open");
assert.match(await page.locator(".shortcut-help").innerText(), /\[T\] scroll to top, \[B\] scroll to bottom/, "shortcut help copy changed");
await page.mouse.move(20, 400);
await page.keyboard.press("s");
assert.equal(await page.evaluate(() => window.localStorage.getItem("sound")), "on", "S did not enable and persist sound");
await page.keyboard.press("s");
assert.equal(await page.evaluate(() => window.localStorage.getItem("sound")), "off", "S did not disable and persist sound");
await page.keyboard.press("b");
await page.waitForTimeout(2_500);
assert.ok(await page.locator("#home-scroll").evaluate((node) => node.scrollTop >= node.scrollHeight - node.clientHeight - 2), "B did not scroll to the bottom");
await page.keyboard.press("t");
await page.waitForTimeout(2_500);
assert.ok(await page.locator("#home-scroll").evaluate((node) => node.scrollTop <= 2), "T did not scroll to the top");
await page.getByRole("button", { name: "WORK" }).click();
await page.waitForTimeout(500);
assert.ok(await page.locator("#home-scroll").evaluate((node) => node.scrollTop > 0), "work navigation did not move the internal scroller");

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(origin, { waitUntil: "networkidle" });
await page.waitForTimeout(1_500);
const mobileOverflow = await page.locator("#home-scroll").evaluate((node) => ({
  fits: node.scrollWidth <= node.clientWidth + 1,
  clientWidth: node.clientWidth,
  scrollWidth: node.scrollWidth,
  offenders: Array.from(node.querySelectorAll("*")).filter((element) => {
    const rect = element.getBoundingClientRect();
    return rect.left < -1 || rect.right > window.innerWidth + 1;
  }).slice(0, 8).map((element) => ({
    tag: element.tagName,
    className: element.getAttribute("class"),
    parentClassName: element.parentElement?.getAttribute("class"),
    rect: element.getBoundingClientRect().toJSON(),
  })),
}));
assert.equal(mobileOverflow.fits, true, `mobile home overflows horizontally: ${JSON.stringify(mobileOverflow)}`);

await browser.close();
assert.deepEqual(pageErrors, [], `browser errors: ${pageErrors.join(" | ")}`);
const result = { routes: routes.length, desktop: "passed", mobile: "passed", interactions: "passed", pageErrors };
await fs.mkdir(".web-shader-extractor/local-evidence/runtime", { recursive: true });
await fs.writeFile(".web-shader-extractor/local-evidence/runtime/smoke.json", JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
