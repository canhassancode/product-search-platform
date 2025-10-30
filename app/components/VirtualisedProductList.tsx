"use client";

import { Product } from "@/lib/types/product";
import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import ProductCard from "@/components/ProductCard";

export default function VirtualisedProductList({ products }: { products: Product[] }) {
  const parentRef = useRef(null);

  const getColumns = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth >= 1024) return 3;
    return 2;
  };

  const columns = getColumns();

  const rows: Product[][] = [];
  for (let i = 0; i < products.length; i += columns) {
    rows.push(products.slice(i, i + columns));
  }

  // eslint-disable-next-line
  const rowVirtualiser = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 620,
    overscan: 4,
  });

  return (
    <div ref={parentRef} className="h-screen overflow-y-auto w-full">
      <div
        style={{
          height: `${rowVirtualiser.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualiser.getVirtualItems().map(({ index, key, start }) => (
          <div
            key={key}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${start}px)`,
            }}
          >
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-4" data-index={index}>
              {rows[index].map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
