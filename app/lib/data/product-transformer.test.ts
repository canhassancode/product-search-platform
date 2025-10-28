import { Product, RawCSVRow } from "@/lib/types/product";
import { transformRawProducts } from "./product-transformer";

describe("Given the product transformer", () => {
  describe("when calling the transformRawProducts function", () => {
    describe("and the products have no ID", () => {
      const rawProductRowData: RawCSVRow[] = [
        {
          ID: null,
          TITLE: "Product 1",
          VENDOR: "Vendor 1",
          BODY_HTML: "Body HTML 1",
          TAGS: "tag1, tag2, tag3",
          PRICE_RANGE_V2: '{"min_variant_price":{"amount":18.55}}',
          FEATURED_IMAGE: '{"url":"https://test.com/image1.jpg"}',
          STATUS: "active",
        },
        {
          ID: "2",
          TITLE: "Product 2",
          VENDOR: "Vendor 2",
          BODY_HTML: "Body HTML 2",
          TAGS: "tag4, tag5, tag6",
          PRICE_RANGE_V2: '{"min_variant_price":{"amount":28.55}}',
          FEATURED_IMAGE: '{"url":"https://test.com/image2.jpg"}',
          STATUS: "active",
        },
      ];
      const transformedProducts: Product[] = [
        {
          id: "2",
          title: "Product 2",
          vendor: "Vendor 2",
          description: "Body HTML 2",
          tags: ["tag4", "tag5", "tag6"],
          price: 28.55,
          imageUrl: "https://test.com/image2.jpg",
        },
      ];

      it("should return only products with an ID", () => {
        const result = transformRawProducts(rawProductRowData);

        expect(result).toEqual(transformedProducts);
      });
    });
  });
});
