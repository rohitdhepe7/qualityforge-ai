import { expect, type Locator } from '@playwright/test';
import type { PurchaseInput } from '../data/purchase-factory.js';

export async function expectPurchaseVisible(card: Locator, purchase: PurchaseInput): Promise<void> {
  await expect(card).toContainText(purchase.name);
  await expect(card).toContainText(purchase.brand);
  await expect(card).toContainText(purchase.price);
}
