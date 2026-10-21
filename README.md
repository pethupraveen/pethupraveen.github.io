# E-Commerce & MIS Portfolio — Praveen Kumar

A clean, responsive static portfolio and interactive marketplace sales dashboard for GitHub Pages.

## What's included
- `index.html` — portfolio homepage
- `projects/sales-dashboard.html` — interactive sales dashboard
- `css/style.css` — responsive styling
- `js/main.js` — navigation and footer year
- `js/dashboard.js` — filters, KPIs, charts, insights, and CSV export
- `data/sample-sales.json` — fictional sample marketplace records

## Important data note
All sales data is synthetic and illustrative. Do not present it as actual company performance. Replace it only with data you are authorized to share, and anonymize sensitive business details.

## Publish to GitHub Pages
1. Download and unzip this project.
2. Back up your existing repository or create a new Git branch before replacing files.
3. Copy the contents of this folder into the root of `pethupraveen.github.io`.
4. Commit and push the files to the repository's publishing branch (commonly `main`).
5. In GitHub, open **Settings → Pages** and confirm the correct branch and `/ (root)` folder are selected.
6. Wait for deployment, then open `https://pethupraveen.github.io/`.
7. Test the dashboard at `https://pethupraveen.github.io/projects/sales-dashboard.html`.

## Notes
- The dashboard fetches its JSON data using `fetch()`, so test it through GitHub Pages or a local web server, not by opening the HTML file directly with `file://`.
- Chart.js and Google Fonts are loaded from CDNs and therefore require an internet connection.
- Update the LinkedIn link in `index.html` to your real profile. Add your resume only when the PDF is ready.
- This package does not modify your live GitHub repository. You must upload/commit the files yourself unless you connect a GitHub integration that supports repository edits.
