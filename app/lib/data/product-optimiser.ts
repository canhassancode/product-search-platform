import { Product } from "@/lib/types/product";

export function optimiseProducts(products: Product[]): Product[] {
  return products
    .filter((product) => product.status === "ACTIVE")
    .map((product) => ({
      ...product,
      description: product.description.slice(0, 197).trim() + "...",
    }));
}
