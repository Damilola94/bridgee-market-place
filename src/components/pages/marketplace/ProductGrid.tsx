"use client";

import { Product } from "../../../types/marketplace";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  wishlist: string[];
  onOpen: (product: Product) => void;
  onToggleWishlist: (id: string) => void;
}

export function ProductGrid({
  products,
  wishlist,
  onOpen,
  onToggleWishlist,
}: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isWishlisted={wishlist.includes(product.id)}
          onOpen={onOpen}
          onToggleWishlist={onToggleWishlist}
        />
      ))}
    </div>
  );
}