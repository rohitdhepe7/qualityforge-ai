import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import { env } from './src/core/config/env.js';

dotenv.config();
const settings = env();

export default defineConfig({
  testDir: './examples',
  testMatch: /.*\.spec\.ts/,
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 30_000,
  expect: { timeout: 7_000 },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  use: {
    baseURL: settings.baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] }, testIgnore: /.*\.api\.spec\.ts/ },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] }, testIgnore: /.*\.api\.spec\.ts/ },
    { name: 'webkit', use: { ...devices['Desktop Safari'] }, testIgnore: /.*\.api\.spec\.ts/ },
    { name: 'api', testMatch: /.*\.api\.spec\.ts/ },
  ],
  webServer: settings.target === 'demo'
    ? { command: 'npm run demo', url: `${settings.baseURL}/api/health`, reuseExistingServer: !process.env.CI, timeout: 15_000, env: { DEMO_PORT: String(settings.demoPort) } }
    : undefined,
});
