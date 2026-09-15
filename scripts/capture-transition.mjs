import fs from "node:fs/promises";
import { chromium } from "playwright-core";

const origin = process.argv[2] ?? "http://127.0.0.1:3100";
const chromePath = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true,
  args: ["--use-angle=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const errors = [];
const consoleMessages = [];
page.on("pageerror", (error) => errors.push(error.stack ?? error.message));
page.on("console", (message) => {
  if (["warning", "error"].includes(message.type())) consoleMessages.push({ type: message.type(), text: message.text() });
});

await page.goto(origin, { waitUntil: "networkidle" });
await page.waitForTimeout(3_000);
await fs.mkdir(".web-shader-extractor/local-evidence/screenshots/transition", { recursive: true });

const states = [
  { name: "cursor-small", top: 760, pointer: [720, 450] },
  { name: "cursor-growing", top: 260, pointer: [720, 450] },
  { name: "cursor-mid-morph", top: 40, pointer: [720, 450] },
  { name: "cursor-near-full", top: -80, pointer: [720, 450] },
  { name: "cursor-pointer", top: 40, pointer: [1180, 680] },
  { name: "hyperspace-handoff", top: -420, pointer: [1180, 680] },
  { name: "hyperspace-settled", top: -700, pointer: [1180, 680] },
];
const results = [];

for (const state of states) {
  const metrics = await page.evaluate(({ targetTop }) => {
    const scroller = document.querySelector("#home-scroll");
    const section = document.querySelector("#hyper");
    if (!(scroller instanceof HTMLElement) || !(section instanceof HTMLElement)) return null;
    scroller.style.scrollBehavior = "auto";
    const sectionTop = section.getBoundingClientRect().top + scroller.scrollTop;
    scroller.scrollTop = sectionTop - targetTop;
    return { sectionTop, scrollTop: scroller.scrollTop };
  }, { targetTop: state.top });
  await page.mouse.move(state.pointer[0], state.pointer[1]);
  await page.waitForTimeout(700);
  const runtime = await page.evaluate(() => ({
    reveal: getComputedStyle(document.documentElement).getPropertyValue("--arrow-reveal").trim(),
    hyperOpacity: getComputedStyle(document.documentElement).getPropertyValue("--hyper-opacity").trim(),
    inverse: document.documentElement.dataset.inverse,
    sectionTop: document.querySelector("#hyper")?.getBoundingClientRect().top,
    cursorVisibility: getComputedStyle(document.querySelector(".cursor-transition-canvas") ?? document.body).visibility,
    coordinates: document.querySelector(".site-status-center")?.textContent,
    canvases: document.querySelectorAll("canvas").length,
  }));
  await page.screenshot({ path: `.web-shader-extractor/local-evidence/screenshots/transition/${state.name}.png` });
  results.push({ ...state, metrics, runtime });
}

const report = { states: results, errors, consoleMessages };
await fs.mkdir(".web-shader-extractor/local-evidence/runtime", { recursive: true });
await fs.writeFile(".web-shader-extractor/local-evidence/runtime/cursor-transition.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
await browser.close();
