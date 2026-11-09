import { test, expect } from '../../../src/core/fixtures/test.js';
import { makePurchase } from '../../../src/core/data/purchase-factory.js';
import { expectPurchaseVisible } from '../../../src/core/assertions/purchase-assertions.js';

test.beforeEach(async ({ wallet }) => { await wallet.goto(); });

test('@smoke loads an empty wallet', async ({ wallet }) => {
  await expect(wallet.title).toBeVisible();
  await expect(wallet.emptyState).toBeVisible();
  await expect(wallet.count).toHaveText('0 purchases');
});

test('@smoke creates and displays a purchase', async ({ wallet }) => {
  const purchase = makePurchase();
  await wallet.add(purchase);
  await expectPurchaseVisible(wallet.card(purchase.name), purchase);
  await expect(wallet.count).toHaveText('1 purchase');
});

test('search filters purchases', async ({ wallet }) => {
  const laptop = makePurchase({ name: 'Laptop Alpha' });
  const phone = makePurchase({ name: 'Phone Beta' });
  await wallet.add(laptop);
  await wallet.add(phone);
  await wallet.search.fill('Laptop');
  await expect(wallet.card(laptop.name)).toBeVisible();
  await expect(wallet.card(phone.name)).toHaveCount(0);
});

test('rejects invalid prices and does not create a purchase', async ({ wallet, page }) => {
  const purchase = makePurchase({ price: '-1' });
  await wallet.add(purchase);
  await expect(page.getByTestId('form-error')).toContainText('Price must be greater than zero');
  await expect(wallet.count).toHaveText('0 purchases');
});

test('purchase persists after a page reload', async ({ wallet, page }) => {
  const purchase = makePurchase();
  await wallet.add(purchase);
  await page.reload();
  await expect(wallet.card(purchase.name)).toBeVisible();
});
