"use client";

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  getProductById,
} from "../../../data/marketplace";

import { MarketplaceLayout } from "../../../components/pages/marketplace/MarketplaceLayout";
import { OrderSummary } from "../../../components/pages/marketplace/OrderSummary";

interface CartItem {
  productId: string;
  quantity: number;
}

export default function OrderSummaryPage() {
  const router = useRouter();

  const [items, setItems] = useState<
    {
      product: NonNullable<
        ReturnType<typeof getProductById>
      >;
      quantity: number;
    }[]
  >([]);

  useEffect(() => {
    try {
      const cart: CartItem[] = JSON.parse(
        localStorage.getItem("marketplace-cart") || "[]",
      );

      const mapped = cart
        .map((item) => {
          const product = getProductById(item.productId);

          if (!product) return null;

          return {
            product,
            quantity: item.quantity,
          };
        })
        .filter(Boolean) as typeof items;

      setItems(mapped);
    } catch {
      setItems([]);
    }
  }, []);

  return (
    <MarketplaceLayout wishlistCount={0}>
      <div className="mx-auto max-w-3xl px-6 py-8 md:px-10">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-pink-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <h1 className="text-2xl font-bold text-neutral-900">
          Review Your Order
        </h1>

        <p className="mt-1 text-sm text-neutral-500">
          Confirm your order details before proceeding.
        </p>

        <div className="mt-8">
          {items.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center">
              <p className="text-sm text-neutral-500">
                Your order is empty.
              </p>

              <button
                type="button"
                onClick={() => router.push("/marketplace")}
                className="mt-5 rounded-lg bg-pink-800 px-5 py-2.5 text-sm font-semibold text-white"
              >
                Go to Marketplace
              </button>
            </div>
          ) : (
            <OrderSummary
              items={items}
              deliveryFee={0}
              onContinue={() =>
                router.push("/marketplace/payment")
              }
            />
          )}
        </div>
      </div>
    </MarketplaceLayout>
  );
}