import type { APIRequestContext } from '@playwright/test';

export class HealthClient {
  constructor(private readonly request: APIRequestContext) {}
  async get() {
    return this.request.get('/api/health');
  }
}
