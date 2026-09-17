import fs from "node:fs/promises";
import path from "node:path";

const sourceDirectory = path.resolve(
  ".web-shader-extractor/evidence/source/routes",
);
const runtimeDirectory = path.resolve(
  ".web-shader-extractor/evidence/runtime/routes",
);
const outputPath = path.resolve("data/recovered-articles.ts");
const files = (await fs.readdir(sourceDirectory))
  .filter((file) => file.endsWith(".html"))
  .sort();

const articles = {};
for (const file of files) {
  const slug = file.replace(/\.html$/, "");
  const [documentHtml, runtimeText] = await Promise.all([
    fs.readFile(path.join(sourceDirectory, file), "utf8"),
    fs.readFile(path.join(runtimeDirectory, `${slug}.json`), "utf8"),
  ]);
  const match = documentHtml.match(
    /<article\b[^>]*data-mdx-article="true"[^>]*>([\s\S]*?)<\/article>/i,
  );
  if (!match) throw new Error(`No MDX article found for ${slug}`);
  const runtime = JSON.parse(runtimeText);
  const html = match[1]
    .replaceAll("https://mysite2026-blog-cyn6.vercel.app/", "/")
    .replaceAll("https://www.reunimos.cc/", "/external/reunimos/")
    .replaceAll('href="https://haoqi.design/', 'href="/');
  articles[slug] = {
    title: runtime.title,
    description: runtime.bodyText
      .split("\n")
      .map((line) => line.trim())
      .find(
        (line) =>
          line.length > 80 &&
          !line.startsWith("HAOQI") &&
          !line.startsWith("GMT"),
      ) ?? runtime.title,
    html,
  };
}

const source = `// Generated from the recovered public MDX article DOM.\n` +
  `// Regenerate with: node scripts/build-article-data.mjs\n\n` +
  `export type RecoveredArticle = {\n` +
  `  title: string;\n` +
  `  description: string;\n` +
  `  html: string;\n` +
  `};\n\n` +
  `export const recoveredArticles = ${JSON.stringify(articles, null, 2)} as const satisfies Record<string, RecoveredArticle>;\n\n` +
  `export type RecoveredArticleSlug = keyof typeof recoveredArticles;\n`;

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, source);
console.log(
  JSON.stringify(
    {
      articles: Object.keys(articles),
      outputPath: path.relative(process.cwd(), outputPath),
      bytes: Buffer.byteLength(source),
    },
    null,
    2,
  ),
);
