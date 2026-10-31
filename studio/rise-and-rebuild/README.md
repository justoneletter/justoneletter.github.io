# Rise & Rebuild — GitHub Pages site

An independent, summit-inspired educational presentation site for `justoneletter`.

## Live URL (after deployment)

**https://justoneletter.github.io/rise-and-rebuild/**

The URL will not work until the repository is created, the files are uploaded, and GitHub Pages is enabled.

## Publish in 5 steps

1. On GitHub, select **New repository** and name it **`rise-and-rebuild`**. Make it **Public** (required for GitHub Pages on Free accounts). You can skip creating a README to avoid merge conflicts.
2. Download and **extract this ZIP**. Its top-level contents are `index.html`, `styles.css`, `site.js`, `slides.json`, `favicon.svg`, `.nojekyll`, `assets/`, and `downloads/`.
3. Upload the **contents of this folder** to the root of the new repository. Easiest from a computer via Git or a Git GUI: do not upload the ZIP itself as a single file.
4. Go to **Settings → Pages → Build and deployment → Source: Deploy from a branch → main → /(root) → Save**.
5. Wait a few minutes, then open **https://justoneletter.github.io/rise-and-rebuild/**.

## Publish with Git from a computer

From inside the extracted folder:

```bash
git init
git add .
git commit -m "Publish Rise & Rebuild learning site"
git branch -M main
git remote add origin https://github.com/justoneletter/rise-and-rebuild.git
git push -u origin main
```

Requires Git and being signed into GitHub with permission to push. If the remote repository already has commits, don't force-push; use a proper clone/merge workflow instead.

## Features

- 68 responsive, locally-hosted slide images with keyboard, swipe and thumbnail navigation
- Direct link to each slide (e.g. `#slide-18`)
- Chapter links and clear speaker summaries
- Reflection/practice section and group discussion jump links
- PDF, PPTX and independent field-guide downloads
- No login, external API, database, analytics, or build step required
- Static site: works on GitHub Pages / Netlify / any static file host

## Update later with recordings

Make an independent, sourced expansion to the deck; then regenerate thumbnails and main slide images and replace the downloadable PDF/PPTX. Session 5 and panel Q&A are intentionally not represented as verified content in this edition.

## Privacy and rights

- Original photographs / handwritten pages are **not included**.
- Personal legal and declaration-related notes are **not included**.
- This is **not an official Pure Desire Ministries or Grace Church product**.
- Before public redistribution, review source attribution and permissions for any third-party quotations or materials appearing in slide text. No original conference photos, recorded videos, or manual scans have been republished in this site.

## Optional customization

Modify `index.html`, `styles.css`, and `site.js`. Main accent colors are in CSS `:root`. No compiling necessary.
