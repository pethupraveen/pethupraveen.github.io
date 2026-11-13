// Renders every page component through react-dom/server to catch runtime
// errors (bad imports, undefined props, broken map calls) that a successful
// bundle build would not reveal.
import { createServer } from "vite";
import { renderToString } from "react-dom/server";
import { createElement as h } from "react";
import { MemoryRouter } from "react-router-dom";

const root = process.cwd();
const vite = await createServer({
  root,
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});

const pages = [
  ["Home", "/src/pages/Home.jsx", "/"],
  ["About", "/src/pages/About.jsx", "/about"],
  ["Skills", "/src/pages/Skills.jsx", "/skills"],
  ["Projects", "/src/pages/Projects.jsx", "/projects"],
  ["Reporting", "/src/pages/Reporting.jsx", "/reporting"],
  ["Contact", "/src/pages/Contact.jsx", "/contact"],
  ["Navbar", "/src/components/Navbar.jsx", "/"],
  ["Footer", "/src/components/Footer.jsx", "/"],
];

let failures = 0;
for (const [name, path, route] of pages) {
  try {
    const mod = await vite.ssrLoadModule(path);
    const html = renderToString(
      h(MemoryRouter, { initialEntries: [route] }, h(mod.default))
    );
    const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    console.log(`PASS ${name.padEnd(10)} html:${String(html.length).padStart(6)}  text:${String(text.length).padStart(5)}`);
  } catch (err) {
    failures++;
    console.log(`FAIL ${name}: ${err.message}`);
  }
}

// also render each dashboard on its own
const dashboards = [
  "SalesDashboard",
  "InventoryDashboard",
  "SkuDashboard",
  "PricingDashboard",
  "LaunchDashboard",
  "CompatibilityChecker",
];
for (const d of dashboards) {
  try {
    const mod = await vite.ssrLoadModule(`/src/components/dashboards/${d}.jsx`);
    const html = renderToString(h(mod.default));
    console.log(`PASS ${d.padEnd(22)} html:${String(html.length).padStart(6)}`);
  } catch (err) {
    failures++;
    console.log(`FAIL ${d}: ${err.message}`);
  }
}

await vite.close();
console.log(failures ? `\n${failures} FAILURES` : "\nAll components rendered.");
process.exit(failures ? 1 : 0);
