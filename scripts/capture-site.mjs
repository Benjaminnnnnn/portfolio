import { chromium } from "playwright-core";
import fs from "node:fs/promises";
import path from "node:path";

const targetUrl = process.argv[2] ?? "https://haoqi.design/";
const outputRoot = path.resolve(
  process.argv[3] ?? ".web-shader-extractor/evidence",
);
const chromePath =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

await Promise.all([
  fs.mkdir(path.join(outputRoot, "screenshots"), { recursive: true }),
  fs.mkdir(path.join(outputRoot, "runtime"), { recursive: true }),
  fs.mkdir(path.join(outputRoot, "network"), { recursive: true }),
  fs.mkdir(path.join(outputRoot, "source"), { recursive: true }),
]);

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true,
  args: ["--use-angle=metal", "--enable-webgl", "--ignore-gpu-blocklist"],
});

if (process.argv[4] === "--transitions") {
  const transitionContext = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
    colorScheme: "light",
    reducedMotion: "no-preference",
  });
  const transitionPage = await transitionContext.newPage();
  const transitionNetwork = [];
  const consoleMessages = [];
  transitionPage.on("response", (response) => {
    transitionNetwork.push({
      url: response.url(),
      status: response.status(),
      resourceType: response.request().resourceType(),
      contentType: response.headers()["content-type"] ?? null,
    });
  });
  transitionPage.on("console", (message) => {
    if (["warning", "error"].includes(message.type())) {
      consoleMessages.push({ type: message.type(), text: message.text() });
    }
  });
  await transitionPage.addInitScript(() => {
    const capture = { contextCalls: [], canvasSequence: 0 };
    Object.defineProperty(window, "__wseTransitionCapture", { value: capture });
    const canvasIds = new WeakMap();
    const canvasId = (canvas) => {
      if (!canvasIds.has(canvas)) {
        const id = `surface-${++capture.canvasSequence}`;
        canvasIds.set(canvas, id);
        canvas.dataset.wseSurfaceId = id;
      }
      return canvasIds.get(canvas);
    };
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function patchedGetContext(type, attributes) {
      const result = originalGetContext.call(this, type, attributes);
      capture.contextCalls.push({
        canvasId: canvasId(this),
        type,
        attributes: attributes ?? null,
        succeeded: Boolean(result),
        stack: new Error().stack,
      });
      return result;
    };
  });

  let releaseHeldAssets;
  const heldAssets = new Promise((resolve) => { releaseHeldAssets = resolve; });
  await transitionPage.route("**/*", async (route) => {
    const pathname = new URL(route.request().url()).pathname;
    if (/\/(model|sticker_img|img)\//.test(pathname)) await heldAssets;
    await route.continue();
  });

  const transitionScreenshot = (name) =>
    path.join(outputRoot, "screenshots", `source-refresh-${name}.png`);
  await transitionPage.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 60_000 });
  await transitionPage.waitForFunction(() => document.querySelectorAll("canvas").length > 0, null, { timeout: 20_000 });
  await transitionPage.waitForTimeout(750);
  await transitionPage.screenshot({ path: transitionScreenshot("loader-held") });

  const loaderState = await transitionPage.evaluate(() => ({
    timestamp: performance.now(),
    bodyText: document.body.innerText,
    canvases: Array.from(document.querySelectorAll("canvas")).map((canvas, index) => {
      const rect = canvas.getBoundingClientRect();
      const style = getComputedStyle(canvas);
      return {
        index,
        id: canvas.dataset.wseSurfaceId ?? null,
        bounds: rect.toJSON(),
        backingSize: [canvas.width, canvas.height],
        visibility: style.visibility,
        opacity: style.opacity,
        zIndex: style.zIndex,
      };
    }),
    centeredDomCandidates: Array.from(document.querySelectorAll("body *")).filter((element) => {
      const rect = element.getBoundingClientRect();
      return rect.width > 20 && rect.width < 300 && rect.height < 100 &&
        Math.abs(rect.x + rect.width / 2 - innerWidth / 2) < 80 &&
        Math.abs(rect.y + rect.height / 2 - innerHeight / 2) < 80;
    }).slice(0, 20).map((element) => ({
      tag: element.tagName,
      className: element.className,
      text: element.textContent,
      rect: element.getBoundingClientRect().toJSON(),
    })),
    loaderMarkup: Array.from(document.querySelectorAll("body *")).find((element) => {
      const rect = element.getBoundingClientRect();
      return rect.width === 140 && rect.height === 16 &&
        Math.abs(rect.x + rect.width / 2 - innerWidth / 2) < 2 &&
        Math.abs(rect.y + rect.height / 2 - innerHeight / 2) < 2;
    })?.outerHTML ?? null,
    capture: window.__wseTransitionCapture,
  }));

  for (let index = 0; index < loaderState.canvases.length; index += 1) {
    await transitionPage.locator("canvas").nth(index).evaluate((canvas) => {
      canvas.dataset.wsePreviousVisibility = canvas.style.visibility;
      canvas.style.visibility = "hidden";
    });
    await transitionPage.waitForTimeout(100);
    await transitionPage.screenshot({ path: transitionScreenshot(`loader-ablate-${index + 1}`) });
    await transitionPage.locator("canvas").nth(index).evaluate((canvas) => {
      canvas.style.visibility = canvas.dataset.wsePreviousVisibility ?? "";
      delete canvas.dataset.wsePreviousVisibility;
    });
  }

  releaseHeldAssets();
  const timeline = [];
  let previousDelay = 0;
  for (const delay of [0, 120, 260, 420, 620, 850, 1120, 1450, 1850, 2400, 3200, 4500]) {
    await transitionPage.waitForTimeout(delay - previousDelay);
    previousDelay = delay;
    const state = await transitionPage.evaluate(() => {
      const findTextElement = (needle) => Array.from(document.querySelectorAll("span, p, h1, div"))
        .find((element) => element.childElementCount > 0 && element.textContent?.trim() === needle);
      const inspectText = (needle) => {
        const element = findTextElement(needle);
        if (!element) return null;
        const style = getComputedStyle(element);
        return {
          tag: element.tagName,
          className: element.className,
          opacity: style.opacity,
          transform: style.transform,
          childCount: element.children.length,
          children: Array.from(element.children).slice(0, 48).map((child) => {
            const childStyle = getComputedStyle(child);
            return { text: child.textContent, opacity: childStyle.opacity, transform: childStyle.transform };
          }),
        };
      };
      return {
        timestamp: performance.now(),
        canvases: Array.from(document.querySelectorAll("canvas")).map((canvas) => canvas.dataset.wseSurfaceId ?? null),
        bodyTextLength: document.body.innerText.length,
        text: {
          bring: inspectText("I bring"),
          craft: inspectText("craft & taste"),
          digital: inspectText("to digital work"),
          discipline: inspectText("Design &Engineering"),
        },
      };
    });
    timeline.push({ delayAfterReleaseMs: delay, ...state });
    await transitionPage.screenshot({ path: transitionScreenshot(`entrance-${String(delay).padStart(4, "0")}ms`) });
  }

  const settledState = await transitionPage.evaluate(() => ({
    timestamp: performance.now(),
    canvases: Array.from(document.querySelectorAll("canvas")).map((canvas) => ({
      id: canvas.dataset.wseSurfaceId ?? null,
      bounds: canvas.getBoundingClientRect().toJSON(),
      backingSize: [canvas.width, canvas.height],
    })),
    capture: window.__wseTransitionCapture,
    scrollables: Array.from(document.querySelectorAll("*")).filter((element) => {
      const style = getComputedStyle(element);
      return /(auto|scroll)/.test(style.overflowY) && element.scrollHeight > element.clientHeight + 2;
    }).map((element) => ({
      tag: element.tagName,
      className: element.className,
      bounds: element.getBoundingClientRect().toJSON(),
      clientHeight: element.clientHeight,
      scrollHeight: element.scrollHeight,
      scrollbarWidth: getComputedStyle(element).scrollbarWidth,
    })),
    rightEdgeDomCandidates: Array.from(document.querySelectorAll("body *")).filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.right > innerWidth - 70 && rect.width <= 70 && rect.height >= 18 &&
        style.visibility !== "hidden" && style.display !== "none";
    }).slice(0, 40).map((element) => {
      const style = getComputedStyle(element);
      return {
        tag: element.tagName,
        className: element.className,
        rect: element.getBoundingClientRect().toJSON(),
        position: style.position,
        background: style.background,
        borderRadius: style.borderRadius,
        opacity: style.opacity,
        transform: style.transform,
        outerHTML: element.outerHTML.slice(0, 1200),
      };
    }),
  }));

  const matchedSourceFiles = [];
  for (const scriptUrl of [...new Set(transitionNetwork.filter((item) => item.resourceType === "script").map((item) => item.url))]) {
    const response = await transitionContext.request.get(scriptUrl);
    if (!response.ok()) continue;
    const body = await response.text();
    if (!/(71358|startDelayMs|letterDelayMs|w-\[140px\]|scrollbar|scrollThumb)/.test(body)) continue;
    const filename = new URL(scriptUrl).pathname.split("/").at(-1);
    await fs.writeFile(path.join(outputRoot, "source", filename), body);
    matchedSourceFiles.push(filename);
  }

  await Promise.all([
    fs.writeFile(path.join(outputRoot, "runtime", "refresh-transition.json"), JSON.stringify({ loaderState, timeline, settledState, consoleMessages }, null, 2)),
    fs.writeFile(path.join(outputRoot, "network", "refresh-responses.json"), JSON.stringify(transitionNetwork, null, 2)),
  ]);
  await transitionContext.close();
  await browser.close();
  console.log(JSON.stringify({
    targetUrl,
    loaderCanvases: loaderState.canvases.length,
    centeredDomCandidates: loaderState.centeredDomCandidates.length,
    settledCanvases: settledState.canvases.length,
    transitionFrames: timeline.length,
    responses: transitionNetwork.length,
    matchedSourceFiles,
    consoleMessages,
  }, null, 2));
  process.exit(0);
}

