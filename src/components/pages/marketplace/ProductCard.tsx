"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import { Product } from "../../../types/marketplace";
import { formatNaira } from "../../../data/marketplace";
import Headphone from "../../../assets/images/headphone.png"

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onOpen: (product: Product) => void;
  onToggleWishlist: (id: string) => void;
}

export function ProductCard({
  product,
  isWishlisted,
  onOpen,
  onToggleWishlist,
}: ProductCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-black/5 bg-white transition-shadow hover:shadow-md">
      <button
        type="button"
        onClick={() => onOpen(product)}
        className="block w-full text-left"
      >
        <div className="relative h-52 w-full bg-neutral-100">
          <Image
            src={Headphone}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      </button>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs text-neutral-400">
            {product.vendor}
          </p>

          <button
            type="button"
            onClick={() => onToggleWishlist(product.id)}
            className="shrink-0"
            aria-label="Toggle wishlist"
          >
            <Heart
              className={`h-4 w-4 ${
                isWishlisted
                  ? "fill-pink-800 text-pink-800"
                  : "text-neutral-300"
              }`}
            />
          </button>
        </div>

        <button
          type="button"
          onClick={() => onOpen(product)}
          className="text-left"
        >
          <h3 className="mt-1 line-clamp-2 text-sm font-bold text-neutral-900">
            {product.name}
          </h3>
        </button>

        <p className="mt-1.5 line-clamp-2 text-xs text-neutral-500">
          {product.description}
        </p>

        <p className="mt-3 text-base font-bold text-pink-800">
          {formatNaira(product.price)}
        </p>
      </div>
    </div>
  );
}