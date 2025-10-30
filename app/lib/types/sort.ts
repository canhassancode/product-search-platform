export type SortOption = "relevance" | "price-asc" | "price-desc";

export type SortConfig = {
  value: SortOption;
  label: string;
};

export const SORT_OPTIONS: SortConfig[] = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];
