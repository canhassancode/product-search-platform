import { loadProducts } from "./product-loader";

jest.spyOn(console, "error").mockImplementation(() => {});
describe("Given the product loader", () => {
  describe("when calling the loadProducts function with a valid CSV file", () => {
    it("should successfully load, transform, and optimize all valid products", async () => {
      const products = await loadProducts("./app/lib/data/products.csv");

      expect(products.length).toBeGreaterThan(0);
      expect(products.every((p) => p.id && p.title && p.vendor)).toBe(true);
      expect(products.every((p) => p.description.length <= 200)).toBe(true);
      expect(products.every((p) => p.status === "ACTIVE")).toBe(true);
    });
  });

  describe("when calling the loadProducts function with an invalid CSV file", () => {
    it("should return an empty array", async () => {
      const products = await loadProducts("./app/lib/data/invalid.csv");

      expect(products).toEqual([]);
    });
  });
});
