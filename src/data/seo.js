// Per-route metadata. Used by the client for document.title on navigation and
// by scripts/prerender.mjs to write real <title>, description and canonical
// tags into each pre-rendered HTML file.

export const SITE_URL = "https://pethupraveen.github.io";

export const routes = [
  {
    path: "/",
    file: "index.html",
    title: "Praveen Kumar Pethumanickam — E-commerce MIS Analyst",
    description:
      "Portfolio of Praveen Kumar Pethumanickam, E-commerce MIS Analyst in Bengaluru. Marketplace operations, inventory management, advanced Excel reporting and Shopify operations across Amazon, Flipkart, Myntra and Shopify.",
  },
  {
    path: "/about",
    file: "about/index.html",
    title: "About — Praveen Kumar Pethumanickam",
    description:
      "Career journey and professional experience of Praveen Kumar Pethumanickam across Jamsticks India, Sony Pictures, Star India and Guild Digital Network, with core competencies and education.",
  },
  {
    path: "/skills",
    file: "skills/index.html",
    title: "Skills — Praveen Kumar Pethumanickam",
    description:
      "Marketplace management, Shopify operations, product listing, inventory and procurement, MIS reporting, advanced Excel, pricing management, advertising campaign reporting and AI-assisted web tool development.",
  },
  {
    path: "/projects",
    file: "projects/index.html",
    title: "Projects — Praveen Kumar Pethumanickam",
    description:
      "Five e-commerce MIS case studies: sales dashboard, inventory and procurement tracker, mobile model launch tracker, product compatibility checker and marketplace operations.",
  },
  {
    path: "/reporting",
    file: "reporting/index.html",
    title: "Excel & Reporting — Praveen Kumar Pethumanickam",
    description:
      "Six interactive dashboards covering sales MIS, inventory, SKU performance, pricing, product launches and product compatibility. All figures are clearly labelled sample data.",
  },
  {
    path: "/contact",
    file: "contact/index.html",
    title: "Contact — Praveen Kumar Pethumanickam",
    description:
      "Get in touch with Praveen Kumar Pethumanickam — email, LinkedIn, GitHub and resume download.",
  },
];

export const titleByPath = Object.fromEntries(
  routes.map((r) => [r.path, r.title])
);

export const DEFAULT_TITLE = routes[0].title;
