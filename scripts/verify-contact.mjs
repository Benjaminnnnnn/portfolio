import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { chromium } from "playwright-core";

const origin = process.argv[2] ?? "http://127.0.0.1:3109";
const output = "artifacts/contact";
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: ["--use-angle=metal", "--enable-webgl", "--ignore-gpu-blocklist"],
});
const errors = [];
const results = [];
try {
  for (const [width, height, reducedMotion] of [[1440, 900, "no-preference"], [2048, 1130, "no-preference"], [390, 844, "no-preference"], [320, 740, "reduce"], [768, 1024, "reduce"]]) {
    const page = await browser.newPage({ viewport: { width, height }, colorScheme: "light", reducedMotion });
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.addInitScript(() => {
      window.localStorage.setItem("theme", "light");
      window.localStorage.setItem("sound", "off");
    });
    await page.goto(origin, { waitUntil: "networkidle" });
    await page.locator(".home-root.intro-ready").waitFor({ timeout: 30000 });
    await page.keyboard.press("b");
    await page.waitForTimeout(4000);
    assert.equal(await page.locator(".contact-glyph").count(), 0, "Old skill cards remain");
    // Stickers are drawn by the home canvas now; no DOM sticker copies remain.
    assert.equal(await page.locator("#contact img, [data-contact-sticker]").count(), 0, "DOM stickers remain in contact");
    assert.equal(await page.locator(".contact-title").getAttribute("aria-label"), "Let's create something extraordinary");
    const layout = await page.evaluate(() => {
      const scroller = document.getElementById("home-scroll");
      const title = document.querySelector(".contact-title");
      const words = [...title.querySelectorAll(".intro-scramble")].map((word) => {
        const range = document.createRange();
        range.selectNodeContents(word);
        return { text: word.getAttribute("data-text"), ...range.getBoundingClientRect().toJSON() };
      });
      return {
        overflow: scroller.scrollWidth > scroller.clientWidth + 1,
        words
      };
    });
    assert.equal(layout.overflow, false, `Horizontal overflow at ${width}`);
    for (const word of layout.words) {
      assert.ok(word.left >= 0 && word.right <= width && word.top > 0 && word.bottom < height, `Clipped headline at ${width}: ${JSON.stringify(word)}`);
    }
    assert.ok(Math.abs(layout.words[0].top - layout.words[1].top) < 2, "First headline row broke");
    assert.ok(layout.words[2].top > layout.words[0].top && layout.words[3].top > layout.words[2].top, "Headline should have three rows");
    await page.screenshot({ path: `${output}/contact-${width}-light.png` });
    if (width === 1440) {
      await page.mouse.move(width - 30, 100);
      await page.waitForTimeout(1500);
      await page.screenshot({ path: `${output}/contact-pointer.png` });
      await page.mouse.move(width / 2, height / 2);
    }
    if (width === 1440 || width === 390) {
      await page.keyboard.press("d");
      await page.waitForTimeout(1800);
      await page.screenshot({ path: `${output}/contact-${width}-dark.png` });
    }
    await page.keyboard.press("t");
    await page.waitForTimeout(2500);
    const contactHidden = await page.locator("#contact").evaluate((section) => section.getBoundingClientRect().top >= innerHeight);
    assert.ok(contactHidden, "Contact section did not leave viewport");
    results.push({ width, height, reducedMotion, ...layout });
    await page.close();
  }
} finally {
  await browser.close();
}
assert.deepEqual(errors, []);
await fs.writeFile(`${output}/verification.json`, JSON.stringify({ results, errors }, null, 2));
console.log(JSON.stringify({ widths: results.map((result) => result.width), headline: "three rows", errors }, null, 2));
