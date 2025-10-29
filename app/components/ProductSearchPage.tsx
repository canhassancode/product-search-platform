"use client";

import { Product } from "@/lib/types/product";
import Image from "next/image";
import { Input } from "./ui/input";
import { useState } from "react";
import { searchProducts } from "@/lib/search/search-engine";

interface ProductSearchPageProps {
  products: Product[];
}

function Header() {
  return (
    <div className="flex justify-between items-center container mx-auto px-4 py-6">
      <div className="flex items-center gap-6">
        <Image src="/logo.png" alt="Healf" width={60} height={60} className="rounded-2xl" />
      </div>
    </div>
  );
}

function SearchBar({ query, setQuery }: { query: string; setQuery: (query: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <Input type="text" placeholder="Search products" className="bg-white" value={query} onChange={(e) => setQuery(e.target.value)} />
    </div>
  );
}

function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="rounded-xl duration-300 overflow-hidden group hover:scale-101">
      <div className="relative aspect-3/4 overflow-hidden rounded-xl border border-gray-200">
        <Image src={product.imageUrl} alt={product.title} fill className="object-cover" />

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

export function ProductSearchPage({ products }: ProductSearchPageProps) {
  const [query, setQuery] = useState("");
  const results = searchProducts(products, query, ["title", "description", "tags"]);
  return (
    <main className="min-h-screen bg-white">
      <header className="bg-white border-b">
        <Header />
      </header>
      <section className="container mx-auto w-4/5 lg:w-1/2 px-4 py-12">
        <SearchBar query={query} setQuery={setQuery} />
      </section>
      <section className="container mx-auto w-full lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {query && `${results.length} results for "${query}"`}
          {!query && `${results.length} results`}
        </h1>
      </section>
      <section className="container mx-auto w-full px-4 py-2 min-h-screen rounded-t-3xl flex flex-col lg:flex-row gap-4">
        <div className="flex w-full lg:w-1/4 p-4 lg:m-4 bg-gray-50/40 border border-gray-200 rounded-xl">asdasda</div>
        <div className="flex w-full lg:w-3/4 p-4">
          <ProductList products={results.map((result) => result.item)} />
        </div>
      </section>
    </main>
  );
}
