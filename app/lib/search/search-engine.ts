import Fuse, { type FuseResultMatch } from "fuse.js";
import type { Product } from "@/lib/types/product";
import type { FilterOptions } from "@/lib/types/filter";

export type SearchResult = {
  item: Product;
  score: number;
  matches: readonly FuseResultMatch[] | undefined;
};

function filterProducts(products: Product[], filters: FilterOptions): Product[] {
  let filtered = products;

  if (filters.vendors.length > 0) {
    filtered = filtered.filter((product) => filters.vendors.includes(product.vendor));
  }

  if (filters.goals.length > 0) {
    filtered = filtered.filter((product) => filters.goals.some((goal) => product.tags.includes(`goal:${goal}`)));
  }

  if (filters.categories.length > 0) {
    filtered = filtered.filter((product) => filters.categories.some((category) => product.tags.includes(category)));
  }

  return filtered;
}

export function searchProducts(products: Product[], query: string, keys: string[], filters?: FilterOptions): SearchResult[] {
  const filteredProducts = filters ? filterProducts(products, filters) : products;

  const fuse = new Fuse(filteredProducts, {
    keys,
    includeScore: true,
    threshold: 0.3,
    distance: 100,
    includeMatches: true,
    isCaseSensitive: false,
  });

  const trimmedQuery = query.trim();
  if (!trimmedQuery) {
    return filteredProducts.map((product) => ({
      item: product,
      score: 1,
      matches: [],
    }));
  }

  const results = fuse.search(trimmedQuery);

  return results.map((result) => ({
    item: result.item,
    score: result.score ?? 1,
    matches: result.matches,
  }));
}
