import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright-core";

const recordingPath = process.argv[2];
if (!recordingPath) throw new Error("Pass the recording path as the first argument.");

const outputDir = process.argv[3] ?? ".web-shader-extractor/evidence/screenshots/contact-recording";
const chromePath = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true,
  args: ["--allow-file-access-from-files", "--autoplay-policy=no-user-gesture-required"],
});
const page = await browser.newPage({ viewport: { width: 1512, height: 900 }, deviceScaleFactor: 1 });

const recordingUrl = pathToFileURL(recordingPath).href;
await fs.mkdir(outputDir, { recursive: true });
const viewerPath = path.resolve(outputDir, "viewer.html");
await fs.writeFile(viewerPath, `<!doctype html><meta charset="utf-8"><style>html,body{margin:0;background:#000}video{display:block;max-width:100vw;max-height:100vh;margin:auto}</style><video preload="auto" muted src="${recordingUrl}"></video>`);
await page.goto(pathToFileURL(viewerPath).href, { waitUntil: "domcontentloaded" });
await page.waitForSelector("video", { timeout: 20_000 });
const video = page.locator("video");
await video.evaluate((element) => new Promise((resolve, reject) => {
  const media = element;
  if (media.readyState >= 1 && Number.isFinite(media.duration)) {
    resolve(undefined);
    return;
  }
  media.addEventListener("loadedmetadata", () => resolve(undefined), { once: true });
  media.addEventListener("error", () => reject(media.error ?? new Error("Video metadata failed")), { once: true });
}));

const metadata = await video.evaluate((media) => ({
  duration: media.duration,
  width: media.videoWidth,
  height: media.videoHeight,
  readyState: media.readyState,
  error: media.error?.message ?? null,
}));
const fractions = [0, 0.15, 0.3, 0.45, 0.6, 0.72, 0.8, 0.86, 0.9, 0.94, 0.97, 1];
const frames = [];
for (const fraction of fractions) {
  const time = Math.min(Math.max(metadata.duration * fraction, 0), Math.max(0, metadata.duration - 0.04));
  await video.evaluate((media, nextTime) => new Promise((resolve, reject) => {
    const done = () => resolve(undefined);
    const failed = () => reject(media.error ?? new Error("Video seek failed"));
    media.addEventListener("seeked", done, { once: true });
    media.addEventListener("error", failed, { once: true });
    media.currentTime = nextTime;
    if (Math.abs(media.currentTime - nextTime) < 0.02 && !media.seeking) done();
  }), time);
  await page.waitForTimeout(100);
  const name = `${String(Math.round(fraction * 100)).padStart(3, "0")}-${time.toFixed(2).replace(".", "_")}.png`;
  await video.screenshot({ path: `${outputDir}/${name}` });
  frames.push({ fraction, time, name });
}

const report = { recordingPath, metadata, frames };
await fs.writeFile(`${outputDir}/report.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
await browser.close();
