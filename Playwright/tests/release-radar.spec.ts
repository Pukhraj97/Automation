import { expect, test } from '@playwright/test';

test.describe('Release Radar quality signals', () => {
  test('displays the release dashboard and marks ready releases as ready to ship', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Release Radar | Quality signal');
    await expect(page.getByRole('heading', { name: /Ship with a signal/ })).toBeVisible();
    await expect(page.locator('[data-testid="release-card"]')).toHaveCount(3);
    await expect(page.locator('.status.ready').first()).toHaveText('Ready to ship');
  });

  test('filters the release list to one release when Needs attention is selected', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('tab', { name: 'Needs attention' }).click();
    await expect(page.locator('[data-testid="release-card"]')).toHaveCount(1);
    await expect(page.locator('[data-testid="release-card"] h2')).toHaveText('Identity 2026.09.17');
    await expect(page.getByRole('tab', { name: 'Needs attention' })).toHaveAttribute('aria-selected', 'true');
  });

  test('opens release details when View details is selected', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'View Checkout 2026.09.18 details' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('dialog')).toContainText('Checkout 2026.09.18');
    await expect(page.getByRole('dialog')).toContainText('128 passed');
    await page.getByRole('button', { name: 'Close release details' }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('returns healthy status and complete quality fields for ready releases', async ({ request }) => {
    await expect((await request.get('/health')).json()).resolves.toEqual({ status: 'ok' });
    const response = await request.get('/api/releases?status=ready');
    expect(response.ok()).toBeTruthy();
    const payload = await response.json();
    expect(payload.meta.total).toBe(2);
    expect(payload.data[0]).toEqual(expect.objectContaining({ id: expect.any(String), status: 'ready' }));
    expect(payload.data[0].checks).toEqual(expect.objectContaining({
      ui: expect.any(Number),
      api: expect.any(Number),
      data: expect.any(Number),
      events: expect.any(Number),
      errorRate: expect.any(Number),
    }));
  });

  test('returns valid status, event coverage, and error-rate values for every release', async ({ request }) => {
    const response = await request.get('/api/releases');
    const payload = await response.json();
    expect(payload.data).toHaveLength(3);
    for (const release of payload.data) {
      expect(release).toEqual(expect.objectContaining({ id: expect.any(String), name: expect.any(String), owner: expect.any(String) }));
      expect(release.status).toMatch(/^(ready|attention)$/);
      expect(release.checks.events).toBeGreaterThanOrEqual(0);
      expect(release.checks.events).toBeLessThanOrEqual(100);
      expect(release.checks.errorRate).toBeGreaterThanOrEqual(0);
    }
  });

  test('returns 404 and an error message when the release does not exist', async ({ request }) => {
    const response = await request.get('/api/releases/missing-release');
    expect(response.status()).toBe(404);
    await expect(response.json()).resolves.toEqual({ error: 'Release not found' });
  });
});