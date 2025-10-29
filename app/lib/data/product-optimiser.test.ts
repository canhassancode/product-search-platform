import { Product } from "@/lib/types/product";
import { optimiseProducts } from "./product-optimiser";

const unoptimisedProductsData: Product[] = [
  {
    id: "3",
    title: "Product 3",
    vendor: "Unknown",
    description:
      "This is a very long description for Product 3, giving extensive details about the product, its features, how it can be used, and why it stands out among competitors in its category. Designed and manufactured using the latest technology, Product 3 is made with lightweight materials, has an ergonomic shape, supports multiple international standards, ships worldwide, and comes with a comprehensive warranty. Available in the US, UK, and CA markets, with direct company support. (Internal code: P3-POPULAR)",
    tags: ["Mood Support", "goal:mood", "US", "UK", "CA", "_internal", "POPULAR", "2025_launch"],
    price: 38.55,
    imageUrl: "https://test.com/image3.jpg",
    status: "ACTIVE",
  },
  {
    id: "4",
    title: "Product 4",
    vendor: "Vendor 4",
    description:
      "This is a very long description for Product 4, giving extensive details about the product, its features, how it can be used, and why it stands out among competitors in its category. Designed and manufactured using the latest technology, Product 4 is made with lightweight materials, has an ergonomic shape, supports multiple international standards, ships worldwide, and comes with a comprehensive warranty. Available in the US, UK, and CA markets, with direct company support. (Internal code: P4-BESTSELLER)",
    tags: ["Thorne", "Stress and Anxiety", "goal:sleep", "US", "UK", "CA", "_internal", "BESTSELLER", "2024_launch", "1.0", "2.24asdasd"],
    price: 48.55,
    imageUrl: "https://test.com/image4.jpg",
    status: "ACTIVE",
  },
  {
    id: "5",
    title: "Product 5",
    vendor: "Vendor 5",
    description:
      "This is a very long description for Product 5, giving extensive details about the product, its features, how it can be used, and why it stands out among competitors in its category. Designed and manufactured using the latest technology, Product 5 is made with lightweight materials, has an ergonomic shape, supports multiple international standards, ships worldwide, and comes with a comprehensive warranty. Available in the US, UK, and CA markets, with direct company support. (Internal code: P5-NEW)",
    tags: ["Thorne", "Stress and Anxiety", "goal:sleep", "US", "UK", "CA", "_internal", "NEW", "2025_launch"],
    price: 58.55,
    imageUrl: "https://test.com/image5.jpg",
    status: "INACTIVE",
  },
];

describe("Given the product optimiser", () => {
  describe("when calling the optimiseProducts function", () => {
    it("should filter out inactive products", () => {
      const result = optimiseProducts(unoptimisedProductsData);

      expect(result.every((product) => product.status === "ACTIVE")).toBe(true);
    });

    it("should filter out products with invalid image URLs", () => {
      const result = optimiseProducts(unoptimisedProductsData);

      expect(
        result.every(
          (product) => product.imageUrl && product.imageUrl.trim() !== "" && product.imageUrl !== "null" && product.imageUrl !== "undefined"
        )
      ).toBe(true);
    });

    it("should reduce description length to be max 200 characters", () => {
      const result = optimiseProducts(unoptimisedProductsData);

      expect(result[0].description).toBe(
        "This is a very long description for Product 3, giving extensive details about the product, its features, how it can be used, and why it stands out among competitors in its category. Designed and ma..."
      );
      expect(result.every((product) => product.description.length <= 200)).toBe(true);
    });

    it("should filter out undesired tags", () => {
      const result = optimiseProducts(unoptimisedProductsData);

      expect(result[1].tags).toEqual(["Thorne", "Stress and Anxiety", "goal:sleep"]);
    });
  });
});
