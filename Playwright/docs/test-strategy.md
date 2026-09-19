# Test strategy

## Risk model

Release decisions fail when teams verify only the screen. Release Radar models five signals:

1. **UI behavior**: the dashboard renders meaningful release states and filters correctly.
2. **API contract**: response shape, filtering, and not-found behavior remain predictable.
3. **Data quality**: the release record carries UI, API, data, and event check counts.
4. **Observability**: the error-rate signal is visible beside functional checks.
5. **Delivery feedback**: CI captures evidence when a check fails.

## Test design choices

- Prefer accessible roles and visible names for user workflows.
- Keep fixture data deterministic so failures identify a regression rather than an external outage.
- Use API checks for fast contract feedback and UI checks for integrated behavior.
- Keep the server dependency-free; the test boundary is easy to replace with a real service later.
- Validate fixture data, API contracts, persistence constraints, and container health configuration inside the Playwright suite so one runner reports the complete quality gate.

## Production evolution

The fixture service can be replaced by a service adapter that reads release metadata from a deployment API, consumes Kafka tracking events, queries PostgreSQL or Snowflake for persistence assertions, and adds Datadog error-rate thresholds. The test contract should stay stable while those integrations evolve behind the adapter.