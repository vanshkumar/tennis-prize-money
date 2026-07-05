# Deployment

## GitHub Pages Path

This is now a standalone React + Vite repository deployed directly to GitHub Pages.

The Pages settings should use:

- Source: `GitHub Actions`
- Workflow: `.github/workflows/deploy.yml`
- Published artifact: `dist/`

The screenshot setting, `Deploy from a branch` with `main` and `/(root)`, is not enough for this app because Vite source files need a build step before GitHub Pages can serve them.

The app Vite config intentionally keeps:

```ts
base: '/tennis-prize-money/'
```

That base path matches a GitHub Pages project site for `vanshkumar/tennis-prize-money`.

## Expected URL

With the current repository name and no repo-specific custom domain, the dashboard should be available at:

```text
https://vanshkumar.github.io/tennis-prize-money/
```

Because the account has a user-site custom domain, GitHub Pages may also serve this project site under the custom domain path:

```text
https://vanshkumar.net/tennis-prize-money/
```

If this repository gets its own custom domain later, change `base` to `/` before deploying to that domain root.

## Deploy Workflow

`.github/workflows/deploy.yml` runs on pushes to `main` and by manual `workflow_dispatch`.

The workflow:

1. Checks out the repo.
2. Installs dependencies with `npm ci`.
3. Builds the static app with `npm run build`.
4. Uploads `dist/` with `actions/upload-pages-artifact`.
5. Deploys the artifact with `actions/deploy-pages`.

No committed `dist/` directory or `gh-pages` branch is required.

## Release Checks

Before promoting a commit for review or deployment, run:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

`npm run refresh:data` is also useful before data releases because it validates the static JSON through the server-side refresh path.

## Static Runtime Boundary

GitHub Pages serves static files only. Do not deploy server-side refresh code as part of the Vite bundle, and do not add app-local `/api/refresh` assumptions for Pages.

The static dashboard can safely receive:

- `VITE_REFRESH_DISPATCH_URL`: public external dispatch endpoint URL.
- `VITE_REFRESH_DOCS_URL`: public docs URL.

The static dashboard must not receive:

- `GITHUB_TOKEN`
- `REFRESH_TOKEN`
- signed or secret source URLs
- any other server-side credential

## Optional Serverless Refresh Backend

Browser-triggered refresh is optional. To enable it, deploy `serverless/refresh-dispatch.mjs` to a separate serverless host and configure its server-side environment variables:

- `GITHUB_TOKEN`
- `GITHUB_OWNER`
- `GITHUB_REPO`
- `GITHUB_REF`
- `REFRESH_TOKEN`
- optional `REFRESH_WORKFLOW_ID`
- optional `REFRESH_ALLOWED_ORIGIN`

Then set the static app variable:

```text
VITE_REFRESH_DISPATCH_URL=https://your-refresh-backend.example.com/dispatch
```

The backend dispatches a GitHub Action; it does not refresh data directly in the browser.

## v0.1 Deployment Status

- The app is buildable as a static Vite bundle.
- The standalone Pages deployment workflow exists at `.github/workflows/deploy.yml`.
- GitHub Pages settings still need Source set to `GitHub Actions` if the repository is currently configured for branch publishing.
- No serverless backend is required for the static dashboard.
