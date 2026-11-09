export interface PurchaseInput {
  name: string;
  brand: string;
  purchaseDate: string;
  price: string;
}

/** Synthetic test data only: never copy customer records into a public repo. */
export function makePurchase(overrides: Partial<PurchaseInput> = {}): PurchaseInput {
  return {
    name: `Demo Headphones ${crypto.randomUUID().slice(0, 8)}`,
    brand: 'QualityForge Labs',
    purchaseDate: '2026-10-15',
    price: '2499',
    ...overrides,
  };
}