const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  colorScheme: "light",
  reducedMotion: "no-preference",
});

const page = await context.newPage();
const network = [];

page.on("response", (response) => {
  const request = response.request();
  network.push({
    url: response.url(),
    status: response.status(),
    resourceType: request.resourceType(),
    method: request.method(),
    contentType: response.headers()["content-type"] ?? null,
    contentLength: response.headers()["content-length"] ?? null,
  });
});

await page.addInitScript(() => {
  const capture = {
    contextCalls: [],
    shaderSources: [],
    canvasSequence: 0,
    shaderSequence: 0,
  };
  Object.defineProperty(window, "__wseCapture", {
    value: capture,
    configurable: false,
    enumerable: false,
    writable: false,
  });

  const canvasIds = new WeakMap();
  const shaderIds = new WeakMap();
  const canvasId = (canvas) => {
    if (!canvasIds.has(canvas)) {
      capture.canvasSequence += 1;
      canvasIds.set(canvas, `surface-${capture.canvasSequence}`);
      canvas.dataset.wseSurfaceId = `surface-${capture.canvasSequence}`;
    }
    return canvasIds.get(canvas);
  };
  const shaderId = (shader) => {
    if (!shaderIds.has(shader)) {
      capture.shaderSequence += 1;
      shaderIds.set(shader, `shader-${capture.shaderSequence}`);
    }
    return shaderIds.get(shader);
  };

  const originalGetContext = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function patchedGetContext(
    type,
    attributes,
  ) {
    const result = originalGetContext.call(this, type, attributes);
    capture.contextCalls.push({
      canvasId: canvasId(this),
      type,
      attributes: attributes ?? null,
      succeeded: Boolean(result),
      stack: new Error().stack,
    });
    if (result && !result.__wseCanvasId) {
      try {
        Object.defineProperty(result, "__wseCanvasId", {
          value: canvasId(this),
        });
      } catch {}
    }
    return result;
  };

  const patchShaderSource = (ContextClass) => {
    if (!ContextClass?.prototype?.shaderSource) return;
    const originalShaderSource = ContextClass.prototype.shaderSource;
    ContextClass.prototype.shaderSource = function patchedShaderSource(
      shader,
      source,
    ) {
      capture.shaderSources.push({
        canvasId: this.__wseCanvasId ?? "unknown",
        shaderId: shaderId(shader),
        source,
        stack: new Error().stack,
      });
      return originalShaderSource.call(this, shader, source);
    };
  };

  patchShaderSource(window.WebGLRenderingContext);
  patchShaderSource(window.WebGL2RenderingContext);
});

