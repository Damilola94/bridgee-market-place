export interface Product {
  id: string;
  vendor: string;
  name: string;
  description: string;
  fullDescription?: string;
  price: number;
  seed: string;
}

export type MarketplaceView =
  | "marketplace"
  | "detail"
  | "wishlist";