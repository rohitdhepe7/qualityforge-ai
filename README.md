# QualityForge AI

**Milestone 1 — working TypeScript + Playwright framework foundation.** An open-source-ready starter for browser and API automation, with a self-hosted purchase-wallet demo. It does **not** yet include AI analysis, Appium, security scanning, WarrantyBox integration or notification tests; those are planned milestones, not shipped features.

## Requirements

- Node.js 20+ (Node.js 22 recommended)
- npm
- Browsers installed by Playwright

## Quick start

```bash
npm install
npx playwright install chromium firefox webkit
cp .env.example .env
npm run typecheck
npm test
npm run report
```

`npm test` automatically starts and stops the local demo app. For a quick smoke check: `npm run test:smoke`. To run only Chrome: `npm run test:chromium`. To run only API checks: `npm run test:api`. To inspect tests interactively: `npm run test:ui`.

### Demo server manually

```bash
npm run demo
# open http://127.0.0.1:4173
```

The demo uses browser `localStorage`. Each default Playwright test has an isolated browser context. This sample is intentionally simple; it is **not** a production backend, authentication system, security target, or clone of WarrantyBox.

## Architecture

```text
playwright.config.ts                Projects, retries, reports, local web server
src/core/config/env.ts              Typed environment settings
src/core/fixtures/test.ts           Reusable test fixtures
src/core/data/purchase-factory.ts   Synthetic test data factory
src/core/assertions/                Domain assertion example
src/core/http/                      Typed API client example
examples/demo-app/server.mjs        Self-contained local demo server
examples/demo-app/index.html        Demo UI
examples/demo-app/pages/           App-specific page object
examples/demo-app/tests/           Browser and API example tests
.github/workflows/tests.yml        GitHub Actions pipeline
```

### Test design principles

- `src/core` holds components intended for reuse across applications; `examples` holds app-specific adapters and tests.
- Prefer `data-testid`, semantic roles, typed page objects and stable assertions. Avoid arbitrary waits.
- Use synthetic data and disposable test accounts. Never upload actual receipts, private keys, tokens or personal data to the repository or external AI services.
- Critical pass/fail decisions should use deterministic assertions; future AI features are advisory unless checked against deterministic ground truth.
- Browser contexts are isolated in UI tests, and the demo data only lives within each browser's storage.

## Reports

- Console list reporter during execution
- `playwright-report/index.html` — HTML report
- `test-results/junit.xml` — JUnit for CI
- `test-results/results.json` — machine-readable results
- Failure-only traces, screenshots and video in `test-results/`

Generated outputs are gitignored. Run `npm run report` after tests to open the HTML report. GitHub Actions uploads report artifacts on success or failure.

## Adapting to WarrantyBox or your app

1. Build a **staging** environment; do not execute destructive tests against real users.
2. Add a product-specific page object under `examples/<app>/pages/` and specs under `examples/<app>/tests/`.
3. Use `data-testid` attributes on interactive controls and stable APIs for test setup/cleanup.
4. For an external app, set `TARGET=external` and `APP_BASE_URL=https://your-staging-app.example`. Note: the sample tests target the demo and **will not** automatically apply to an external app; create your own app-specific tests first.
5. Keep secrets in `.env` locally or GitHub Actions secrets; never commit `.env`.
6. Add authorization, account deletion and storage tests against disposable users only.

See [`docs/architecture.md`](docs/architecture.md), [`docs/testing-strategy.md`](docs/testing-strategy.md) and [`docs/roadmap.md`](docs/roadmap.md).

## Status

Milestone 1 source scaffold. Dependency installation and browser execution are required to confirm results on your machine/CI. See `docs/validation.md` for what was and was not validated in the build environment.

## License

MIT. See [LICENSE](LICENSE).
