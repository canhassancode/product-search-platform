import { Product } from "../types/product";
import { searchProducts } from "./search-engine";

const products: Product[] = [
  {
    id: "1",
    title: "Product 1",
    description: "Description 1",
    tags: ["tag1", "tag2", "tag3"],
    vendor: "Vendor 1",
    price: 100,
    imageUrl: "https://test.com/image1.jpg",
    status: "ACTIVE",
  },
  {
    id: "2",
    title: "Product 2",
    description: "Description 2",
    tags: ["tag4", "tag5", "tag6"],
    vendor: "Vendor 2",
    price: 200,
    imageUrl: "https://test.com/image2.jpg",
    status: "ACTIVE",
  },
  {
    id: "3",
    title: "Product 3",
    description: "Description 3",
    tags: ["tag7", "tag8", "tag9"],
    vendor: "Vendor 3",
    price: 300,
    imageUrl: "https://test.com/image3.jpg",
    status: "ACTIVE",
  },
];

describe("Given the search engine", () => {
  describe("when calling the searchProducts function", () => {
    it("should return all products when the query is empty", () => {
      const results = searchProducts(products, "", ["title", "description", "tags"]);

      expect(results.length).toBe(3);
      expect(results.every((result) => result.score === 1)).toBe(true);
    });

    it("should return products regardless of case", () => {
      const results = searchProducts(products, "PRO", ["title", "description", "tags"]);

      expect(results.length).toBe(3);
    });

    it("should return the exact product when the query is the exact product title", () => {
      const results = searchProducts(products, "Product 1", ["title", "description", "tags"]);

      expect(results.length).toBe(1);
      expect(results[0].item.title).toBe("Product 1");
    });
  });
});
