import { Product } from "@/lib/types/product";

export function optimiseProducts(products: Product[]): Product[] {
  return products.filter((product) => product.status === "ACTIVE");
}
