"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Product } from "@/lib/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isValidImageUrl = product.imageUrl && product.imageUrl.trim() !== "" && product.imageUrl !== "null" && product.imageUrl !== "undefined";

  const [imageLoading, setImageLoading] = useState(isValidImageUrl);
  const [imageError, setImageError] = useState(!isValidImageUrl);

  useEffect(() => {
    if (!isValidImageUrl) {
      return;
    }

    const img = new window.Image();
    img.onload = () => setImageLoading(false);
    img.onerror = () => {
      setImageError(true);
      setImageLoading(false);
    };
    img.src = product.imageUrl;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [product.imageUrl, isValidImageUrl]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
      <div className="aspect-square relative bg-gray-100 shrink-0">
        {isValidImageUrl && !imageError ? (
          <>
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                <div className="h-6 w-6 md:h-8 md:w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
              </div>
            )}
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className={`object-cover ${imageLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
              unoptimized={product.imageUrl.startsWith("http")}
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Image</div>
        )}
      </div>

      <div className="p-2 md:p-3 lg:p-4 flex flex-col gap-1 md:gap-2 grow">
        <h3 className="font-semibold text-sm md:text-base lg:text-lg leading-tight line-clamp-2">{product.title}</h3>
        <p className="text-xs text-muted-foreground">{product.vendor}</p>
        <p className="text-xs text-gray-600 line-clamp-2">{product.description}</p>

        {product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {product.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="px-1.5 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full whitespace-nowrap">
                {tag}
              </span>
            ))}
            {product.tags.length > 2 && <span className="px-1.5 py-0.5 text-xs text-gray-500 whitespace-nowrap">+{product.tags.length - 2}</span>}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-1 md:pt-2">
          <span className="text-sm md:text-base lg:text-lg font-bold">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
