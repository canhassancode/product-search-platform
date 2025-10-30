"use client";

import { Product } from "@/lib/types/product";
import { useState } from "react";
import { searchProducts } from "@/lib/search/search-engine";
import useDebounce from "@/hooks/useDebounce";
import SearchBar from "@/components/SearchBar";
import Header from "@/components/Header";
import VirtualisedProductList from "@/components/VirtualisedProductList";
import ProductFilterBox from "@/components/ProductFilterBox";
import type { FilterOptions } from "@/lib/types/filter";

interface ProductSearchPageProps {
  products: Product[];
  filterOptions: FilterOptions;
}

export function ProductSearchPage({ products, filterOptions }: ProductSearchPageProps) {
  const [query, setQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<FilterOptions>({
    vendors: [],
    goals: [],
    categories: [],
  });

  const debouncedQuery = useDebounce(query);
  const results = searchProducts(products, debouncedQuery, ["title", "description", "tags"], selectedFilters);

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <Header />
      </header>
      <section className="container mx-auto w-4/5 lg:w-1/2 px-4 py-12">
        <SearchBar query={query} setQuery={setQuery} />
      </section>
      <section className="container mx-auto w-full px-4 lg:px-8">
        <h1 className="text-lg font-medium text-gray-800">
          {debouncedQuery && `${results.length} products found for "${debouncedQuery}"`}
          {!debouncedQuery && `${results.length} products found`}
        </h1>
      </section>
      <section className="container mx-auto w-full px-4 py-2 rounded-t-3xl flex flex-col lg:flex-row gap-4">
        <div className="flex w-full lg:w-1/4 h-full pb-4 lg:m-4 bg-gray-100/80 border border-gray-200 rounded-xl font-medium text-lg">
          <ProductFilterBox filterOptions={filterOptions} selectedFilters={selectedFilters} onFilterChange={setSelectedFilters} />
        </div>
        <div className="flex w-full h-full lg:w-3/4">
          <VirtualisedProductList products={results.map((result) => result.item)} />
        </div>
      </section>
    </main>
  );
}
