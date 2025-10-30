import { useState, useMemo } from "react";
import type { SearchResult } from "@/lib/search/search-engine";
import type { SortOption } from "@/lib/types/sort";
import { sortSearchResults } from "@/lib/sort/product-sorter";

type UseProductSortReturn = {
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  sortedResults: SearchResult[];
};

export function useProductSort(results: SearchResult[]): UseProductSortReturn {
  const [sortOption, setSortOption] = useState<SortOption>("relevance");

  const sortedResults = useMemo(() => {
    return sortSearchResults(results, sortOption);
  }, [results, sortOption]);

  return {
    sortOption,
    setSortOption,
    sortedResults,
  };
}
