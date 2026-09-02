"use client";

import { useEffect, useState } from "react";
import { Check, Copy, X } from "lucide-react";
import { MarketplaceLayout } from "../../../components/pages/marketplace/MarketplaceLayout";
import Headphone from "../../../assets/images/headphone.png";
import Image from "next/image";
import { randomUUID } from "crypto";

const products = [
  {
    name: "Wireless Noise-Cancelling Headphones",
    seller: "TeeGadgets",
    price: "₦120,000.00",
    priceValue: 120000,
    image: "/headphones.png",
  },
  {
    name: "Bluetooth Speaker",
    seller: "TeeGadgets",
    price: "₦120,000.00",
    priceValue: 120000,
    image: "/speaker.png",
  },
  {
    name: "Lit Gaming Mouse",
    seller: "TeeGadgets",
    price: "₦120,000.00",
    priceValue: 120000,
    image: "/mouse.png",
  },
];

/**
 * Shape returned by POST /transactions on success (the `data` object from
 * your sample response). Only the fields this page actually renders are
 * typed here — add more as you need them.
 */
interface EscrowTransaction {
  transactionId: string;
  reference: string;
  status: string;
  virtualAccount: {
    accountNumber: string;
    accountName: string;
    bankName: string;
  };
  totalAmount: number;
  deliveryFee: number;
  escrowFee: number;
  createdAt: string;
}

interface CreateTransactionResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  data?: EscrowTransaction;
}

