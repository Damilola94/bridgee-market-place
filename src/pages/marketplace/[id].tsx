"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getProductById } from "../../data/marketplace";
import { MarketplaceLayout } from "../../components/pages/marketplace/MarketplaceLayout";
import { ProductDetails } from "../../components/pages/marketplace/ProductDetails";

export default function ProductPage() {
  const router = useRouter();

  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("marketplace-wishlist");

      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch {
      setWishlist([]);
    }
  }, []);

  const id = router.query.id;

  if (!router.isReady) {
    return (
      <MarketplaceLayout wishlistCount={wishlist.length}>
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="text-sm text-neutral-500">
            Loading product...
          </div>
        </div>
      </MarketplaceLayout>
    );
  }

  const product = getProductById(id as string);

  if (!product) {
    return (
      <MarketplaceLayout wishlistCount={wishlist.length}>
        <div className="flex min-h-[500px] flex-col items-center justify-center">
          <h2 className="text-xl font-bold text-neutral-900">
            Product not found
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            The product you're looking for doesn't exist.
          </p>

          <button
            type="button"
            onClick={() => router.push("/marketplace")}
            className="mt-5 rounded-lg bg-pink-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-pink-900"
          >
            Back to Marketplace
          </button>
        </div>
      </MarketplaceLayout>
    );
  }

  const toggleWishlist = () => {
    setWishlist((current) => {
      const next = current.includes(product.id)
        ? current.filter((wishlistId) => wishlistId !== product.id)
        : [...current, product.id];

      localStorage.setItem(
        "marketplace-wishlist",
        JSON.stringify(next)
      );

      return next;
    });
  };

  return (
    <MarketplaceLayout wishlistCount={wishlist.length}>
      <ProductDetails
        product={product}
        isWishlisted={wishlist.includes(product.id)}
        onToggleWishlist={toggleWishlist}
      />
    </MarketplaceLayout>
  );
}