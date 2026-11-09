import { test as base, expect } from '@playwright/test';
import type { APIRequestContext } from '@playwright/test';
import { PurchaseWalletPage } from '../../../examples/demo-app/pages/purchase-wallet.page.js';
import { HealthClient } from '../http/health-client.js';

interface Fixtures {
  wallet: PurchaseWalletPage;
  health: HealthClient;
}

export const test = base.extend<Fixtures>({
  wallet: async ({ page }, use) => {
    await use(new PurchaseWalletPage(page));
  },
  health: async ({ request }, use) => {
    await use(new HealthClient(request));
  },
});
export { expect };
export type { APIRequestContext };