export default function Page() {
  const [items, setItems] = useState(products);
  const [payment, setPayment] = useState("escrow");
  const [transaction, setTransaction] = useState<EscrowTransaction | null>(
    null,
  );
  const [isCreatingTransaction, setIsCreatingTransaction] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const total = items.reduce((sum, item) => sum + item.priceValue, 0);

  const copyValue = async (value: string, key: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    window.setTimeout(() => setCopied(null), 1600);
  };

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

  const handleProceedToCheckout = async () => {
    if (payment !== "escrow" || !items.length) return;

    setCheckoutError(null);
    setIsCreatingTransaction(true);

    try {
      const res = await fetch(
        "https://staging-api.usebridgee.com/escrow-service/api/v1/partner/transactions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "brg_37ebb0cf7bb5266e8ee13bb6754abcd7cbfaef3df8c9f663edfce38b38bdbf41",
            "Idempotency-Key": "6f1c0e2a-9op8-4d19-a0f3-2e5c9b71d840",
          },
          body: JSON.stringify({
            partnerReference: `ORD-${Date.now()}`,
            // TODO: replace with the actual signed-in buyer's details once
            // this page has access to a real session/user object — "Toluwalase"
            // is only ever shown as a display greeting right now, nothing in
            // this UI currently captures a buyer email/phone/externalId.
            buyer: {
              externalId: "b_88",
              name: "Toluwalase",
              email: "toluwalase@example.com",
              phone: "08030000001",
            },
            // TODO: replace with the real seller/vendor record for these
            // items (bank code + account number for payout) once the
            // marketplace has actual vendor accounts — every demo product
            // here shares the single "TeeGadgets" seller as a placeholder.
            seller: {
              externalId: "s_12",
              name: "TeeGadgets",
              email: "vendor@teegadgets.example.com",
              phone: "08030000002",
              bankCode: "035",
              accountNumber: "0123456789",
            },
            items: items.map((item) => ({
              name: item.name,
              quantity: 1,
              unitPrice: item.priceValue,
            })),
            deliveryFee: 0,
            description: `Wishlist checkout (${items.length} item${items.length === 1 ? "" : "s"})`,
            metadata: { channel: "web" },
          }),
        },
      );

      const json: CreateTransactionResponse = await res.json();

      if (!res.ok || !json.isSuccess || !json.data) {
        setCheckoutError(
          json.message || "Couldn't start checkout. Please try again.",
        );
        return;
      }

      setTransaction(json.data);
    } catch {
      setCheckoutError("Couldn't reach the payment service. Please try again.");
    } finally {
      setIsCreatingTransaction(false);
    }
  };

  return (
    <MarketplaceLayout wishlistCount={wishlist.length}>
      <main className="min-h-screen bg-[#f7f8fa] p-4 text-[#20202a] md:p-6">
        <div className="mx-auto max-w-[1450px]">
          <p className="mb-4 text-[13px] text-[#777781]">
            Hello <strong className="text-[#20202a]">Toluwalase</strong>
          </p>
          <div className="mb-4 flex items-center gap-3 text-[11px]">
            <span>Marketplace</span>
            <span className="text-[#9da0aa]">›</span>
            <span className="font-semibold text-[#b5096e]">Wishlist</span>
          </div>

          <div className="flex flex-col gap-5 xl:flex-row">
            <div className="min-w-0 flex-1 space-y-4">
              {items.length === 0 && (
                <div className="rounded-2xl bg-white p-12 text-center text-sm text-[#777781] shadow-sm">
                  Your wishlist is empty.
                </div>
              )}
              {items.map((product) => (
                <article
                  key={product.name}
                  className="flex min-h-[119px] items-center gap-4 rounded-2xl bg-white p-3 shadow-[0_5px_16px_rgba(31,35,45,0.08)] sm:gap-7"
                >
                  <Image
                    src={Headphone}
                    alt={product.name}
                    className="h-[92px] w-[110px] shrink-0 rounded-xl object-cover sm:w-[133px]"
                  />
                  <div className="min-w-0 flex-1 py-1">
                    <h2 className="truncate text-[12px] font-bold">
                      {product.name}
                    </h2>
                    <p className="mt-3 text-[10px] text-[#687080]">
                      {product.seller}
                    </p>
                    <p className="mt-2 text-[17px] font-bold text-[#c3004f]">
                      {product.price}
                    </p>
                  </div>
                  <button
                    aria-label={`Remove ${product.name}`}
                    onClick={() =>
                      setItems((current) =>
                        current.filter((item) => item.name !== product.name),
                      )
                    }
                    className="mr-1 rounded-lg border border-[#737b89] p-1 text-[#737b89] transition hover:border-[#b5096e] hover:text-[#b5096e]"
                  >
                    <X size={17} strokeWidth={1.2} />
                  </button>
                </article>
              ))}
            </div>

            {transaction ? (
              <PaymentDetails
                transaction={transaction}
                onCancel={() => setTransaction(null)}
                copied={copied}
                onCopy={copyValue}
              />
            ) : (
              <aside className="h-fit w-full rounded-2xl bg-white p-4 shadow-[0_5px_16px_rgba(31,35,45,0.08)] xl:w-[343px]">
                <h2 className="text-[17px] font-bold">Order Summary</h2>
                <div className="mt-5 flex justify-between text-[10px] font-semibold">
                  <span>Item({items.length}):</span>
                  <span>₦{total.toLocaleString("en-NG")}.00</span>
                </div>
                <div className="my-5 border-t border-[#d9dce2]" />
                <div className="flex justify-between text-[11px] font-bold">
                  <span>Total:</span>
                  <span className="text-[17px] text-[#b5096e]">
                    ₦{total.toLocaleString("en-NG")}.00
                  </span>
                </div>
                <div className="mx-auto my-5 flex w-20 items-center justify-between">
                  <span className="h-1 w-1 rounded-full bg-[#a8afbb]" />
                  <span className="h-px flex-1 bg-[#a8afbb]" />
                  <span className="h-1 w-1 rounded-full bg-[#a8afbb]" />
                </div>
                <p className="mb-2 text-[10px] font-bold">
                  Select Payment Method
                </p>
                <div className="space-y-2">
                  <PaymentOption
                    selected={payment === "bank"}
                    onSelect={() => setPayment("bank")}
                    title="Pay with Bank Transfer"
                    description="Transfer directly to a Werma Bank account to checkout"
                  />
                  <PaymentOption
                    selected={payment === "escrow"}
                    onSelect={() => setPayment("escrow")}
                    title="Pay with Escrow"
                    description="Pay with an added layer of security, easy and seamless."
                  />
                </div>

                {checkoutError && (
                  <p className="mt-3 text-[11px] font-semibold text-red-600">
                    {checkoutError}
                  </p>
                )}

                <button
                  onClick={handleProceedToCheckout}
                  className="mt-5 h-9 w-full rounded-md bg-[#b5096e] text-[13px] font-bold text-white transition hover:bg-[#99085e] disabled:opacity-50"
                  disabled={!items.length || isCreatingTransaction}
                >
                  {isCreatingTransaction
                    ? "Setting up payment..."
                    : "Proceed to Checkout"}
                </button>
              </aside>
            )}
          </div>
        </div>
      </main>
    </MarketplaceLayout>
  );
}

