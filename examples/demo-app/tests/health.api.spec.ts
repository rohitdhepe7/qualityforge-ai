import { test, expect } from '../../../src/core/fixtures/test.js';

test('@smoke health API responds with a valid contract', async ({ health }) => {
  const response = await health.get();
  expect(response.ok()).toBeTruthy();
  expect(response.headers()['content-type']).toContain('application/json');
  expect(await response.json()).toEqual({ status: 'ok', service: 'qualityforge-demo' });
});
