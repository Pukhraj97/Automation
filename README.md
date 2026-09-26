# 🚀 Enterprise Test Automation Framework
> **Author:** Pukhraj Grewal (Senior SDET)
> **Core Stack:** TypeScript, Playwright, Appium, Cypress, Postman, PostgreSQL, Kafka, GitHub Actions

This repository serves as a comprehensive, enterprise-level test automation framework designed to demonstrate the strict separation of concerns between UI/E2E automation and backend API/database state validation. It enforces test isolation, avoiding anti-patterns by keeping local states clean and locators encapsulated within Page Objects.

## 🏗️ Architecture & Scope
The framework is structured into three primary domains to prevent flaky tests and ensure high execution speeds:

### 1. 🌐 Web E2E & Component Automation (Playwright & Cypress)
- **Playwright:** Parallel execution, network interception, and auto-waiting for complex Web workflows.
- **Cypress:** Component testing and isolated frontend validation preventing domino-effect test failures.
- **State Management:** Bypasses UI logins for repetitive tests by injecting authentication states programmatically via API.

### 2. 📱 Mobile E2E Automation (Appium / WebDriverIO)
- Cross-platform test execution for Android and iOS native applications.
- **Pattern:** Page Object Model (POM) to separate business logic from locators, reducing maintenance overhead.

### 3. ⚙️ API, Data & Observability (Postman, PostgreSQL, Kafka, JMeter)
- **GraphQL & REST API:** Schema validation, OAuth 2.0 authentication, and nested JSON response parsing.
- **Database Validation:** Direct SQL queries to PostgreSQL and Snowflake to verify accurate data persistence after UI actions.
- **Event Streaming:** Validates Kafka event tracking and segment firing via network payload analysis.
- **Performance:** Apache JMeter test plans for load testing and concurrency evaluation.

## 📂 Repository Structure
```text
├── .github/workflows/      # CI/CD pipelines (GitHub Actions YAML files)
├── api-tests/              # Postman Collections, GraphQL queries, Schema assertions
├── mobile-tests/           # Appium & WebDriverIO scripts
├── web-tests-playwright/   # Playwright E2E and Page Objects
├── web-tests-cypress/      # Cypress Web UI tests
├── performance-testing/    # JMeter .jmx test plans
├── utils/                  # DB connection helpers, Kafka consumers, Test Data generation
└── README.md               # Framework documentation
```

## 🔄 CI/CD Pipeline Integration (GitHub Actions)
Tests are fully integrated into GitHub Actions, running automatically on pull requests and pushes to the `main` branch.
- **Triggers:** `on: push` and `on: pull_request`
- **Artifacts:** Uploads HTML reports, trace viewers, and failure screenshots for debugging.
- **Containers:** Executes Playwright tests inside `ubuntu-latest` using official Docker images for consistent environments.

## 🚀 Setup & Execution

### Prerequisites
- Node.js (v18+)
- Java JDK 11+ (for Appium & JMeter)
- Docker (optional, for local PostgreSQL/Kafka mocking)

### Installation
Clone the repository and install dependencies:
```bash
git clone [https://github.com/Pukhraj97/Automation.git](https://github.com/Pukhraj97/Automation.git)
cd Automation
npm ci
npx playwright install --with-deps  # Installs Playwright browsers
```

### Running the Tests
```bash
# Run API validation
npm run test:api

# Run Playwright Web E2E tests with UI runner
npx playwright test --ui

# Run Appium Mobile tests
npm run test:mobile

# Run Cypress Tests in Headless mode
npx cypress run
```
