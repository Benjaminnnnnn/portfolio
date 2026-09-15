import fs from "node:fs/promises";
import { chromium } from "playwright-core";

const origin = process.argv[2] ?? "https://haoqi.design/";
const outputDir = process.argv[3] ?? ".web-shader-extractor/evidence/screenshots/theme-contact-original";
const chromePath = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true,
  args: ["--use-angle=metal", "--enable-webgl", "--ignore-gpu-blocklist"],
});
const context = await browser.newContext({
  viewport: { width: 1512, height: 829 },
  deviceScaleFactor: 1,
  colorScheme: "light",
});
await context.addInitScript(() => {
  window.localStorage.removeItem("theme");
  window.localStorage.setItem("sound", "off");
});
const page = await context.newPage();
const errors = [];
const consoleMessages = [];
page.on("pageerror", (error) => errors.push(error.stack ?? error.message));
page.on("console", (message) => {
  if (["warning", "error"].includes(message.type())) consoleMessages.push({ type: message.type(), text: message.text() });
});

await page.goto(origin, { waitUntil: "networkidle", timeout: 90_000 });
await page.waitForTimeout(6_000);
await fs.mkdir(outputDir, { recursive: true });

const inspect = () => page.evaluate(() => {
  const root = document.documentElement;
  const themeButton = Array.from(document.querySelectorAll("button,[role=button]")).find((node) => node.textContent?.includes("THEME"));
  const scrollables = Array.from(document.querySelectorAll("*")).filter((node) => {
    if (!(node instanceof HTMLElement)) return false;
    const style = getComputedStyle(node);
    return /(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight + 1;
  }).map((node) => ({
    tag: node.tagName,
    id: node.id,
    className: node.className,
    top: node.scrollTop,
    max: node.scrollHeight - node.clientHeight,
  }));
  return {
    className: root.className,
    dataset: { ...root.dataset },
    localTheme: window.localStorage.getItem("theme"),
    localSound: window.localStorage.getItem("sound"),
    themeText: themeButton?.textContent,
    bodyBackground: getComputedStyle(document.body).backgroundColor,
    bodyColor: getComputedStyle(document.body).color,
    scrollables,
    canvases: Array.from(document.querySelectorAll("canvas")).map((canvas) => ({ width: canvas.width, height: canvas.height })),
  };
});

const states = [];
for (const key of ["l", "d", "a"]) {
  await page.keyboard.press(key);
  await page.waitForTimeout(1_200);
  const state = await inspect();
  await page.screenshot({ path: `${outputDir}/theme-${key}.png` });
  states.push({ key, ...state });
}

const soundStates = [];
await page.keyboard.press("s");
await page.waitForTimeout(400);
soundStates.push({ action: "enabled", ...(await inspect()) });
await page.keyboard.press("s");
await page.waitForTimeout(250);
soundStates.push({ action: "disabled", ...(await inspect()) });

const themeControl = page.getByText(/THEME\[[LDA]\]/).last();
await themeControl.hover();
await page.waitForTimeout(500);
await page.screenshot({ path: `${outputDir}/shortcut-help.png` });
const helpText = await page.locator("body").evaluate((body) => Array.from(body.querySelectorAll("div,p")).map((node) => node.textContent?.trim()).filter((text) => text?.includes("Press [L]"))[0] ?? null);
await page.mouse.move(20, 400);

await page.keyboard.press("b");
await page.waitForTimeout(2_500);
const afterBottom = await inspect();
await page.screenshot({ path: `${outputDir}/contact-bottom-key.png` });
await page.keyboard.press("t");
await page.waitForTimeout(2_500);
const afterTop = await inspect();

const transition = [];
const contactSelector = "#contact";
const targetTops = [829, 620, 415, 200, 0, -200, -415];
for (const targetTop of targetTops) {
  const positioned = await page.evaluate(({ selector, top }) => {
    const target = document.querySelector(selector);
    if (!(target instanceof HTMLElement)) return null;
    const scrollables = Array.from(document.querySelectorAll("*")).filter((node) => {
      if (!(node instanceof HTMLElement)) return false;
      const style = getComputedStyle(node);
      return /(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight + 1;
    });
    const scroller = scrollables.sort((a, b) => (b.scrollHeight - b.clientHeight) - (a.scrollHeight - a.clientHeight))[0];
    if (!(scroller instanceof HTMLElement)) return null;
    scroller.style.scrollBehavior = "auto";
    const absoluteTop = target.getBoundingClientRect().top + scroller.scrollTop;
    scroller.scrollTop = absoluteTop - top;
    return { scrollTop: scroller.scrollTop, max: scroller.scrollHeight - scroller.clientHeight };
  }, { selector: contactSelector, top: targetTop });
  await page.waitForTimeout(700);
  const runtime = await page.evaluate(() => ({
    contactTop: document.querySelector("#contact")?.getBoundingClientRect().top ?? null,
    inverse: document.documentElement.dataset.inverse,
    theme: document.documentElement.className,
  }));
  const name = `contact-${String(targetTop).replace("-", "minus-")}.png`;
  await page.screenshot({ path: `${outputDir}/${name}` });
  transition.push({ targetTop, positioned, runtime, name });
}

const report = { origin, states, soundStates, helpText, afterBottom, afterTop, transition, errors, consoleMessages };
await fs.writeFile(`${outputDir}/report.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
await browser.close();
