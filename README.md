# Praveen Kumar Pethumanickam — E-commerce MIS Analyst Portfolio

A six-page portfolio site built with React, Vite, Tailwind CSS, Recharts and
Lucide, deployed to GitHub Pages at <https://pethupraveen.github.io/>.

## Pages

| Route | Page | Contents |
| --- | --- | --- |
| `/` | Home | Hero, resume download, marketplace expertise, capability cards, project teaser |
| `/about` | About | Career journey, full professional experience, core competencies, education |
| `/skills` | Skills | Nine skill groups plus the weekly operating loop |
| `/projects` | Projects | Five case studies with category filters |
| `/reporting` | Excel & Reporting | Six interactive dashboards running on sample data |
| `/contact` | Contact | Email, LinkedIn, GitHub, phone, resume download |

## Interactive dashboards

`/reporting` hosts six filterable dashboards. Each tab is deep-linkable
(`/reporting#inventory`), and the project case studies link straight to their
matching dashboard.

- **Sales MIS** — channel-wise sales, 30-day vs 90-day, weekly trend, listing status split
- **Inventory** — ordered / received / pending, inventory ageing, PO tracker, reorder list
- **SKU performance** — per-SKU sales with channel, category, sort and search filters
- **Pricing tracker** — current price against the observed competitor range
- **Product launch** — handset launch pipeline with accessory, procurement, QC and listing status
- **Compatibility** — brand-wise model search returning matching back cover and tempered glass SKUs

## Data integrity

Resume content lives in `src/data/profile.js` and is taken verbatim from the
PDF resume. No sales figures, revenue, growth percentages, campaign ROAS,
business achievements, company results, employment dates or client names have
been invented.

Everything in `src/data/sampleData.js` is invented demonstration data — SKU
codes, brand and model names, prices and quantities are placeholders. It is
labelled as sample data on every page that renders it. No confidential employer
information appears anywhere in this repository.

## Run locally

```bash
npm install
npm run dev          # http://localhost:5173
```

Other scripts:

```bash
npm run build        # production build into dist/, then pre-renders every route
npm run preview      # serve the production build locally
npm run check        # server-renders every page and dashboard to catch runtime errors
```

Note: `npm run preview` falls back to `index.html` for extensionless paths, so
it does not reflect how pre-rendered routes are served in production. To check
those the way GitHub Pages serves them, use a plain static server:

```bash
npx serve dist
```

## Publish to GitHub Pages

Deployment runs through GitHub Actions — there is no `gh-pages` branch to
maintain and nothing to build by hand.

1. In the repository, open **Settings → Pages** and set **Source** to
   **GitHub Actions**.
2. Push to the `gh-home` branch. `.github/workflows/deploy.yml` installs
   dependencies, runs `npm run build` and publishes `dist/`.
3. The site goes live at <https://pethupraveen.github.io/>. The workflow can
   also be started manually from the **Actions** tab (`workflow_dispatch`).

To deploy from a different branch, change the branch name under `on.push.branches`
in `.github/workflows/deploy.yml`.

### Base path

This is a GitHub Pages **user site**, served from the domain root, so
`vite.config.js` sets `base: '/'`. If the site ever moves to a project
repository, change it to `base: '/<repo-name>/'`.

### Deep links and pre-rendering

GitHub Pages has no SPA rewrite rule, so every route is pre-rendered to a real
HTML file. After `vite build`, `scripts/prerender.mjs` renders each route with
React's static `prerenderToNodeStream` and writes `dist/about/index.html`,
`dist/projects/index.html` and so on, each with its own `<title>`, meta
description, Open Graph tags and canonical URL. Deep links therefore return a
genuine 200 with indexable content rather than a 404 fallback, and the client
hydrates that markup instead of re-rendering over it.

`dist/404.html` remains as the fallback for paths that have no file. It is
written from the empty template, so unknown paths render fresh on the client
rather than hydrating the wrong route.

`public/.nojekyll` stops GitHub from running Jekyll over the build output.

Routes are declared once in `src/data/seo.js` — adding a page means adding a
route there, a `<Route>` in `src/App.jsx` and a `<loc>` in `public/sitemap.xml`.
GitHub Pages redirects `/about` to `/about/`, so canonical URLs and the sitemap
use the trailing-slash form.

## Resume

The downloadable PDF is `public/resume/Praveen-Kumar-Pethumanickam-Resume.pdf`.
To update it, replace that file and keep the filename, or change `resumePath`
and `resumeFileName` in `src/data/profile.js`.

## Project layout

```
index.html                     entry document with SEO and JSON-LD metadata
public/                        resume PDF, favicon, robots.txt, sitemap.xml, .nojekyll
src/
  App.jsx                      routes, document titles, scroll handling
  index.css                    Tailwind v4 theme tokens, base styles, animations
  components/
    Navbar.jsx  Footer.jsx     site chrome
    ui.jsx                     PageHeader, Section, Card, Stat, Pill, sample-data notices
    BrandIcons.jsx             LinkedIn and GitHub marks
    HeroChart.jsx              lazily loaded hero chart
    dashboards/                the six interactive dashboards plus shared filter controls
  data/
    profile.js                 resume content
    projects.js                case studies
    sampleData.js              demonstration datasets
    seo.js                     per-route titles, descriptions and file paths
scripts/
  prerender.mjs                pre-renders every route to HTML after a build
  render-check.mjs             server-render smoke test
legacy/                        the previous hand-written static site, kept for reference
```

## Notes

- No backend, no paid APIs, no runtime data fetching — everything ships as static files.
- Inter is loaded from Google Fonts with a system font fallback stack.
- Respects `prefers-reduced-motion`; animations are disabled for users who ask for that.
