import { Product } from "@/lib/types/product";
import { extractFilterOptions } from "./filter-extractor";

const products: Product[] = [
  {
    id: "1",
    title: "Thorne Stress Support Formula",
    description: "Supports healthy stress response and promotes relaxation",
    tags: ["goal:Stress and Anxiety", "Supplements", "Mood support", "Vitamins & Supplements", "Skincare", "Suncare"],
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
    tags: ["goal:Sleep Quality", "Supplements", "Sleep", "Body Care", "Hair Care"],
    vendor: "Nature's Way",
    price: 18.5,
    imageUrl: "https://example.com/sleep.jpg",
    status: "ACTIVE",
  },
];

describe("Given the filter extractor", () => {
  describe("when calling the extractFilterOptions function", () => {
    it("should extract vendors from the products", () => {
      const filters = extractFilterOptions(products);
      expect(filters.vendors).toEqual(["Coola", "Nature's Way", "Thorne"]);
    });

    it("should extract goals from the products", () => {
      const filters = extractFilterOptions(products);
      expect(filters.goals).toEqual(["Sleep Quality", "Stress and Anxiety"]);
    });

    it("should extract categories from the products", () => {
      const filters = extractFilterOptions(products);
      expect(filters.categories).toEqual([
        "Body Care",
        "Hair Care",
        "Mood support",
        "SPF",
        "Skincare",
        "Sleep",
        "Suncare",
        "Supplements",
        "Vitamins & Supplements",
      ]);
    });
  });
});
