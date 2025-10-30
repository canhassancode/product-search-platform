import { Product } from "@/lib/types/product";

export function optimiseProducts(products: Product[]): Product[] {
  const activeProducts = filterInactiveProducts(products);
  const productsWithValidImageUrl = filterProductsWithValidImageUrl(activeProducts);
  return productsWithValidImageUrl.map((product) => ({
    ...product,
    description: truncateDescription(product.description),
    tags: filterUndesiredTags(product.tags),
  }));
}

function filterProductsWithValidImageUrl(products: Product[]): Product[] {
  return products.filter(
    (product) =>
      typeof product.imageUrl === "string" && product.imageUrl.trim() !== "" && product.imageUrl !== "null" && product.imageUrl !== "undefined"
  );
}

function filterInactiveProducts(products: Product[]): Product[] {
  return products.filter((product) => product.status === "ACTIVE");
}

function truncateDescription(description: string): string {
  return description.replace("Key Benefits", "").slice(0, 197).trim() + "...";
}

function filterUndesiredTags(tags: string[]): string[] {
  return tags.filter(
    (tag) =>
      !tag.includes("_") &&
      tag.length > 2 &&
      !tag.includes("internal") &&
      !tag.includes("launch") &&
      tag.toUpperCase() !== tag &&
      !tag.match(/\d+(\.\d+)?/g)
  );
}
