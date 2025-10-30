"use client";

import { Product } from "@/lib/types/product";
import { useState } from "react";
import { searchProducts } from "@/lib/search/search-engine";
import useDebounce from "@/hooks/useDebounce";
import { useProductSort } from "@/hooks/useProductSort";
import SearchBar from "@/components/SearchBar";
import Header from "@/components/Header";
import VirtualisedProductList from "@/components/VirtualisedProductList";
import ProductFilterBox from "@/components/ProductFilterBox";
import type { FilterOptions } from "@/lib/types/filter";
import { motion } from "motion/react";
import SortSection from "./SortSection";
import Pillars from "./Pillars";

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
  const searchResults = searchProducts(products, debouncedQuery, ["title", "description", "tags"], selectedFilters);
  const { sortOption, setSortOption, sortedResults } = useProductSort(searchResults);

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <Header />
      </header>
      <section className="container mx-auto w-4/5 lg:w-1/2 px-4 py-12">
        <SearchBar query={query} setQuery={setQuery} />
      </section>
      <motion.section
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut", delay: 0.5 }}
        className="container mx-auto w-full px-4 lg:px-8 pb-4"
      >
        <h1 className="text-sm text-center lg:text-left lg:text-lg font-medium text-gray-800">
          {debouncedQuery && `${sortedResults.length} products found for "${debouncedQuery}"`}
          {!debouncedQuery && `${sortedResults.length} products found`}
        </h1>
      </motion.section>
      <section className="container mx-auto w-full px-4 flex flex-col lg:flex-row gap-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="flex flex-col gap-4 w-full lg:w-1/4 h-full font-medium text-lg"
        >
          <div className="bg-gray-100/80 border border-gray-200 rounded-xl pb-4">
            <ProductFilterBox filterOptions={filterOptions} selectedFilters={selectedFilters} onFilterChange={setSelectedFilters} />
          </div>
          <div className="hidden lg:block relative aspect-3/4 overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
            <Pillars />
          </div>
        </motion.div>
        <motion.div
          className="flex flex-col w-full h-full lg:w-3/4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <SortSection currentSort={sortOption} onSortChange={setSortOption} />
          <VirtualisedProductList products={sortedResults.map((result) => result.item)} />
        </motion.div>
      </section>
    </main>
  );
}
