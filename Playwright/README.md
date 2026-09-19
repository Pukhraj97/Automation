# Release Radar

> A compact quality-engineering portfolio project for release confidence.

Release Radar brings the signals a modern QA team checks before production into one decision surface: UI regression, API contracts, persisted-data assertions, event tracking, and application health. It is deliberately self-contained so a reviewer can clone it and run the checks without credentials or a third-party service.

This is a **quality-engineering showcase**, not a claim that the demo is a production release platform. The local fixture adapter is documented with the PostgreSQL, Kafka, and Datadog boundaries that would be used in a real service.

## Why this project

This project is a focused **Playwright and API quality-engineering showcase**. It demonstrates test design across layers, stable selectors, API assertions, accessible interaction states, deterministic fixtures, and CI-ready execution. It does not claim to implement every technology in the author's CV in one repository; production integrations are described separately where relevant.

## Stack

- TypeScript configuration with Playwright Test
- Node.js HTTP fixture service with no runtime dependency
- PostgreSQL schema and Docker packaging for a production-shaped extension point
- OpenAPI contract and executable fixture-data validation
- UI and API coverage in one test suite
- GitHub Actions for repeatable Chromium checks
- HTML report, trace-on-retry, and failure screenshots

## Run it

```bash
npm install
npx playwright install chromium
npm run quality
```

To open the dashboard locally:

```bash
npm start
# http://127.0.0.1:4173
```

## What is covered

| Layer | Example check |
| --- | --- |
| UI smoke | Dashboard loads, title and release gate are visible |
| UI behavior | Status tabs filter the API-backed release list |
| API contract | Response envelope, data types, and status filtering |
| Error path | Unknown release returns a useful `404` payload |
| CI feedback | Retries, traces, screenshots, and an HTML report |

All quality checks run through Playwright, including API health and contract checks, fixture invariants, OpenAPI structure, PostgreSQL constraints, Docker health configuration, and desktop/mobile UI coverage.

The test strategy and suggested next steps are in [`docs/test-strategy.md`](docs/test-strategy.md).
The system boundary is in [`docs/architecture.md`](docs/architecture.md), with the API contract in [`contracts/releases.openapi.yaml`](contracts/releases.openapi.yaml).

## Portfolio talking points

- Why stable `data-testid` hooks are used only for repeated domain cards, while user-facing controls use accessible roles and names.
- Why API checks sit beside UI checks: a green page can still hide a broken contract.
- How the same release model could be extended with Kafka events, Snowflake assertions, and Datadog metrics in a production integration.
- How this suite can become a PR release gate without coupling tests to a developer laptop.
- How fixture validation and PostgreSQL constraints protect the data contract before release decisions are made.

## Run with Docker

```bash
docker compose up --build
# http://127.0.0.1:4173
```

## Author

Built by **Pukhraj Singh Grewal**, Software Development Engineer in Test based in Berlin. Focus areas: Playwright, Cypress, Appium, WebdriverIO, API testing, SQL, Kafka, Datadog, and CI/CD.