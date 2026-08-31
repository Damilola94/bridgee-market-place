"use client";

import {
  Bell,
  ChevronDown,
  Heart,
  ShoppingCart,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface MarketplaceTopBarProps {
  wishlistCount: number;
}

export function MarketplaceTopBar({
  wishlistCount,
}: MarketplaceTopBarProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between border-b border-black/5 bg-white px-6 py-4 md:px-10">
      <h1 className="text-base font-bold text-neutral-900">
        Marketplace
      </h1>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => router.push("/marketplace/wishlist")}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-neutral-500 hover:bg-neutral-50"
        >
          <Heart className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => router.push("/marketplace/wishlist")}
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-neutral-500 hover:bg-neutral-50"
        >
          <ShoppingCart className="h-4 w-4" />

          {wishlistCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-800 text-[10px] font-bold text-white">
              {wishlistCount}
            </span>
          )}
        </button>

        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-neutral-500"
        >
          <Bell className="h-4 w-4" />

          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
        </button>

        <div className="hidden items-center gap-2 pl-2 sm:flex">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-pink-200 text-pink-800">
            <span className="text-xs font-bold">T</span>
          </div>

          <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-800">
            Verified Buyer
          </span>

          <ChevronDown className="h-4 w-4 text-neutral-400" />
        </div>
      </div>
    </div>
  );
}