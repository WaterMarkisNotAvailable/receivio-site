# Receivio site

Landing page for Receivio, our capstone smart parcel receiving vault.
Plain HTML, CSS and JavaScript; no build step.

Live at **https://receivio.netlify.app/**. Netlify is connected to this
repo, so every push to `main` redeploys the site within a minute or two.
GitHub Pages also serves a copy at
https://watermarkisnotavailable.github.io/receivio-site/

## Publish a new APK

The Download button always points to:

```
https://github.com/WaterMarkisNotAvailable/receivio-site/releases/latest/download/receivio.apk
```

So a new version needs no change to the page:

1. Build the APK in the app repo: `npm run build:apk`, then download it from the EAS build page.
2. Rename the file to exactly `receivio.apk`.
3. On this repo: **Releases → Draft a new release**, create a tag (for example `v1.0.1`),
   attach `receivio.apk`, and click **Publish release**.

## Edit the page

- `index.html` — all text and sections
- `style.css` — colors (same palette as the app) and layout
- `script.js` — theme toggle and the abstract's "Read more"

Preview locally by opening `index.html` in a browser.