await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 60_000 });
await page.waitForTimeout(12_000);

const screenshotPath = (name) =>
  path.join(outputRoot, "screenshots", `${name}.png`);

await page.screenshot({ path: screenshotPath("source-home-top") });
await page.waitForTimeout(500);
await page.screenshot({ path: screenshotPath("source-home-top-frame-2") });

const inventory = await page.evaluate(() => {
  const selectorFor = (element) => {
    if (element.id) return `${element.tagName.toLowerCase()}#${element.id}`;
    const classes = Array.from(element.classList).slice(0, 3).join(".");
    const index = Array.from(document.querySelectorAll(element.tagName)).indexOf(
      element,
    );
    return `${element.tagName.toLowerCase()}${classes ? `.${classes}` : ""}:nth-of-type(${index + 1})`;
  };

  const surfaces = Array.from(document.querySelectorAll("canvas")).map(
    (canvas, index) => {
      const rect = canvas.getBoundingClientRect();
      const style = getComputedStyle(canvas);
      return {
        index,
        selector: selectorFor(canvas),
        bounds: {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
        },
        cssSize: { width: canvas.clientWidth, height: canvas.clientHeight },
        backingSize: { width: canvas.width, height: canvas.height },
        visibility: style.visibility,
        opacity: style.opacity,
        display: style.display,
        position: style.position,
        zIndex: style.zIndex,
        pointerEvents: style.pointerEvents,
        parentClass: canvas.parentElement?.parentElement?.className ?? null,
        dataset: { ...canvas.dataset },
      };
    },
  );

  const scrollables = Array.from(document.querySelectorAll("*"))
    .filter((element) => {
      const style = getComputedStyle(element);
      return (
        /(auto|scroll)/.test(style.overflowY) &&
        element.scrollHeight > element.clientHeight + 2
      );
    })
    .map((element) => ({
      selector: selectorFor(element),
      clientHeight: element.clientHeight,
      scrollHeight: element.scrollHeight,
      scrollTop: element.scrollTop,
    }));

  return {
    url: location.href,
    title: document.title,
    viewport: {
      width: innerWidth,
      height: innerHeight,
      dpr: devicePixelRatio,
    },
    surfaces,
    scrollables,
    iframes: Array.from(document.querySelectorAll("iframe")).map((iframe) => ({
      src: iframe.src,
      bounds: iframe.getBoundingClientRect().toJSON(),
    })),
    videos: Array.from(document.querySelectorAll("video")).map((video) => ({
      src: video.currentSrc,
      bounds: video.getBoundingClientRect().toJSON(),
    })),
    svgs: document.querySelectorAll("svg").length,
    links: Array.from(document.querySelectorAll("a[href]")).map((link) => ({
      text: link.textContent?.trim() ?? "",
      href: link.href,
    })),
    capture: window.__wseCapture,
  };
});

