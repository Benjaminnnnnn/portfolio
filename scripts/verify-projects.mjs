import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { chromium } from "playwright-core";

const origin = process.argv[2] ?? "http://127.0.0.1:3000";
const output = "artifacts/portfolio";
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
try {
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => { window.localStorage.setItem("sound", "off"); if (!window.localStorage.getItem("theme")) window.localStorage.setItem("theme", "light"); });
  await page.goto(origin, { waitUntil: "networkidle" });
  await page.locator(".home-root.intro-ready").waitFor({ state: "visible" });
  assert.equal(await page.locator(".project-card-gallery").count(), 13);
  assert.equal(await page.locator(".project-card-gallery .project-artwork").count(), 13);
  assert.equal(await page.locator(".project-description > p, .project-stack, .archive-row").count(), 0, "index should use visual cards and small labels");
  const links = await page.locator("#work a[href^='/']").evaluateAll((nodes) => [...new Set(nodes.map((node) => node.getAttribute("href")))]);
  assert.equal(links.length, 13, "every project should have a case study");
  await page.locator("#work").evaluate((node) => node.scrollIntoView({ block: "start" }));
  await page.screenshot({ path: `${output}/projects-desktop.png` });
  await page.locator(".project-card-gallery").first().evaluate((node) => node.scrollIntoView({ block: "start" }));
  await page.screenshot({ path: `${output}/relay-feature-desktop.png` });

  for (const route of links) {
    const response = await page.goto(`${origin}${route}`, { waitUntil: "networkidle" });
    assert.equal(response.status(), 200, route);
    assert.equal(await page.locator(".study-chapter").count(), 3, `${route} chapters`);
    assert.equal(await page.locator(".study-visual").count(), 3, `${route} visual details`);
    assert.equal(await page.locator(".study-flow, .study-overview, .study-metrics").count(), 0, `${route} still has the old text-heavy sections`);
    assert.equal(await page.getByText("The core loop", { exact: true }).count(), 0);
    const headerHeight = await page.locator(".study-header").evaluate(node => node.getBoundingClientRect().height);
    assert.ok(headerHeight < 420, `${route} pushes the cover below a full-screen header`);
    const headingSize = await page.locator(".study-visual figcaption h2").evaluateAll(nodes => Math.max(...nodes.map(node => parseFloat(getComputedStyle(node).fontSize))));
    assert.ok(headingSize <= 16, `${route} oversized detail headings`);
    const gallery = await page.locator(".study-gallery").boundingBox();
    assert.ok(gallery.width <= 860, `${route} should have a narrow gallery`);
    const cover = await page.locator(".study-hero").boundingBox();
    const firstVisual = await page.locator(".study-chapter").first().boundingBox();
    assert.ok(Math.abs(cover.y - firstVisual.y) < 1, `${route} first two visuals should share a row`);
    assert.equal(await page.locator(".study-notes[open]").count(), 0, `${route} technical notes start collapsed`);
    await page.locator(".study-notes summary").click();
    assert.equal(await page.locator(".study-notes[open] section").count(), 3, `${route} implementation notes are accessible`);
    await page.locator(".study-notes summary").click();
    assert.ok((await page.title()).includes("Benjamin Zhuang"), route);
    assert.equal(await page.locator(".study-hero .project-artwork").count(), 1, `${route} cover`);
    for (const visual of await page.locator(".study-visual").all()) {
      await visual.scrollIntoViewIfNeeded();
      await visual.locator(".study-crop img").evaluateAll(nodes => Promise.race([
        Promise.all(nodes.map(node => node.decode())),
        new Promise((_, reject) => window.setTimeout(() => reject(new Error("Visible image did not decode in 10 seconds")), 10000)),
      ]));
    }
    const broken = await page.locator(".study-visual img, .study-hero img").evaluateAll((nodes) => nodes.filter((node) => node.complete && node.naturalWidth === 0).map((node) => node.src));
    assert.deepEqual(broken, [], `${route} images`);
    const imageButton = page.locator(".study-image-button").first();
    if (await imageButton.count()) {
      await imageButton.click();
      assert.equal(await page.locator("dialog[open]").count(), 1, `${route} image opens`);
      await page.keyboard.press("Escape");
      assert.equal(await page.locator("dialog[open]").count(), 0, `${route} Escape closes image`);
      assert.equal(await imageButton.evaluate(node => node === document.activeElement), true, `${route} restores keyboard focus`);
    }
    await page.locator(".article-scroll").evaluate(node => { node.scrollTop = 0; });
    await page.locator("body").click({ position: { x: 5, y: 100 } });
    await page.screenshot({ path: `${output}/${route.replaceAll("/", "")}-cover-desktop.png` });
    await page.locator(".study-gallery").evaluate(node => node.scrollIntoView({ block: "start" }));
    await page.locator("body").click({ position: { x: 5, y: 100 } });
    await page.screenshot({ path: `${output}/${route.replaceAll("/", "")}-detail-desktop.png` });
  }
  await page.goto(`${origin}/relay`, { waitUntil: "networkidle" });
  for (let i = 0; i < 4; i++) await page.getByRole("button", { name: "Next event" }).click();
  assert.equal(await page.locator(".lease-job strong").innerText(), "Succeeded");
  assert.match(await page.locator(".lease-frame").innerText(), /old token is rejected/);
  assert.equal(await page.getByRole("button", { name: "Next event" }).isDisabled(), true);
  await page.getByRole("button", { name: "01 Accepted" }).focus();
  await page.keyboard.press("Enter");
  assert.equal(await page.locator(".lease-job strong").innerText(), "Pending");
  await page.locator(".lease-replay").evaluate((node) => node.scrollIntoView({ block: "center" }));
  await page.locator(".lease-replay").screenshot({ path: `${output}/relay-experiment.png` });

  for (const width of [320, 390, 768, 1440, 2048]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", ...links]) {
      await page.goto(`${origin}${route}`, { waitUntil: "networkidle" });
      if (route === "/") await page.locator(".home-root.intro-ready").waitFor({ state: "visible" });
      const fits = await page.locator("#home-scroll, .article-scroll").evaluate((node) => node.scrollWidth <= node.clientWidth + 1);
      assert.equal(fits, true, `${route} overflows at ${width}px`);
      if (route !== "/") {
        for (const visual of await page.locator(".study-visual").all()) {
          await visual.scrollIntoViewIfNeeded();
          const bounds = await visual.boundingBox();
          assert.ok(bounds.x >= -1 && bounds.x + bounds.width <= width + 1, `${route} visual outside screen at ${width}px`);
        }
        if (width === 390) {
          await page.locator(".study-chapter").first().evaluate(node => node.scrollIntoView({ block: "start" }));
          await page.screenshot({ path: `${output}/${route.replaceAll("/", "")}-detail-mobile.png` });
        }
      }
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(origin, { waitUntil: "networkidle" });
  await page.locator(".home-root.intro-ready").waitFor({ state: "visible" });
  await page.locator("#work").evaluate((node) => node.scrollIntoView({ block: "start" }));
  await page.screenshot({ path: `${output}/projects-mobile.png` });
  await page.locator(".project-card-gallery").first().evaluate((node) => node.scrollIntoView({ block: "start" }));
  await page.screenshot({ path: `${output}/relay-feature-mobile.png` });
  await page.keyboard.press("d");
  assert.equal(await page.locator("html.dark").count(), 1);
  await page.screenshot({ path: `${output}/projects-dark-mobile.png` });
  assert.deepEqual(errors, [], "browser errors");
  for (const route of links) {
    await page.goto(`${origin}${route}`, { waitUntil: "networkidle" });
    assert.equal(await page.locator("html.dark").count(), 1, `${route} dark theme`);
    assert.equal(await page.locator(".article-scroll").evaluate(node => node.scrollWidth <= node.clientWidth + 1), true, `${route} dark mobile overflow`);
    assert.equal(await page.locator('img[src*="-system.webp"]').count(), 0, `${route} old generated editorial image`);
  }
  await page.goto(`${origin}/splendor`, { waitUntil: "networkidle" });
  await page.locator(".study-gallery").evaluate(node => node.scrollIntoView({ block: "start" }));
  await page.screenshot({ path: `${output}/splendor-gallery-dark-mobile.png` });
  assert.deepEqual(errors, [], "browser errors after dark-mode routes");
  const result = { caseStudies: links.length, visualPanels: links.length * 4, widths: [320, 390, 768, 1440, 2048], imageDialogs: "passed", compactHeaders: "passed", pairedGallery: "passed", expandableNotes: "passed", keyboardReplay: "passed", reducedMotion: "passed", darkMode: "passed", errors };
  await fs.writeFile(`${output}/visual-verification.json`, JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
}
