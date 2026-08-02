import fs from "node:fs/promises";
import path from "node:path";

const evidenceInput = path.resolve(
  process.argv[2] ??
    ".web-shader-extractor/evidence/network/home-responses.json",
);
const publicRoot = path.resolve(process.argv[3] ?? "public");
const inputStat = await fs.stat(evidenceInput);
const evidenceFiles = inputStat.isDirectory()
  ? (await fs.readdir(evidenceInput))
      .filter((file) => file.endsWith(".json"))
      .map((file) => path.join(evidenceInput, file))
  : [evidenceInput];
const records = [];
for (const file of evidenceFiles) {
  const parsed = JSON.parse(await fs.readFile(file, "utf8"));
  records.push(...(Array.isArray(parsed) ? parsed : (parsed.responses ?? [])));
}
const allowedTypes = new Set(["image", "font", "media", "fetch", "other"]);
const allowedExtensions =
  /\.(?:png|webp|jpe?g|svg|ttf|otf|woff2?|mp3|wav|glb|gltf|bin)$/i;

const urls = Array.from(
  new Set(
    records
      .filter((record) => allowedTypes.has(record.resourceType))
      .map((record) => record.url)
      .filter((url) =>
        [
          "haoqi.design",
          "mysite2026-blog-cyn6.vercel.app",
          "www.reunimos.cc",
        ].includes(new URL(url).hostname),
      )
      .filter((url) => allowedExtensions.test(new URL(url).pathname)),
  ),
);

const recovered = [];
for (const sourceUrl of urls) {
  const url = new URL(sourceUrl);
  const sourcePath = decodeURIComponent(url.pathname).replace(/^\/+/, "");
  const relativePath =
    url.hostname === "www.reunimos.cc"
      ? path.join("external", "reunimos", sourcePath)
      : sourcePath;
  if (!relativePath || relativePath.split("/").includes("..")) continue;

  const outputPath = path.resolve(publicRoot, relativePath);
  if (!outputPath.startsWith(`${publicRoot}${path.sep}`)) continue;

  const response = await fetch(sourceUrl);
  if (!response.ok) {
    throw new Error(`Failed ${response.status} for ${sourceUrl}`);
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, bytes);
  recovered.push({
    sourceUrl,
    outputPath: path.relative(process.cwd(), outputPath),
    bytes: bytes.byteLength,
    contentType: response.headers.get("content-type"),
  });
}

await fs.writeFile(
  path.join(
    inputStat.isDirectory() ? evidenceInput : path.dirname(evidenceInput),
    "recovered-assets.json",
  ),
  JSON.stringify(recovered, null, 2),
);

console.log(
  JSON.stringify(
    {
      recovered: recovered.length,
      bytes: recovered.reduce((sum, item) => sum + item.bytes, 0),
    },
    null,
    2,
  ),
);
