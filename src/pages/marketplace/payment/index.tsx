"use client";

import { useEffect, useState } from "react";
import { Check, Copy, X } from "lucide-react";
import { MarketplaceLayout } from "../../../components/pages/marketplace/MarketplaceLayout";
import Headphone from "../../../assets/images/headphone.png";
import Image from "next/image";

const products = [
  {
    name: "Wireless Noise-Cancelling Headphones",
    seller: "TeeGadgets",
    price: "₦120,000.00",
    image: "/headphones.png",
  },
  {
    name: "Bluetooth Speaker",
    seller: "TeeGadgets",
    price: "₦120,000.00",
    image: "/speaker.png",
  },
  {
    name: "Lit Gaming Mouse",
    seller: "TeeGadgets",
    price: "₦120,000.00",
    image: "/mouse.png",
  },
];

export default function Page() {
  const [items, setItems] = useState(products);
  const [payment, setPayment] = useState("escrow");
  const [checkoutStarted, setCheckoutStarted] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const total = items.length * 120000;

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

            {checkoutStarted ? (
              <PaymentDetails
                total={total}
                onCancel={() => setCheckoutStarted(false)}
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
                <button
                  onClick={() => setCheckoutStarted(true)}
                  className="mt-5 h-9 w-full rounded-md bg-[#b5096e] text-[13px] font-bold text-white transition hover:bg-[#99085e] disabled:opacity-50"
                  disabled={!items.length}
                >
                  Proceed to Checkout
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
  total,
  onCancel,
  copied,
  onCopy,
}: {
  total: number;
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

  return (
    <section className="w-full rounded-2xl bg-white p-6 shadow-[0_5px_16px_rgba(31,35,45,0.08)] sm:p-8 xl:w-[450px]">
      <div className="flex items-start justify-between border-b border-[#8b8f98] pb-6">
        <div>
          <h2 className="text-base font-medium">Damilola Ogunboyejo</h2>
          <p className="mt-5 text-xl text-[#687080]">09034057632</p>
          <p className="mt-4 text-base text-[#687080]">
            demilademichael18@gmail.com
          </p>
        </div>

        <span className="text-2xl font-medium">Pay</span>
      </div>

      <h2 className="mt-10 text-base font-semibold">
        Transfer NGN to the Collection Account Below
      </h2>

      <div className="mt-6 space-y-8 rounded-2xl bg-[#f5f5f5] p-7 text-base text-[#687080]">
        <p>BANK NAME</p>

        <div>
          <p>ACCOUNT NAME</p>
          <p>Damilola Ogunboyejo</p>
        </div>

        <CopyRow
          label="ACCOUNT NUMBER"
          value="0123456789"
          copied={copied === "account"}
          onCopy={() => onCopy("0123456789", "account")}
        />

        <CopyRow
          label="AMOUNT"
          value={`₦${total.toLocaleString("en-NG")}.00`}
          copied={copied === "amount"}
          onCopy={() =>
            onCopy(`₦${total.toLocaleString("en-NG")}.00`, "amount")
          }
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
        {" "}
        <span>{label}</span>
        <p>{value}</p>
      </div>
      <button
        aria-label={`Copy ${label.toLowerCase()}`}
        onClick={onCopy}
        className="text-[#20202a]"
      >
        {copied ? <Check size={28} /> : <Copy size={28} strokeWidth={1.6} />}
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

