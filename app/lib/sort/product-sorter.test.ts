import { sortSearchResults } from "./product-sorter";
import type { SearchResult } from "@/lib/search/search-engine";
import type { Product } from "@/lib/types/product";

const mockProducts: Product[] = [
  {
    id: "1",
    title: "Product A",
    vendor: "Vendor A",
    description: "Description A",
    tags: ["tag1"],
    price: 50.0,
    imageUrl: "https://example.com/a.jpg",
    status: "ACTIVE",
  },
  {
    id: "2",
    title: "Product B",
    vendor: "Vendor B",
    description: "Description B",
    tags: ["tag2"],
    price: 30.0,
    imageUrl: "https://example.com/b.jpg",
    status: "ACTIVE",
  },
  {
    id: "3",
    title: "Product C",
    vendor: "Vendor C",
    description: "Description C",
    tags: ["tag3"],
    price: 80.0,
    imageUrl: "https://example.com/c.jpg",
    status: "ACTIVE",
  },
];

const mockSearchResults: SearchResult[] = [
  { item: mockProducts[0], score: 0.5, matches: [] },
  { item: mockProducts[1], score: 0.2, matches: [] },
  { item: mockProducts[2], score: 0.8, matches: [] },
];

describe("Given the product sorter", () => {
  describe("when calling the sortSearchResults function", () => {
    describe("and sorting by relevance", () => {
      it("should sort results by score in ascending order (lower score = more relevant)", () => {
        const sorted = sortSearchResults(mockSearchResults, "relevance");

        expect(sorted[0].item.id).toBe("2");
        expect(sorted[1].item.id).toBe("1");
        expect(sorted[2].item.id).toBe("3");
        expect(sorted[0].score).toBe(0.2);
      });

      it("should not mutate the original array", () => {
        const original = [...mockSearchResults];
        sortSearchResults(mockSearchResults, "relevance");

        expect(mockSearchResults).toEqual(original);
      });
    });

    describe("and sorting by price ascending", () => {
      it("should sort results by price from low to high", () => {
        const sorted = sortSearchResults(mockSearchResults, "price-asc");

        expect(sorted[0].item.price).toBe(30.0);
        expect(sorted[1].item.price).toBe(50.0);
        expect(sorted[2].item.price).toBe(80.0);
      });

      it("should not mutate the original array", () => {
        const original = [...mockSearchResults];
        sortSearchResults(mockSearchResults, "price-asc");

        expect(mockSearchResults).toEqual(original);
      });

      it("should handle products with the same price", () => {
        const samePrice: SearchResult[] = [
          { item: { ...mockProducts[0], price: 50.0 }, score: 0.5, matches: [] },
          { item: { ...mockProducts[1], price: 50.0 }, score: 0.2, matches: [] },
        ];

        const sorted = sortSearchResults(samePrice, "price-asc");

        expect(sorted[0].item.price).toBe(50.0);
        expect(sorted[1].item.price).toBe(50.0);
      });
    });

    describe("and sorting by price descending", () => {
      it("should sort results by price from high to low", () => {
        const sorted = sortSearchResults(mockSearchResults, "price-desc");

        expect(sorted[0].item.price).toBe(80.0);
        expect(sorted[1].item.price).toBe(50.0);
        expect(sorted[2].item.price).toBe(30.0);
      });

      it("should not mutate the original array", () => {
        const original = [...mockSearchResults];
        sortSearchResults(mockSearchResults, "price-desc");

        expect(mockSearchResults).toEqual(original);
      });

      it("should handle products with the same price", () => {
        const samePrice: SearchResult[] = [
          { item: { ...mockProducts[0], price: 50.0 }, score: 0.5, matches: [] },
          { item: { ...mockProducts[1], price: 50.0 }, score: 0.2, matches: [] },
        ];

        const sorted = sortSearchResults(samePrice, "price-desc");

        expect(sorted[0].item.price).toBe(50.0);
        expect(sorted[1].item.price).toBe(50.0);
      });
    });

    describe("and handling edge cases", () => {
      it("should handle empty array", () => {
        const sorted = sortSearchResults([], "relevance");

        expect(sorted).toEqual([]);
      });

      it("should handle single item", () => {
        const singleResult = [mockSearchResults[0]];
        const sorted = sortSearchResults(singleResult, "relevance");

        expect(sorted).toEqual(singleResult);
      });
    });
  });
});
