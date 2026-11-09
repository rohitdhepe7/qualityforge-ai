# Testing strategy — Milestone 1

| Layer | Scope | Shipped examples |
| --- | --- | --- |
| UI smoke | Render and create a purchase | `purchases.spec.ts` |
| UI regression | Search, validation and reload persistence | `purchases.spec.ts` |
| API contract | `/api/health` response and JSON fields | `health.api.spec.ts` |
| Reliability | Failed uploads, retries, concurrency | Planned |
| Security | RLS, file authorization, deletion | Planned, staging only |
| AI validation | Ground-truth receipt fixtures | Planned |
| Mobile/PWA | Appium + real-device push | Planned |

**Execution:** UI tests run in Chromium, Firefox and WebKit. API specs run once in the API project. Tests run in parallel and retry twice on CI only. Failure traces, screenshots and video are collected by Playwright.

**Gating proposal:** Milestone 1 health and smoke tests block merges. Future sensitive features (authorization, deletion and idempotency) must use deterministic assertions and must not be bypassed by AI test recommendations.

**No production data:** Use generated customer-free fixtures and short-lived staging users. Reports can contain screenshots and traces, so restrict access to CI artifacts and scrub sensitive values before sharing.
