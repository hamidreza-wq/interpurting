# Interprēt Language Studio

A responsive interpreting studio site built with React, Vite, and Tailwind CSS.

## Run locally

```sh
npm ci
npm run dev
```

## Checks

```sh
npm run lint
npm run build
```

## GitHub Pages

GitHub Pages publishes the built site from the `docs/` folder on `main` at
<https://hamidreza-wq.github.io/interpurting/>. To update the published site,
run `npm run build`, copy the contents of `dist/` into `docs/`, and push the
updated `docs/` folder.

Sign-in and registration are demo-only client-side flows. Do not use them for
real accounts until an authentication provider is connected.
