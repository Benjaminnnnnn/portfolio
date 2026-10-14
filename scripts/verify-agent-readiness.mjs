// Checks the static export for what AI agents and crawlers read: llms.txt,
// Markdown copies, sitemap, robots.txt, metadata, JSON-LD, and no-JS content.
// Run after `next build`: node scripts/verify-agent-readiness.mjs [out]
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const out = path.resolve(process.argv[2] ?? "out");
const site = "https://benjaminnnnnn.github.io/portfolio";
const read = (file) => fs.readFileSync(path.join(out, file), "utf8");
const exists = (file) => fs.existsSync(path.join(out, file));
// Absolute site URL -> exported file ("/relay/" -> "relay/index.html").
const fileFor = (url) => {
  assert.ok(url.startsWith(`${site}/`), `${url} is not on ${site}`);
  const rel = decodeURIComponent(url.slice(site.length + 1).split("#")[0]);
  return rel === "" || rel.endsWith("/") ? `${rel}index.html` : rel;
};

const failures = [];
const check = (name, fn) => {
  try {
    fn();
    console.log(`ok   ${name}`);
  } catch (error) {
    failures.push(name);
    console.log(`FAIL ${name}\n     ${error.message.split("\n")[0]}`);
  }
};

// --- sitemap.xml: valid, every URL exported, lastmod on each ---
const sitemap = read("sitemap.xml");
const sitemapUrls = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, entry]) => ({
  loc: entry.match(/<loc>(.*?)<\/loc>/)?.[1],
  lastmod: entry.match(/<lastmod>(.*?)<\/lastmod>/)?.[1],
}));
const htmlPages = sitemapUrls.map((entry) => entry.loc);

