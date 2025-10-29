import { Product, RawCSVRow } from "@/lib/types/product";
import { transformRawProducts } from "./product-transformer";
import { optimiseProducts } from "./product-optimiser";
import { parse } from "csv-parse/sync";
import fs from "fs";

export async function loadProducts(filePath: string): Promise<Product[]> {
  try {
    const csvContent = fs.readFileSync(filePath, "utf-8");
    const rawProducts: RawCSVRow[] = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
    });

    const transformedProducts = transformRawProducts(rawProducts);
    return optimiseProducts(transformedProducts);
  } catch (error) {
    console.error("Error loading products:", error);
    return [];
  }
}
