import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';

const root = path.join(__dirname, '..');
const read = (file: string) => fs.readFileSync(path.join(root, file), 'utf8');

test.describe('Portfolio engineering assets', () => {
  test('rejects duplicate fixtures and validates every release quality-gate record', () => {
    const releases = JSON.parse(read('fixtures/releases.json'));
    const ids = new Set<string>();
    expect(releases).toHaveLength(3);
    for (const release of releases) {
      expect(ids.has(release.id)).toBeFalsy();
      ids.add(release.id);
      expect(release.status).toMatch(/^(ready|attention)$/);
      expect(release.checks).toEqual(expect.objectContaining({
        ui: expect.any(Number), api: expect.any(Number), data: expect.any(Number),
        events: expect.any(Number), errorRate: expect.any(Number),
      }));
      expect(release.checks.events).toBeBetween(0, 100);
      expect(release.checks.errorRate).toBeGreaterThanOrEqual(0);
    }
  });

  test('documents the implemented release endpoints and required API response fields', () => {
    const contract = parse(read('contracts/releases.openapi.yaml'));
    expect(contract.openapi).toBe('3.0.3');
    expect(contract.paths['/api/releases'].get.responses['200']).toBeTruthy();
    expect(contract.paths['/api/releases/{releaseId}'].get.responses['404']).toBeTruthy();
    expect(contract.components.schemas.Release.required).toEqual(expect.arrayContaining(['id', 'status', 'checks']));
    expect(contract.components.schemas.Release.properties.checks.required).toEqual(expect.arrayContaining(['ui', 'api', 'data', 'events', 'errorRate']));
  });

  test('documents database integrity rules and the container health-check endpoint', () => {
    const schema = read('db/schema.sql');
    expect(schema).toContain("CHECK (status IN ('ready', 'attention'))");
    expect(schema).toContain('REFERENCES releases(id) ON DELETE CASCADE');
    expect(schema).toContain('event_coverage NUMERIC(5, 2)');

    const compose = parse(read('docker-compose.yml'));
    expect(compose.services['release-radar'].healthcheck.test.join(' ')).toContain('/health');
    expect(compose.services['release-radar'].ports).toContain('4173:4173');
  });
});

expect.extend({
  toBeBetween(value: number, minimum: number, maximum: number) {
    const pass = value >= minimum && value <= maximum;
    return {
      pass,
      message: () => `expected ${value} to be between ${minimum} and ${maximum}`,
    };
  },
});