import type { SearchResult } from "@/lib/search/search-engine";
import type { SortOption } from "@/lib/types/sort";

type SortFunction = (results: SearchResult[]) => SearchResult[];

const sortStrategies: Record<SortOption, SortFunction> = {
  relevance: (results) => [...results].sort((a, b) => a.score - b.score),
  "price-asc": (results) => [...results].sort((a, b) => a.item.price - b.item.price),
  "price-desc": (results) => [...results].sort((a, b) => b.item.price - a.item.price),
};

export function sortSearchResults(results: SearchResult[], sortOption: SortOption): SearchResult[] {
  const sortStrategy = sortStrategies[sortOption];
  return sortStrategy ? sortStrategy(results) : results;
}