check("sitemap.xml is a sitemaps.org urlset", () => {
  assert.match(sitemap, /^<\?xml version="1.0" encoding="UTF-8"\?>\s*<urlset xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9">/);
  assert.ok(sitemapUrls.length >= 20, `only ${sitemapUrls.length} URLs`);
});
check("sitemap lists every exported page with a lastmod", () => {
  for (const { loc, lastmod } of sitemapUrls) {
    assert.ok(exists(fileFor(loc)), `${loc} has no exported page`);
    assert.ok(lastmod && !Number.isNaN(Date.parse(lastmod)), `${loc} has no valid lastmod`);
  }
  const exported = fs.readdirSync(out, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_") && entry.name !== "404" && fs.existsSync(path.join(out, entry.name, "index.html")))
    .map((entry) => `${site}/${entry.name}/`);
  for (const url of exported) assert.ok(htmlPages.includes(url), `${url} is missing from the sitemap`);
  for (const slug of ["about", "contact", "privacy"]) assert.ok(htmlPages.includes(`${site}/${slug}/`), `${slug} missing`);
});

// --- robots.txt: AI agents allowed, sitemap declared ---
check("robots.txt allows AI agents and declares the sitemap", () => {
  const robots = read("robots.txt");
  assert.doesNotMatch(robots, /^Disallow:\s*\/\s*$/m, "a group disallows the whole site");
  for (const agent of ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "OAI-SearchBot", "Claude-User"]) {
    assert.match(robots, new RegExp(`^User-agent: ${agent}$`, "m"), `${agent} not listed`);
  }
  assert.match(robots, new RegExp(`^Sitemap: ${site}/sitemap.xml$`, "m"));
});

// --- llms.txt (https://llmstxt.org) ---
const llms = read("llms.txt");
check("llms.txt follows the llmstxt.org layout", () => {
  const lines = llms.split("\n");
  assert.match(lines[0], /^# \S/, "first line must be the H1");
  assert.match(lines[2], /^> \S/, "summary blockquote must follow the H1");
  const firstH2 = lines.findIndex((line) => line.startsWith("## "));
  assert.ok(firstH2 > 2, "no H2 sections");
  assert.ok(!lines.slice(1, firstH2).some((line) => /^#{1,6} /.test(line)), "free text before the first H2 may not contain headings");
  assert.ok(!lines.some((line) => /^#{3,6} /.test(line)), "only H1 and H2 are allowed");
  for (const line of lines.slice(firstH2)) {
    if (line === "" || line.startsWith("## ")) continue;
    assert.match(line, /^- \[[^\]]+\]\(https?:\/\/[^)\s]+\)(: .+)?$/, `not a file-list item: ${line}`);
  }
});
check("llms.txt has when-to-use guidance and links only to real files", () => {
  assert.match(llms, /^## When to use this$/m);
  assert.match(llms, /^## Optional$/m);
  const links = [...llms.matchAll(/\]\((https?:\/\/[^)]+)\)/g)].map(([, url]) => url);
  for (const url of links) assert.ok(exists(fileFor(url)), `${url} is not exported`);
  for (const loc of htmlPages.filter((url) => url !== `${site}/`)) {
    assert.ok(links.includes(`${loc}index.md`), `${loc}index.md is not linked`);
  }
});
check("llms-full.txt contains every page", () => {
  const full = read("llms-full.txt");
  for (const loc of htmlPages) {
    const title = read(fileFor(`${loc}index.md`)).split("\n")[0];
    assert.ok(full.includes(title), `${title} missing`);
  }
});

// --- per-page HTML: metadata, JSON-LD, Markdown copy, no-JS content ---
const visibleText = (html) => html
  .replace(/<(script|style|template)\b[\s\S]*?<\/\1>/gi, " ")
  .replace(/<\/?(p|div|section|article|header|footer|main|nav|li|ul|ol|h[1-6]|br|figure|figcaption|details|summary|a)\b[^>]*>/gi, " ")
  .replace(/<[^>]+>/g, "")
  .replace(/&[a-z#0-9]+;/gi, "x")
  .replace(/\s+/g, " ")
  .trim();
const jsonLdTypes = (html) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  .flatMap(([, json]) => {
    const data = JSON.parse(json);
    assert.equal(data["@context"], "https://schema.org");
    return (data["@graph"] ?? [data]).map((node) => node["@type"]);
  });

for (const loc of htmlPages) {
  const route = loc.slice(site.length) || "/";
  const html = read(fileFor(loc));
  check(`${route} metadata: lang, canonical, og:image, og:type, Markdown alternate`, () => {
    assert.match(html, /<html lang="en"/);
    assert.ok(html.includes(`<link rel="canonical" href="${loc}"/>`), "canonical");
    assert.match(html, /<meta property="og:image" content="https:\/\/[^"]+"/);
    assert.match(html, /<meta property="og:type" content="(website|article)"/);
    const alternate = html.match(/<link rel="alternate" type="text\/markdown" href="([^"]+)"/)?.[1];
    assert.equal(alternate, `${loc}index.md`);
    const markdown = read(fileFor(alternate));
    assert.match(markdown, /^# \S/, "Markdown copy must start with an H1");
  });
  check(`${route} structured data and raw-HTML content`, () => {
    const types = jsonLdTypes(html);
    const expected = route === "/" ? ["Person", "WebSite", "ProfilePage"]
      : route === "/about/" ? ["Person", "AboutPage"]
      : route === "/contact/" ? ["Person", "ContactPage"]
      : route === "/privacy/" ? ["WebPage"]
      : ["CreativeWork", "BreadcrumbList"];
    for (const type of expected) assert.ok(types.includes(type), `JSON-LD lacks ${type} (has ${types})`);
    const text = visibleText(html);
    assert.ok(text.length >= 500, `${text.length} characters of text without JavaScript`);
    const levels = [...html.matchAll(/<h([1-6])\b/g)].map(([, level]) => Number(level));
    assert.equal(levels.filter((level) => level === 1).length, 1, "exactly one H1");
    levels.forEach((level, index) => assert.ok(index === 0 || level <= levels[index - 1] + 1, `heading jumps to h${level}`));
  });
}

check("home Person has contactPoint, address and profiles", () => {
  const data = JSON.parse(read("index.html").match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const person = data["@graph"].find((node) => node["@type"] === "Person");
  assert.match(person.contactPoint.email, /@/);
  assert.ok(person.contactPoint.contactType);
  assert.equal(person.address["@type"], "PostalAddress");
  assert.ok(person.sameAs.length >= 2 && person.name && person.description && person.url);
});
check("trust pages each carry 500+ characters of their own content", () => {
  for (const slug of ["about", "contact", "privacy"]) {
    const body = read(`${slug}/index.html`).match(/<div class="info-body">([\s\S]*?)<\/article>/)?.[1] ?? "";
    assert.ok(visibleText(body).length >= 500, `${slug}: ${visibleText(body).length} characters`);
  }
});
check("404 page links agents to the sitemap and llms.txt", () => {
  const html = read("404.html");
  assert.match(html, /href="[^"]*\/sitemap\.xml"/);
  assert.match(html, /href="[^"]*\/llms\.txt"/);
});

if (failures.length) {
  console.error(`\n${failures.length} check(s) failed`);
  process.exit(1);
}
console.log("\nall agent-readiness checks passed");