for (const surface of inventory.surfaces) {
  await page.locator("canvas").nth(surface.index).evaluate((canvas) => {
    canvas.dataset.wseVisibility = canvas.style.visibility;
    canvas.style.visibility = "hidden";
  });
  await page.waitForTimeout(250);
  await page.screenshot({
    path: screenshotPath(`source-home-ablate-canvas-${surface.index + 1}`),
  });
  await page.locator("canvas").nth(surface.index).evaluate((canvas) => {
    canvas.style.visibility = canvas.dataset.wseVisibility ?? "";
    delete canvas.dataset.wseVisibility;
  });
}

if (inventory.scrollables.length > 0) {
  for (const [label, progress] of [
    ["quarter", 0.25],
    ["half", 0.5],
    ["three-quarter", 0.75],
    ["footer", 1],
  ]) {
    await page.evaluate((p) => {
      const element = Array.from(document.querySelectorAll("*")).find(
        (candidate) => {
          const style = getComputedStyle(candidate);
          return (
            /(auto|scroll)/.test(style.overflowY) &&
            candidate.scrollHeight > candidate.clientHeight + 2
          );
        },
      );
      if (element) {
        element.scrollTop =
          (element.scrollHeight - element.clientHeight) * p;
      }
    }, progress);
    await page.waitForTimeout(1_200);
    await page.screenshot({ path: screenshotPath(`source-home-${label}`) });
  }

  await page.evaluate(() => {
    const element = Array.from(document.querySelectorAll("*")).find(
      (candidate) => {
        const style = getComputedStyle(candidate);
        return (
          /(auto|scroll)/.test(style.overflowY) &&
          candidate.scrollHeight > candidate.clientHeight + 2
        );
      },
    );
    if (element) element.scrollTop = 0;
  });
}

await page.mouse.move(160, 180);
await page.waitForTimeout(300);
await page.mouse.move(1180, 680, { steps: 16 });
await page.waitForTimeout(900);
await page.screenshot({ path: screenshotPath("source-home-pointer") });

const finalRuntime = await page.evaluate(() => ({
  capture: window.__wseCapture,
  bodyText: document.body.innerText,
  htmlClass: document.documentElement.className,
  bodyClass: document.body.className,
  fonts: Array.from(document.fonts).map((font) => ({
    family: font.family,
    style: font.style,
    weight: font.weight,
    status: font.status,
  })),
  resources: performance.getEntriesByType("resource").map((entry) => ({
    name: entry.name,
    initiatorType: entry.initiatorType,
    duration: entry.duration,
    transferSize: entry.transferSize,
  })),
}));

await Promise.all([
  fs.writeFile(
    path.join(outputRoot, "runtime", "home-inventory.json"),
    JSON.stringify(inventory, null, 2),
  ),
  fs.writeFile(
    path.join(outputRoot, "runtime", "home-final.json"),
    JSON.stringify(finalRuntime, null, 2),
  ),
  fs.writeFile(
    path.join(outputRoot, "network", "home-responses.json"),
    JSON.stringify(network, null, 2),
  ),
]);

await browser.close();

console.log(
  JSON.stringify(
    {
      targetUrl,
      surfaces: inventory.surfaces.length,
      contexts: finalRuntime.capture.contextCalls.length,
      shaders: finalRuntime.capture.shaderSources.length,
      responses: network.length,
      scrollables: inventory.scrollables.length,
    },
    null,
    2,
  ),
);
