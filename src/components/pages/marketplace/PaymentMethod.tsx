"use client";

import Image from "next/image";
import {
  ArrowLeft,
  ChevronRight,
  Heart,
  Minus,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Product } from "../../../types/marketplace";
import { formatNaira } from "../../../data/marketplace";
import Headphone from "../../../assets/images/headphone.png";

interface ProductDetailsProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
}

export function ProductDetails({
  product,
  isWishlisted,
  onToggleWishlist,
}: ProductDetailsProps) {
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);

  const handleBuyNow = () => {
    localStorage.setItem(
      "marketplace-cart",
      JSON.stringify([
        {
          productId: product.id,
          quantity,
        },
      ]),
    );

    router.push("/marketplace/payment");
  };

  return (
    <div className="bg-[#F7F8FA] px-6 py-8 md:px-10">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm">
        <button
          type="button"
          onClick={() => router.push("/marketplace")}
          className="font-medium text-neutral-500 transition-colors hover:text-pink-800"
        >
          Marketplace
        </button>

        <ChevronRight className="h-4 w-4 text-neutral-400" />

        <span className="font-medium text-neutral-500">
          {product.vendor}
        </span>

        <ChevronRight className="h-4 w-4 text-neutral-400" />

        <span className="font-semibold text-pink-800">
          {product.name}
        </span>
      </div>

      {/* Product Card */}
      <div className="rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] md:p-6">
        <div className="grid items-center gap-7 lg:grid-cols-[1.05fr_1fr]">
          {/* Product Image */}
          <div className="relative aspect-[16/8.5] w-full overflow-hidden rounded-xl bg-neutral-100">
            <Image
              src={Headphone}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Product Information */}
          <div className="flex flex-col">
            {/* Vendor */}
            <button
              type="button"
              className="mb-4 flex w-fit items-center gap-1.5 text-sm font-medium text-pink-700"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-md border border-pink-200 text-[10px]">
                ▣
              </span>

              {product.vendor}

              <ChevronRight className="h-3.5 w-3.5" />
            </button>

            {/* Product Name */}
            <h1 className="text-2xl font-bold leading-tight text-neutral-900 md:text-[22px]">
              {product.name}
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-2xl text-xs leading-6 text-neutral-500 md:text-[13px]">
              {product.fullDescription || product.description}
            </p>

            {/* Price */}
            <p className="mt-5 text-xl font-bold text-pink-800 md:text-2xl">
              {formatNaira(product.price)}
            </p>

            {/* Actions */}
            <div className="mt-5 flex items-center gap-3">
              {/* Buy Now */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="rounded-md bg-pink-800 px-8 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-pink-900"
              >
                Buy Now
              </button>

              {/* Quantity */}
              <div className="flex h-10 items-center overflow-hidden rounded-md border border-neutral-300 bg-white">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                  className="flex h-full w-9 items-center justify-center text-neutral-600 transition-colors hover:bg-neutral-50"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>

                <span className="flex h-full w-9 items-center justify-center border-x border-neutral-300 text-xs font-medium text-neutral-800">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) => current + 1)
                  }
                  className="flex h-full w-9 items-center justify-center text-neutral-600 transition-colors hover:bg-neutral-50"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Wishlist */}
              <button
                type="button"
                onClick={onToggleWishlist}
                aria-label={
                  isWishlisted
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
                className={`flex h-10 w-10 items-center justify-center rounded-md border transition-colors ${
                  isWishlisted
                    ? "border-pink-800 bg-pink-50 text-pink-800"
                    : "border-neutral-300 text-neutral-600 hover:border-pink-800 hover:text-pink-800"
                }`}
              >
                <Heart
                  className={`h-4 w-4 ${
                    isWishlisted ? "fill-current" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}