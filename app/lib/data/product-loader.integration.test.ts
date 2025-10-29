import { loadProducts } from "./product-loader";
import fs from "fs";

jest.spyOn(console, "error").mockImplementation(() => {});
describe("Given the product loader", () => {
  const csvFilePath = "./app/lib/data/products.csv";
  describe("when calling the loadProducts function with a valid CSV file", () => {
    it("should successfully load, transform, and optimize all valid products", async () => {
      const products = await loadProducts(csvFilePath);

      expect(products.length).toBeGreaterThan(0);
      expect(products.every((p) => p.id && p.title && p.vendor)).toBe(true);
      expect(products.every((p) => p.description.length <= 200)).toBe(true);
      expect(products.every((p) => p.status === "ACTIVE")).toBe(true);
    });

    it("should significantly reduce data size from original CSV", async () => {
      const csvStats = fs.statSync(csvFilePath);
      const originalSizeBytes = csvStats.size;
      const originalSizeMB = originalSizeBytes / (1024 * 1024);

      const products = await loadProducts(csvFilePath);

      const processedDataSize = JSON.stringify(products).length;
      const processedSizeMB = processedDataSize / (1024 * 1024);

      const reductionPercentage = ((originalSizeBytes - processedDataSize) / originalSizeBytes) * 100;
      console.log(`Original CSV: ${originalSizeMB.toFixed(2)}MB`);
      console.log(`Processed data: ${processedSizeMB.toFixed(2)}MB`);
      console.log(`Size reduction: ${reductionPercentage.toFixed(1)}%`);

      expect(processedSizeMB).toBeLessThan(originalSizeMB);
      expect(reductionPercentage).toBeGreaterThan(50);
      expect(processedSizeMB).toBeLessThan(10);
    });
  });

  describe("when calling the loadProducts function with an invalid CSV file", () => {
    it("should return an empty array", async () => {
      const products = await loadProducts("invalid.csv");

      expect(products).toEqual([]);
    });
  });
});
