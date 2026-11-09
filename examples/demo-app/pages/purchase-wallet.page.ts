import type { Page } from '@playwright/test';
import type { PurchaseInput } from '../../../src/core/data/purchase-factory.js';

/** App-specific page adapter; replace this for another product. */
export class PurchaseWalletPage {
  constructor(private readonly page: Page) {}
  async goto() { await this.page.goto('/'); }
  get title() { return this.page.getByRole('heading', { name: 'Demo Purchase Wallet' }); }
  get count() { return this.page.getByTestId('purchase-count'); }
  get emptyState() { return this.page.getByTestId('empty-state'); }
  get search() { return this.page.getByTestId('purchase-search'); }
  card(name: string) { return this.page.getByTestId('purchase-card').filter({ hasText: name }); }
  async add(purchase: PurchaseInput) {
    await this.page.getByTestId('purchase-name').fill(purchase.name);
    await this.page.getByTestId('purchase-brand').fill(purchase.brand);
    await this.page.getByTestId('purchase-price').fill(purchase.price);
    await this.page.getByTestId('purchase-date').fill(purchase.purchaseDate);
    await this.page.getByTestId('save-purchase').click();
  }
}
