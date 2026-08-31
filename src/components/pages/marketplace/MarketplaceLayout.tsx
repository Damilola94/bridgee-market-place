"use client";

import { ReactNode } from "react";
import { MarketplaceSidebar } from "../../common/MarketplaceSidebar";
import { MarketplaceTopBar } from "../../common/MarketplaceTopBar";

interface MarketplaceLayoutProps {
  children: ReactNode;
  wishlistCount: number;
}

export function MarketplaceLayout({
  children,
  wishlistCount,
}: MarketplaceLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-neutral-100">
      <MarketplaceSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <MarketplaceTopBar wishlistCount={wishlistCount} />

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}