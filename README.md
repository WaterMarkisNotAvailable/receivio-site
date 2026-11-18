# Receivio site

Landing page for Receivio, our capstone smart parcel receiving vault.
Plain HTML, CSS and JavaScript; no build step. Served by GitHub Pages at
https://watermarkisnotavailable.github.io/receivio-site/

## Turn on the download

The page currently shows **App coming soon** instead of a download button,
because the app is still being finished and tested. When the first APK is
released (see below):

1. In `index.html`, replace both `<span class="btn btn-soon" ...>...</span>`
   blocks with:

   ```html
   <a class="btn btn-primary"
      href="https://github.com/WaterMarkisNotAvailable/receivio-site/releases/latest/download/receivio.apk">
     <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m0 0l-5-5m5 5l5-5M5 21h14"/></svg>
     Download APK
   </a>
   ```

2. Delete the `<p class="note soon-note">` paragraph in the Install section.
3. In the hero, change the ghost button to `<a class="btn btn-ghost" href="#install">How to install</a>`
   and the fine print to `Android 7.0 or newer · Free · Capstone prototype`.

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
