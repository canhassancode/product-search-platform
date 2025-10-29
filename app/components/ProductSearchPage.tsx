"use client";

import Image from "next/image";
import { useState, useMemo, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Input } from "@/components/ui/input";
import { Product } from "@/lib/types/product";
import { searchProducts } from "@/lib/search/search-engine";
import { ProductCard } from "@/components/ProductCard";

interface ProductSearchPageProps {
  initialProducts: Product[];
}

const COLUMNS_DESKTOP = 5;
const ROW_HEIGHT_DESKTOP = 380;
const OVERSCAN = 2;

export function ProductSearchPage({ initialProducts }: ProductSearchPageProps) {
  const [query, setQuery] = useState("");
  const parentRef = useRef<HTMLDivElement>(null);

  const filteredResults = useMemo(() => {
    return searchProducts(initialProducts, query, ["title", "description", "tags"]);
  }, [initialProducts, query]);

  const filteredProducts = filteredResults.map((result) => result.item);

  const rowCount = Math.ceil(filteredProducts.length / COLUMNS_DESKTOP);

  // eslint-disable-next-line
  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT_DESKTOP,
    overscan: OVERSCAN,
  });

  const getRowProducts = (rowIndex: number): Product[] => {
    const startIndex = rowIndex * COLUMNS_DESKTOP;
    return filteredProducts.slice(startIndex, startIndex + COLUMNS_DESKTOP);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="flex justify-between items-center container mx-auto px-4 py-4 lg:py-6">
          <div className="lg:flex hidden items-center gap-6">
            <Image src="/logo.png" alt="Healf Logo" width={50} height={50} className="rounded-2xl" />
            <h1 className="text-2xl font-bold">Wellness Products</h1>
          </div>
          <Image src="/logo.png" alt="Healf Logo" width={40} height={40} className="lg:hidden rounded-2xl" />
          <Input
            type="text"
            placeholder="Search for a product..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-32 sm:w-48 lg:w-96 text-sm"
          />
        </div>
      </header>

      <div className="container mx-auto px-4 py-3 lg:py-4">
        <div className="text-xs sm:text-sm text-muted-foreground">
          {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
          {query && ` for "${query}"`}
        </div>
      </div>

      <div ref={parentRef} className="container mx-auto px-4 pb-4 h-[calc(100vh-180px)] lg:h-[calc(100vh-200px)] overflow-auto">
        <div className="relative w-full" style={{ height: `${virtualizer.getTotalSize()}px` }}>
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const rowProducts = getRowProducts(virtualRow.index);

            return (
              <div
                key={virtualRow.key}
                className="absolute top-0 left-0 w-full"
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-4 h-full pb-2 md:pb-3 lg:pb-4">
                  {rowProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                  {rowProducts.length < COLUMNS_DESKTOP &&
                    Array.from({ length: COLUMNS_DESKTOP - rowProducts.length }).map((_, idx) => <div key={`empty-${idx}`} />)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
