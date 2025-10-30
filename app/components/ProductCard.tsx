"use client";

import { Product } from "@/lib/types/product";
import { useState } from "react";
import Image from "next/image";

export default function ProductCard({ product }: { product: Product }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="rounded-xl duration-300 overflow-hidden group hover:scale-101">
      <div className="relative aspect-3/4 overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
        {!imageError ? (
          <Image src={product.imageUrl} alt={product.title} fill className="object-cover" onError={() => setImageError(true)} />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <div className="text-center p-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm text-gray-500 mt-2">Image unavailable</p>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-red-200/5 group-hover:bg-black/70 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-center">
            <p className="text-white text-base leading-relaxed line-clamp-4">{product.description}</p>
          </div>
        </div>
      </div>

      <div className="py-4 px-2">
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm text-gray-500 font-normal">{product.vendor}</span>
        </div>
        <h3 className="font-bold text-gray-900 mb-2">{product.title}</h3>
        <h4 className="text-lg font-bold text-primary group-hover:text-red-500 transition-all duration-300">£{product.price.toFixed(2)}</h4>
      </div>
    </div>
  );
}
