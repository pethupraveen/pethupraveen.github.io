# Praveen Kumar — E-commerce & Analytics Portfolio

A responsive static portfolio for GitHub Pages, showcasing six projects in marketplace automation, inventory analytics, and data collection.

## Features

- Project previews with Automation, Analytics, and Data collection filters
- Expandable workflow details for each project
- Links to public repositories and the interactive sales dashboard
- About, expertise, and GitHub contact sections
- Mobile navigation, keyboard support, and reduced-motion preferences

## Files

- `index.html` — portfolio homepage and project content
- `css/portfolio.css` — portfolio design and responsive layout
- `js/main.js` — project filters, navigation, and footer year
- `favicon.svg` — portfolio icon
- `projects/sales-dashboard.html` — interactive sample sales dashboard
- `css/style.css` — dashboard styling
- `js/dashboard.js` — dashboard filters, charts, and CSV export
- `data/sample-sales.json` — fictional sample marketplace records

## Preview

Open `index.html` in a browser to view the portfolio. To use the sales dashboard, serve this folder over HTTP, for example with `npx --yes serve .`, then open the printed local URL. The dashboard fetches JSON and cannot load it through `file://`.

Google Fonts and the dashboard's Chart.js library use CDNs. The portfolio layout includes system font fallbacks.

## Customize

Edit project text, repository links, and biography in `index.html`. Contact links currently point to the existing GitHub profile. Add an email, personal LinkedIn profile, or resume when available.

All dashboard figures and project visual previews are illustrative. They do not represent actual company results. Private tools are described as portfolio projects and are not hosted by this website.

## Publish to GitHub Pages

Commit and push the files to the repository's publishing branch. In GitHub Settings → Pages, select the publishing branch and root folder. This site uses relative asset paths and needs no build step.

The expected public URL is https://pethupraveen.github.io/ after GitHub Pages deploys the repository. Local edits do not update the published site until pushed and deployed.
