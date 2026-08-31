"use client";

import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { Product } from "../../../types/marketplace";
import { formatNaira } from "../../../data/marketplace";

interface WishlistItemProps {
  product: Product;
  onRemove: (id: string) => void;
  onView: (id: string) => void;
  onBuy: (id: string) => void;
}

export function WishlistItem({
  product,
  onRemove,
  onView,
  onBuy,
}: WishlistItemProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-black/5 bg-white">
      <button
        type="button"
        onClick={() => onView(product.id)}
        className="relative block h-52 w-full bg-neutral-100"
      >
        <Image
          src={`https://picsum.photos/seed/${product.seed}/600/450`}
          alt={product.name}
          fill
          className="object-cover"
        />
      </button>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs text-neutral-400">
              {product.vendor}
            </p>

            <button
              type="button"
              onClick={() => onView(product.id)}
              className="mt-1 text-left text-sm font-bold text-neutral-900"
            >
              {product.name}
            </button>
          </div>

          <button
            type="button"
            onClick={() => onRemove(product.id)}
            className="text-pink-800"
            aria-label="Remove from wishlist"
          >
            <Heart className="h-5 w-5 fill-current" />
          </button>
        </div>

        <p className="mt-3 text-base font-bold text-pink-800">
          {formatNaira(product.price)}
        </p>

        <button
          type="button"
          onClick={() => onBuy(product.id)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-pink-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-pink-900"
        >
          <ShoppingCart className="h-4 w-4" />
          Buy Now
        </button>
      </div>
    </div>
  );
}