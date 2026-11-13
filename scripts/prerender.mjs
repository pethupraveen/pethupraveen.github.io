// Pre-renders every route to a real HTML file after `vite build`.
//
// GitHub Pages has no SPA rewrite rule, so a deep link such as /projects would
// otherwise be served through 404.html with a 404 status — fine for a human,
// but it keeps the route out of search indexes. Writing dist/projects/index.html
// makes each route a genuine 200 document with its own title, description and
// canonical URL, pre-filled with the rendered markup. The client then hydrates
// that markup instead of rendering over it.
//
// dist/404.html stays as the fallback for paths that have no file.

import { createServer } from "vite";
import { prerenderToNodeStream } from "react-dom/static";
import { createElement as h } from "react";
import { MemoryRouter } from "react-router-dom";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";

const root = process.cwd();
const dist = resolve(root, "dist");
const template = resolve(dist, "index.html");

if (!existsSync(template)) {
  console.error("prerender: dist/index.html not found. Run `vite build` first.");
  process.exit(1);
}

const html = await readFile(template, "utf8");

const vite = await createServer({
  root,
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});

const { default: App } = await vite.ssrLoadModule("/src/App.jsx");
const { routes, SITE_URL } = await vite.ssrLoadModule("/src/data/seo.js");

function escapeAttr(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function applyMeta(doc, route) {
  // GitHub Pages redirects /about to /about/, so canonicals carry the slash.
  const canonical = SITE_URL + (route.path === "/" ? "/" : route.path + "/");
  const title = escapeAttr(route.title);
  const description = escapeAttr(route.description);

  return doc
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${description}" />`
    )
    .replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${canonical}" />`
    )
    .replace(
      /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${canonical}" />`
    )
    .replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${title}" />`
    )
    .replace(
      /<meta\s+property="og:description"[\s\S]*?\/>/,
      `<meta property="og:description" content="${description}" />`
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*" \/>/,
      `<meta name="twitter:title" content="${title}" />`
    )
    .replace(
      /<meta\s+name="twitter:description"[\s\S]*?\/>/,
      `<meta name="twitter:description" content="${description}" />`
    );
}

let failures = 0;

for (const route of routes) {
  try {
    // prerenderToNodeStream waits for lazy components and Suspense
    // boundaries to settle, so the output hydrates cleanly. renderToString
    // cannot do this — it emits the fallback and hydration then fails.
    const { prelude } = await prerenderToNodeStream(
      h(MemoryRouter, { initialEntries: [route.path] }, h(App))
    );

    const chunks = [];
    for await (const chunk of prelude) chunks.push(chunk);
    const full = Buffer.concat(chunks).toString("utf8");

    // prelude is a whole document shell; take what belongs inside #root.
    const markup = full
      .replace(/^[\s\S]*?<body[^>]*>/, "")
      .replace(/<\/body>[\s\S]*$/, "");

    let doc = applyMeta(html, route);
    doc = doc.replace(
      '<div id="root"></div>',
      `<div id="root">${markup}</div>`
    );

    const out = join(dist, route.file);
    await mkdir(dirname(out), { recursive: true });
    await writeFile(out, doc, "utf8");

    const kb = (Buffer.byteLength(doc) / 1024).toFixed(1);
    console.log(`prerender: ${route.file.padEnd(22)} ${kb.padStart(6)} kB  ${route.path}`);
  } catch (err) {
    failures++;
    console.error(`prerender: FAILED ${route.path} — ${err.message}`);
  }
}

// Unknown paths still fall back to the client-rendered shell. This is written
// from the original empty-root template, not from a pre-rendered page, so the
// client renders fresh rather than hydrating the wrong route's markup.
await writeFile(resolve(dist, "404.html"), html, "utf8");
console.log("prerender: wrote dist/404.html fallback");

await vite.close();

if (failures) {
  console.error(`prerender: ${failures} route(s) failed`);
  process.exit(1);
}
