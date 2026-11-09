# Validation log

This repository was generated in an environment without access to the npm registry. The Node.js demo server, its health endpoint, static content and JavaScript syntax can be checked independently. A Playwright/TypeScript run is **not** claimed until dependencies are installed and `npm run typecheck && npm test` passes locally or via GitHub Actions.

## Reproduce

```bash
npm install
npx playwright install chromium firefox webkit
npm run typecheck
npm test
```

For the local server alone: `npm run demo`, then `curl http://127.0.0.1:4173/api/health`. Expected JSON: `{"status":"ok","service":"qualityforge-demo"}`.

Verified in build environment: `node --check` for demo server and browser script; HTTP 200 and expected JSON from `/api/health`; HTML served at `/`. Full Playwright suite not executed (npm registry unavailable).
