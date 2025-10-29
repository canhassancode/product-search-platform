import Fuse, { type FuseResultMatch } from "fuse.js";
import type { Product } from "@/lib/types/product";

type SearchResult = {
  item: Product;
  score: number;
  matches: readonly FuseResultMatch[] | undefined;
};

export function searchProducts(products: Product[], query: string, keys: string[]): SearchResult[] {
  const fuse = new Fuse(products, {
    keys,
    includeScore: true,
    threshold: 0.3,
    distance: 100,
    includeMatches: true,
    isCaseSensitive: false,
  });

  const trimmedQuery = query.trim();
  if (!trimmedQuery) {
    return products.map((product) => ({
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
