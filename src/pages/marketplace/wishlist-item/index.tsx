"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  PRODUCTS,
} from "../../../data/marketplace";

import { MarketplaceLayout } from "../../../components/pages/marketplace/MarketplaceLayout";
import { WishlistItem } from "../../../components/pages/marketplace/WishlistItem";

export default function WishlistPage() {
  const router = useRouter();

  const [wishlist, setWishlist] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("marketplace-wishlist") || "[]",
      );

      setWishlist(saved);
    } catch {
      setWishlist([]);
    }

    setMounted(true);
  }, []);

  const wishlistProducts = PRODUCTS.filter((product) =>
    wishlist.includes(product.id),
  );

  const removeFromWishlist = (id: string) => {
    setWishlist((current) => {
      const next = current.filter((item) => item !== id);

      localStorage.setItem(
        "marketplace-wishlist",
        JSON.stringify(next),
      );

      return next;
    });
  };

  const buyProduct = (id: string) => {
    localStorage.setItem(
      "marketplace-cart",
      JSON.stringify([
        {
          productId: id,
          quantity: 1,
        },
      ]),
    );

    router.push("/marketplace/payment");
  };

  if (!mounted) {
    return (
      <MarketplaceLayout wishlistCount={0}>
        <div className="flex min-h-[500px] items-center justify-center">
          <p className="text-sm text-neutral-500">
            Loading wishlist...
          </p>
        </div>
      </MarketplaceLayout>
    );
  }

  return (
    <MarketplaceLayout wishlistCount={wishlist.length}>
      <div className="px-6 py-8 md:px-10">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-800" />

            <h1 className="text-2xl font-bold text-neutral-900">
              My Wishlist
            </h1>
          </div>

          <p className="mt-1 text-sm text-neutral-500">
            Products you have saved for later.
          </p>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 bg-white">
            <Heart className="h-10 w-10 text-neutral-300" />

            <h2 className="mt-4 text-lg font-bold text-neutral-900">
              Your wishlist is empty
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              Save products you would like to purchase later.
            </p>

            <button
              type="button"
              onClick={() => router.push("/marketplace")}
              className="mt-5 rounded-lg bg-pink-800 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Explore Marketplace
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {wishlistProducts.map((product) => (
              <WishlistItem
                key={product.id}
                product={product}
                onRemove={removeFromWishlist}
                onView={(id) =>
                  router.push(`/marketplace/${id}`)
                }
                onBuy={buyProduct}
              />
            ))}
          </div>
        )}
      </div>
    </MarketplaceLayout>
  );
}