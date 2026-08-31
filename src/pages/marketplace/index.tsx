"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { PRODUCTS } from "../../data/marketplace";
import { Product } from "../../types/marketplace";

import { MarketplaceLayout } from "../../components/pages/marketplace/MarketplaceLayout";
import { ProductGrid } from "../../components/pages/marketplace/ProductGrid";

export default function MarketplacePage() {
  const router = useRouter();

  const [wishlist, setWishlist] = useState<string[]>([
    "headphones",
    "speaker",
    "mouse",
  ]);

  const toggleWishlist = (id: string) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const openProduct = (product: Product) => {
    router.push(`/marketplace/${product.id}`);
  };

  return (
    <MarketplaceLayout wishlistCount={wishlist.length}>
      <div className="px-6 py-6 md:px-10">
        <p className="text-sm text-neutral-500">
          Hello{" "}
          <span className="font-semibold text-neutral-800">
            Toluwalase
          </span>
        </p>

        <div className="mt-6">
          <ProductGrid
            products={PRODUCTS}
            wishlist={wishlist}
            onOpen={openProduct}
            onToggleWishlist={toggleWishlist}
          />
        </div>
      </div>
    </MarketplaceLayout>
  );
}