function PaymentDetails({
  transaction,
  onCancel,
  copied,
  onCopy,
}: {
  transaction: EscrowTransaction;
  onCancel: () => void;
  copied: string | null;
  onCopy: (value: string, key: string) => void;
}) {
  const [secondsLeft, setSecondsLeft] = useState(9 * 60 + 36);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = window.setInterval(() => {
      setSecondsLeft((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const countdown = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  const { virtualAccount, totalAmount } = transaction;
  const amountLabel = `₦${totalAmount.toLocaleString("en-NG")}.00`;

  return (
    <section className="w-full rounded-2xl bg-white p-6 shadow-[0_5px_16px_rgba(31,35,45,0.08)] sm:p-8 xl:w-[450px]">
      <div className="flex items-start justify-between border-b border-[#8b8f98] pb-6">
        <div>
          <h2 className="text-base font-medium">Damilola Ogunboyejo</h2>
          <p className="text-base text-[#687080]">09034057632</p>
          <p className=" text-base text-[#687080]">
            demilademichael18@gmail.com
          </p>
        </div>

        <span className="text-2xl font-medium">Pay</span>
      </div>

      <h2 className="mt-5 text-base font-semibold">
        Transfer NGN to the Collection Account Below
      </h2>

      <div className="mt-6 space-y-8 rounded-2xl bg-[#f5f5f5] p-7 text-base text-[#687080]">
        <p>{virtualAccount.bankName}</p>

        <div>
          <p>ACCOUNT NAME</p>
          <p>{virtualAccount.accountName}</p>
        </div>

        <CopyRow
          label="ACCOUNT NUMBER"
          value={virtualAccount.accountNumber}
          copied={copied === "account"}
          onCopy={() => onCopy(virtualAccount.accountNumber, "account")}
        />

        <CopyRow
          label="AMOUNT"
          value={amountLabel}
          copied={copied === "amount"}
          onCopy={() => onCopy(amountLabel, "amount")}
        />
      </div>

      <div className="my-10 border-t border-dashed border-[#8b8f98]" />

      <p className="text-center text-base leading-relaxed">
        The account is for this transaction only and expires in
        <br />
        <strong className="text-2xl font-medium text-[#00aa7d]">
          {countdown}
        </strong>
      </p>

      <button
        className="mt-10 h-14 w-full rounded-xl bg-[#b5096e] text-lg font-bold text-white hover:bg-[#99085e]"
        type="button"
      >
        I&apos;ve sent the money
      </button>

      <button
        onClick={onCancel}
        type="button"
        className="mt-4 flex h-14 w-full items-center justify-center gap-3 rounded-xl border-2 border-[#737b89] text-lg font-medium"
      >
        <X size={24} strokeWidth={1.5} />
        Cancel Payment
      </button>
    </section>
  );
}

function CopyRow({
  label,
  value,
  copied,
  onCopy,
}: {
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <span>{label}</span>
        <p>{value}</p>
      </div>
      <button
        aria-label={`Copy ${label.toLowerCase()}`}
        onClick={onCopy}
        className="text-[#20202a]"
      >
        {copied ? <Check size={16} /> : <Copy size={16} strokeWidth={1.6} />}
      </button>
    </div>
  );
}

function PaymentOption({
  selected,
  onSelect,
  title,
  description,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-start gap-2 rounded-lg border p-2.5 text-left ${selected ? "border-[#d31379] bg-[#fff3f9]" : "border-[#d9dce2] bg-white"}`}
    >
      <span
        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${selected ? "border-[#d31379]" : "border-[#c9ced7]"}`}
      >
        <span
          className={`h-2 w-2 rounded-full ${selected ? "bg-[#d31379]" : "bg-transparent"}`}
        />
      </span>
      <span>
        <span className="block text-[10px] font-bold">{title}</span>
        <span className="mt-1 block text-[8px] text-[#626b78]">
          {description}
        </span>
      </span>
    </button>
  );
}

