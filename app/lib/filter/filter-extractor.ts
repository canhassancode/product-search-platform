import { Product } from "@/lib/types/product";
import { FilterOptions } from "@/lib/types/filter";

export function extractFilterOptions(products: Product[]): FilterOptions {
  const vendors = extractVendors(products);
  const goals = extractGoals(products);
  const categories = extractCategories(products);
  return {
    vendors: Array.from(new Set(vendors)),
    goals: Array.from(new Set(goals)),
    categories: Array.from(new Set(categories)),
  };
}

function extractVendors(products: Product[]): string[] {
  return products
    .map((product) => product.vendor)
    .filter((vendor) => vendor !== "")
    .sort();
}

function extractGoals(products: Product[]): string[] {
  return products
    .map((product) => product.tags.filter((tag) => tag.startsWith("goal:")).map((tag) => tag.replace("goal:", "")))
    .flat()
    .filter((goal) => goal !== "")
    .sort();
}

function extractCategories(products: Product[]): string[] {
  return products
    .map((product) => product.tags.filter((tag) => !tag.includes("goal:") && !tag.includes("filter:")))
    .flat()
    .filter((category) => category !== "")
    .sort();
}
