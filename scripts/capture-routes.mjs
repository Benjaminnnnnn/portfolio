import { chromium } from "playwright-core";
import fs from "node:fs/promises";
import path from "node:path";

const origin = "https://haoqi.design";
const routes = [
  "/reunimos",
  "/inspire_mono",
  "/wasm_design_utils",
  "/adrive",
  "/shore_icon",
  "/teambition",
];
const evidenceRoot = path.resolve(
  process.argv[2] ?? ".web-shader-extractor/evidence",
);
const chromePath =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

await Promise.all([
  fs.mkdir(path.join(evidenceRoot, "screenshots", "routes"), {
    recursive: true,
  }),
  fs.mkdir(path.join(evidenceRoot, "runtime", "routes"), {
    recursive: true,
  }),
  fs.mkdir(path.join(evidenceRoot, "source", "routes"), {
    recursive: true,
  }),
]);

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true,
  args: ["--use-angle=metal", "--enable-webgl", "--ignore-gpu-blocklist"],
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  colorScheme: "light",
});
const page = await context.newPage();
const results = [];

const scrollToProgress = (progress) =>
  page.evaluate((p) => {
    const target = Array.from(document.querySelectorAll("*")).find((element) => {
      const style = getComputedStyle(element);
      return (
        /(auto|scroll)/.test(style.overflowY) &&
        element.scrollHeight > element.clientHeight + 2
      );
    });
    if (target) {
      target.scrollTop = (target.scrollHeight - target.clientHeight) * p;
      return {
        scrollTop: target.scrollTop,
        scrollHeight: target.scrollHeight,
        clientHeight: target.clientHeight,
      };
    }
    window.scrollTo(0, (document.documentElement.scrollHeight - innerHeight) * p);
    return {
      scrollTop: scrollY,
      scrollHeight: document.documentElement.scrollHeight,
      clientHeight: innerHeight,
    };
  }, progress);

for (let index = 0; index < routes.length; index += 1) {
  const route = routes[index];
  const slug = route.slice(1);
  const responses = [];
  const onResponse = (response) => {
    responses.push({
      url: response.url(),
      status: response.status(),
      resourceType: response.request().resourceType(),
      contentType: response.headers()["content-type"] ?? null,
    });
  };
  page.on("response", onResponse);
  await page.goto(`${origin}${route}`, {
    waitUntil: "domcontentloaded",
    timeout: 60_000,
  });
  await page.waitForTimeout(index === 0 ? 10_000 : 5_000);

  await page.screenshot({
    path: path.join(evidenceRoot, "screenshots", "routes", `${slug}-top.png`),
  });
  const middleScroll = await scrollToProgress(0.5);
  await page.waitForTimeout(900);
  await page.screenshot({
    path: path.join(evidenceRoot, "screenshots", "routes", `${slug}-middle.png`),
  });
  const footerScroll = await scrollToProgress(1);
  await page.waitForTimeout(900);
  await page.screenshot({
    path: path.join(evidenceRoot, "screenshots", "routes", `${slug}-footer.png`),
  });

  const data = await page.evaluate(() => ({
    url: location.href,
    title: document.title,
    bodyText: document.body.innerText,
    headings: Array.from(document.querySelectorAll("h1,h2,h3,h4")).map(
      (heading) => ({
        level: heading.tagName,
        text: heading.textContent?.trim() ?? "",
      }),
    ),
    images: Array.from(document.querySelectorAll("img")).map((image) => ({
      src: image.currentSrc || image.src,
      alt: image.alt,
      width: image.naturalWidth,
      height: image.naturalHeight,
    })),
    videos: Array.from(document.querySelectorAll("video")).map((video) => ({
      src: video.currentSrc,
      poster: video.poster,
    })),
    links: Array.from(document.querySelectorAll("a[href]")).map((link) => ({
      text: link.textContent?.trim() ?? "",
      href: link.href,
    })),
  }));

  await Promise.all([
    fs.writeFile(
      path.join(evidenceRoot, "runtime", "routes", `${slug}.json`),
      JSON.stringify(
        { ...data, middleScroll, footerScroll, responses },
        null,
        2,
      ),
    ),
    fs.writeFile(
      path.join(evidenceRoot, "source", "routes", `${slug}.html`),
      await page.content(),
    ),
  ]);
  results.push({
    route,
    title: data.title,
    headings: data.headings.length,
    images: data.images.length,
    scrollHeight: footerScroll.scrollHeight,
  });
  page.off("response", onResponse);
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
