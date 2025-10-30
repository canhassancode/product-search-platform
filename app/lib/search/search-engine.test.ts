import type { Product } from "@/lib/types/product";
import { searchProducts } from "./search-engine";
import type { FilterOptions } from "@/lib/types/filter";

const products: Product[] = [
  {
    id: "1",
    title: "Thorne Stress Support Formula",
    description: "Supports healthy stress response and promotes relaxation",
    tags: ["goal:Stress and Anxiety", "Supplements", "Mood support"],
    vendor: "Thorne",
    price: 25.99,
    imageUrl: "https://example.com/stress.jpg",
    status: "ACTIVE",
  },
  {
    id: "2",
    title: "Coola Organic Sunscreen SPF 50",
    description: "Broad spectrum sun protection with organic ingredients",
    tags: ["filter:Skincare", "Suncare", "SPF"],
    vendor: "Coola",
    price: 32.0,
    imageUrl: "https://example.com/sunscreen.jpg",
    status: "ACTIVE",
  },
  {
    id: "3",
    title: "Sleep Quality Plus Melatonin",
    description: "Natural sleep aid with melatonin and calming herbs",
    tags: ["goal:Sleep Quality", "Supplements", "Sleep"],
    vendor: "Nature's Way",
    price: 18.5,
    imageUrl: "https://example.com/sleep.jpg",
    status: "ACTIVE",
  },
  {
    id: "4",
    title: "Sleep Quality Premium Melatonin",
    description: "Premium sleep aid with melatonin and calming herbs",
    tags: ["goal:Sleep Quality", "Supplements", "Sleep"],
    vendor: "Thorne",
    price: 25.99,
    imageUrl: "https://example.com/sleep.jpg",
    status: "ACTIVE",
  },
];

describe("Given the search engine", () => {
  describe("when calling the searchProducts function", () => {
    it("should return all products when the query is empty", () => {
      const results = searchProducts(products, "", ["title", "description", "tags"]);

      expect(results.length).toBe(4);
      expect(results.every((result) => result.score === 1)).toBe(true);
    });

    it("should return products matching the query regardless of case", () => {
      const results = searchProducts(products, "Sleeep", ["title", "description", "tags"]);

      expect(results.length).toBe(2);
    });

    it("should return the exact product when the query is the exact product title", () => {
      const results = searchProducts(products, "Thorne Stress Support Formula", ["title", "description", "tags"]);

      expect(results.length).toBe(1);
      expect(results[0].item.title).toBe("Thorne Stress Support Formula");
    });
  });

  describe("when filtering products", () => {
    it("should return all products when no filters are applied", () => {
      const filters: FilterOptions = { vendors: [], goals: [], categories: [] };
      const results = searchProducts(products, "", ["title", "description", "tags"], filters);

      expect(results.length).toBe(4);
    });

    it("should filter products by a single vendor", () => {
      const filters: FilterOptions = { vendors: ["Thorne"], goals: [], categories: [] };
      const results = searchProducts(products, "", ["title", "description", "tags"], filters);

      expect(results.length).toBe(2);
      expect(results.every((result) => result.item.vendor === "Thorne")).toBe(true);
    });

    it("should filter products by multiple vendors (OR logic)", () => {
      const filters: FilterOptions = { vendors: ["Thorne", "Coola"], goals: [], categories: [] };
      const results = searchProducts(products, "", ["title", "description", "tags"], filters);

      expect(results.length).toBe(3);
      expect(results.every((result) => ["Thorne", "Coola"].includes(result.item.vendor))).toBe(true);
    });

    it("should filter products by a single goal", () => {
      const filters: FilterOptions = { vendors: [], goals: ["Sleep Quality"], categories: [] };
      const results = searchProducts(products, "", ["title", "description", "tags"], filters);

      expect(results.length).toBe(2);
      expect(results.every((result) => result.item.tags.includes("goal:Sleep Quality"))).toBe(true);
    });

    it("should filter products by multiple goals (OR logic)", () => {
      const filters: FilterOptions = { vendors: [], goals: ["Sleep Quality", "Stress and Anxiety"], categories: [] };
      const results = searchProducts(products, "", ["title", "description", "tags"], filters);

      expect(results.length).toBe(3);
    });

    it("should filter products by a single category", () => {
      const filters: FilterOptions = { vendors: [], goals: [], categories: ["Supplements"] };
      const results = searchProducts(products, "", ["title", "description", "tags"], filters);

      expect(results.length).toBe(3);
      expect(results.every((result) => result.item.tags.includes("Supplements"))).toBe(true);
    });

    it("should filter products by multiple categories (OR logic)", () => {
      const filters: FilterOptions = { vendors: [], goals: [], categories: ["Supplements", "SPF"] };
      const results = searchProducts(products, "", ["title", "description", "tags"], filters);

      expect(results.length).toBe(4);
    });

    it("should combine filters across vendors, goals, and categories (AND logic)", () => {
      const filters: FilterOptions = { vendors: ["Thorne"], goals: ["Sleep Quality"], categories: [] };
      const results = searchProducts(products, "", ["title", "description", "tags"], filters);

      expect(results.length).toBe(1);
      expect(results[0].item.title).toBe("Sleep Quality Premium Melatonin");
      expect(results[0].item.vendor).toBe("Thorne");
    });

    it("should apply filters before fuzzy search", () => {
      const filters: FilterOptions = { vendors: ["Thorne"], goals: [], categories: [] };
      const results = searchProducts(products, "sleep", ["title", "description", "tags"], filters);

      expect(results.length).toBe(1);
      expect(results[0].item.title).toBe("Sleep Quality Premium Melatonin");
      expect(results[0].item.vendor).toBe("Thorne");
    });

    it("should return empty array when filters match no products", () => {
      const filters: FilterOptions = { vendors: ["NonExistent"], goals: [], categories: [] };
      const results = searchProducts(products, "", ["title", "description", "tags"], filters);

      expect(results.length).toBe(0);
    });
  });
});
