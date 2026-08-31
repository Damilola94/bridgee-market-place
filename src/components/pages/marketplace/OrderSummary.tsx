"use client";

import Image from "next/image";
import { Product } from "../../../types/marketplace";
import { formatNaira } from "../../../data/marketplace";

interface OrderItem {
  product: Product;
  quantity: number;
}

interface OrderSummaryProps {
  items: OrderItem[];
  deliveryFee?: number;
  onContinue?: () => void;
}

export function OrderSummary({
  items,
  deliveryFee = 0,
  onContinue,
}: OrderSummaryProps) {
  const subtotal = items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0,
  );

  const total = subtotal + deliveryFee;

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6">
      <h2 className="text-lg font-bold text-neutral-900">
        Order Summary
      </h2>

      <div className="mt-6 space-y-5">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex gap-4"
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
              <Image
                src={`https://picsum.photos/seed/${item.product.seed}/150/150`}
                alt={item.product.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-sm font-semibold text-neutral-900">
                {item.product.name}
              </p>

              <p className="mt-1 text-xs text-neutral-400">
                Qty: {item.quantity}
              </p>
            </div>

            <p className="text-sm font-semibold text-neutral-900">
              {formatNaira(
                item.product.price * item.quantity,
              )}
            </p>
          </div>
        ))}
      </div>

      <div className="my-6 h-px bg-black/5" />

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-neutral-500">
            Subtotal
          </span>

          <span className="font-medium text-neutral-900">
            {formatNaira(subtotal)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-neutral-500">
            Delivery
          </span>

          <span className="font-medium text-neutral-900">
            {deliveryFee === 0
              ? "Free"
              : formatNaira(deliveryFee)}
          </span>
        </div>
      </div>

      <div className="my-5 h-px bg-black/5" />

      <div className="flex items-center justify-between">
        <span className="text-base font-bold text-neutral-900">
          Total
        </span>

        <span className="text-xl font-bold text-pink-800">
          {formatNaira(total)}
        </span>
      </div>

      {onContinue && (
        <button
          type="button"
          onClick={onContinue}
          className="mt-6 w-full rounded-xl bg-pink-800 py-3.5 text-sm font-semibold text-white hover:bg-pink-900"
        >
          Continue to Payment
        </button>
      )}
    </div>
  );
}