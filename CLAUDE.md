# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **ownCloud Documentation UI** — a custom [Antora](https://antora.org/) UI theme for ownCloud documentation. It produces a `ui-bundle.zip` artifact that Antora uses when building the ownCloud docs site. The project is based on the Antora Default UI and extends it with ownCloud branding, search (Elasticsearch), and custom components.

## Commands

```bash
npm install          # Install dependencies
npm run lint         # Lint CSS (stylelint) and JS (eslint)
npm run bundle       # Full build: lint → compile → pack → ui-bundle.zip
npm run preview      # Build and serve preview at http://localhost:5252
npx gulp format      # Auto-format JS files with prettier-eslint (not part of CI)
```

There are no unit tests. The `bundle` task runs lint as part of the build.

## Architecture

### Build System

Gulp 5 orchestrates everything. Tasks live in `tasks/` and are registered in `gulpfile.js`:

- **`gulp bundle`** → `clean` → `lint` → `build` → `pack`  
- **`gulp preview`** → `bundle` → `build:preview` → `serve:site`

The `build` task compiles the `src/` tree into `build/`:
- CSS: PostCSS pipeline (`postcss-import` → `postcss-custom-properties` → `autoprefixer` → `cssnano`)
- JS: Browserify bundles vendor scripts; numbered files (`01-nav.js` … `07-breadcrumbs.js`) are concatenated in order and minified with Terser
- Fonts: copied via `postcss-url`
- SVGs: optimized via svgo

`pack` zips `build/` into `ui-bundle.zip`. `build:preview` renders the `preview-site-src/` files using Handlebars + Asciidoctor to produce a static site in `public/`.

### Source Layout (`src/`)

| Path | Purpose |
|------|---------|
| `css/` | Stylesheets. `site.css` is the entry point; `vars.css` / `owncloud-vars.css` define CSS custom properties |
| `js/` | Numbered JS modules (01–07) concatenated in order; `js/vendor/` holds pre-built third-party scripts (excluded from linting) |
| `helpers/` | Handlebars helpers (`and`, `eq`, `contains`, `relativize`, `year`, etc.) |
| `layouts/` | Handlebars page layouts (`default.hbs`, `404.hbs`) |
| `partials/` | Handlebars UI components (header, nav, footer, article, toc, breadcrumbs, …) |
| `static/` | Favicons, OpenGraph images, robots.txt, manifests — listed in `src/static/ui.yml` |

### Templating

Pages are rendered by combining a **layout** (`layouts/`) with **partials** (`partials/`). The Antora UI model (site, page, component metadata) is the data context passed to Handlebars. The `preview-site-src/ui-model.yml` contains a representative sample of this model for local preview.

### JavaScript Execution Order

The numbered filenames define concatenation order:
1. `01-nav.js` — sidebar navigation tree
2. `02-on-this-page.js` — in-page TOC
3. `03-fragment-jumper.js` — smooth anchor scrolling
4. `04-page-versions.js` — version selector
5. `05-mobile-navbar.js` — mobile hamburger menu
6. `06-copy-to-clipboard.js` — code block copy button
7. `07-breadcrumbs.js` — breadcrumb generation

## Key Constraints

- **Node 22** is required (matches CI). Use `nvm use` if you have nvm configured.
- **npm ≥ 11.11.0** is required.
- `js/vendor/` files are excluded from ESLint — do not add linting rules targeting them.
- CSS custom properties are intentionally left un-prefixed (stylelint rule disabled).
- The `del` and `chokidar` packages are ESM-only; the gulpfile handles this with dynamic `import()`.
