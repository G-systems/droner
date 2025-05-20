# DRONER Static Website

This repository contains the source for the **DRONER** marketing site. The site is written in static HTML with a small amount of JavaScript and CSS. It is designed for both Hebrew (RTL) and English (LTR) audiences and is deployed using **Azure Static Web Apps** via GitHub Actions.

## Folder Structure

- `assets/` – Images, CSS, and JavaScript used by the pages
- `pages/` – Additional content pages
- `styles/` – Stand‑alone CSS used across the site
- `js/`, `scripts/`, `src/` – Development scripts and experimental code
- `index.html` – Main landing page
- `privacy-policy.html`, `terms-of-service.html` – Legal documents
- `data-deletion.html`, `data-deletion` – Data deletion request page

## Development

No build step is required. Open `index.html` in a browser or serve the repository through any static web server. If you modify the CSS/JS under `src/`, you can integrate your own tooling (e.g. Tailwind) to generate files inside `assets/` or `styles/`.

### Local Preview

```bash
# Example using Python 3
python3 -m http.server 8000
# Then browse to http://localhost:8000
```

## Deployment

The site is automatically deployed to Azure Static Web Apps when changes are pushed to the `main` branch. The GitHub Actions workflow is defined under `.github/workflows/`.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

