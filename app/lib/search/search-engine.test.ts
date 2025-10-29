import { Product } from "../types/product";
import { searchProducts } from "./search-engine";

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
});
