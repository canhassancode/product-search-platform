"use client";

import { Product } from "@/lib/types/product";
import { useState } from "react";
import { searchProducts } from "@/lib/search/search-engine";
import useDebounce from "@/hooks/useDebounce";
import SearchBar from "@/components/SearchBar";
import Header from "@/components/Header";
import VirtualisedProductList from "@/components/VirtualisedProductList";
import ProductFilterBox from "@/components/ProductFilterBox";

interface ProductSearchPageProps {
  products: Product[];
}

export function ProductSearchPage({ products }: ProductSearchPageProps) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);
  const results = searchProducts(products, debouncedQuery, ["title", "description", "tags"]);

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <Header />
      </header>
      <section className="container mx-auto w-4/5 lg:w-1/2 px-4 py-12">
        <SearchBar query={query} setQuery={setQuery} />
      </section>
      <section className="container mx-auto w-full lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {debouncedQuery && `${results.length} results for "${debouncedQuery}"`}
          {!debouncedQuery && `${results.length} results`}
        </h1>
      </section>
      <section className="container mx-auto w-full px-4 py-2 rounded-t-3xl flex flex-col lg:flex-row gap-4">
        <div className="flex w-full lg:w-1/4 h-full pb-24 lg:m-4 bg-gray-100/80 border border-gray-200 rounded-xl font-medium text-lg">
          <ProductFilterBox />
        </div>
        <div className="flex w-full lg:w-3/4">
          <VirtualisedProductList products={results.map((result) => result.item)} />
        </div>
      </section>
    </main>
  );
}
