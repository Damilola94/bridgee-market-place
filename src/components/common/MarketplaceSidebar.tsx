"use client";

import Link from "next/link";
import {
  LayoutGrid,
  ArrowLeftRight,
  Wallet,
  ShoppingBag,
  MessageSquare,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Logo from "../../assets/svgs/logos/full-white.svg";

const NAV_ITEMS = [
  { icon: LayoutGrid, label: "Dashboard", href: "#" },
  { icon: ShoppingBag, label: "Marketplace", href: "/marketplace" },
  { icon: ArrowLeftRight, label: "Transaction", href: "#" },
  { icon: MessageSquare, label: "Dispute", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
];

export function MarketplaceSidebar() {
  return (
    <aside className="hidden w-60 shrink-0 flex-col bg-pink-800 text-white lg:flex">
      <div className="h-20 px-6 py-8">
        <Image
          src={Logo}
          alt="UseBridgee Inc. logo"
          priority
          width={130}
          height={45}
        />
      </div>

      <nav className="mt-2 flex flex-col gap-1 px-3">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = item.label === "Marketplace";

          return (
            <div key={item.label}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? "bg-gray-200 font-semibold text-pink-800"
                    : "text-white/70 hover:bg-white/10"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>

              {item.label === "Transaction" && (
                <div className="ml-9 mt-1 flex flex-col gap-1 text-sm text-white/60">
                  <div className="flex items-center gap-2 py-1">
                    <Wallet className="h-3.5 w-3.5" />
                    Wallet
                  </div>

                  <div className="flex items-center gap-2 py-1">
                    <ShoppingBag className="h-3.5 w-3.5" />
                    Purchases
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}