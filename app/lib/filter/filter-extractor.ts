import { Product } from "@/lib/types/product";
import { FilterOptions } from "@/lib/types/filter";
interface FilterCount {
  value: string;
  count: number;
}

export function extractFilterOptions(products: Product[], limits = { vendors: 10, goals: 10, categories: 10 }): FilterOptions {
  const vendorCounts = countVendors(products);
  const goalCounts = countGoals(products);
  const categoryCounts = countCategories(products);

  return {
    vendors: getTopOptions(vendorCounts, limits.vendors),
    goals: getTopOptions(goalCounts, limits.goals),
    categories: getTopOptions(categoryCounts, limits.categories),
  };
}

function countVendors(products: Product[]): FilterCount[] {
  const counts = new Map<string, number>();

  products.forEach((product) => {
    if (product.vendor && product.vendor !== "") {
      counts.set(product.vendor, (counts.get(product.vendor) || 0) + 1);
    }
  });

  return Array.from(counts.entries())
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count);
}

function countGoals(products: Product[]): FilterCount[] {
  const counts = new Map<string, number>();

  products.forEach((product) => {
    product.tags
      .filter((tag) => tag.startsWith("goal:"))
      .forEach((tag) => {
        const goal = tag.replace("goal:", "");
        if (goal) {
          counts.set(goal, (counts.get(goal) || 0) + 1);
        }
      });
  });

  return Array.from(counts.entries())
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count);
}

function countCategories(products: Product[]): FilterCount[] {
  const counts = new Map<string, number>();

  products.forEach((product) => {
    product.tags
      .filter((tag) => !tag.includes("goal:") && !tag.includes("filter:"))
      .forEach((tag) => {
        if (tag) {
          counts.set(tag, (counts.get(tag) || 0) + 1);
        }
      });
  });

  return Array.from(counts.entries())
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count);
}

function getTopOptions(counted: FilterCount[], limit: number): string[] {
  return counted.slice(0, limit).map((item) => item.value);
}
