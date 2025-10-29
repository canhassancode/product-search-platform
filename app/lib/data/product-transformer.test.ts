import { Product, RawCSVRow } from "@/lib/types/product";
import { transformRawProducts } from "./product-transformer";

const rawProductRowData: RawCSVRow[] = [
  {
    ID: null,
    TITLE: "Product 1",
    VENDOR: "Vendor 1",
    BODY_HTML: "Body HTML 1",
    TAGS: "tag1, tag2, tag3",
    PRICE_RANGE_V2: '{"min_variant_price":{"amount":18.55}}',
    FEATURED_IMAGE: '{"url":"https://test.com/image1.jpg"}',
    STATUS: "ACTIVE",
  },
  {
    ID: "2",
    TITLE: null,
    VENDOR: "Vendor 2",
    BODY_HTML: "Body HTML 2",
    TAGS: "tag4, tag5, tag6",
    PRICE_RANGE_V2: '{"min_variant_price":{"amount":28.55}}',
    FEATURED_IMAGE: '{"url":"https://test.com/image2.jpg"}',
    STATUS: "INACTIVE",
  },
  {
    ID: "3",
    TITLE: "Product 3",
    VENDOR: "",
    BODY_HTML: "Body HTML 3",
    TAGS: "tag7, tag8, tag9",
    PRICE_RANGE_V2: '{"min_variant_price":{"amount":38.55}}',
    FEATURED_IMAGE: '{"url":"https://test.com/image3.jpg"}',
    STATUS: "ACTIVE",
  },
  {
    ID: "4",
    TITLE: "Product 4",
    VENDOR: "Vendor 4",
    BODY_HTML: "<p>Hello <strong>world</strong>!</p>",
    TAGS: "tag10, tag11, tag12",
    PRICE_RANGE_V2: '{"min_variant_price":{"amount":48.55}}',
    FEATURED_IMAGE: '{"url":"https://test.com/image4.jpg"}',
    STATUS: "ACTIVE",
  },
  {
    ID: "5",
    TITLE: "Product 5",
    VENDOR: "Vendor 5",
    BODY_HTML: "<p>Hello <strong>world</strong>!</p>",
    TAGS: "tag13, tag14, tag15",
    PRICE_RANGE_V2: '{"min_variant_price":{"amount":58.55}}',
    FEATURED_IMAGE: '{"url":"https://test.com/image5.jpg"}',
    STATUS: "INACTIVE",
  },
];

const expectedProducts: Product[] = [
  {
    id: "3",
    title: "Product 3",
    vendor: "Unknown",
    description: "Body HTML 3",
    tags: ["tag7", "tag8", "tag9"],
    price: 38.55,
    imageUrl: "https://test.com/image3.jpg",
    status: "ACTIVE",
  },
  {
    id: "4",
    title: "Product 4",
    vendor: "Vendor 4",
    description: "Hello world!",
    tags: ["tag10", "tag11", "tag12"],
    price: 48.55,
    imageUrl: "https://test.com/image4.jpg",
    status: "ACTIVE",
  },
  {
    id: "5",
    title: "Product 5",
    vendor: "Vendor 5",
    description: "Hello world!",
    tags: ["tag13", "tag14", "tag15"],
    price: 58.55,
    imageUrl: "https://test.com/image5.jpg",
    status: "INACTIVE",
  },
];

describe("Given the product transformer", () => {
  describe("when calling the transformRawProducts function", () => {
    describe("and filtering products with missing required fields", () => {
      it("should exclude products with null ID", () => {
        const result = transformRawProducts(rawProductRowData);

        const productsWithNullId = result.filter((product) => !product.id);

        expect(productsWithNullId).toHaveLength(0);
        expect(result.every((product) => product.id)).toBe(true);
      });

      it("should exclude products with null TITLE", () => {
        const result = transformRawProducts(rawProductRowData);

        const productsWithNullTitle = result.filter((product) => !product.title);
        expect(productsWithNullTitle).toHaveLength(0);

        expect(result.every((product) => product.title)).toBe(true);
      });

      it("should handle products with empty VENDOR by setting to 'Unknown'", () => {
        const result = transformRawProducts(rawProductRowData);

        const productsWithEmptyVendor = result.filter((product) => product.vendor === "");
        expect(productsWithEmptyVendor).toHaveLength(0);

        expect(result.every((product) => product.vendor && product.vendor.length > 0)).toBe(true);
      });

      it("should strip HTML from the description and normalise", () => {
        const result = transformRawProducts(rawProductRowData);

        const productWithStrippedHtml = result.filter((product) => product.description === "Hello world!");
        expect(productWithStrippedHtml).toHaveLength(2);
      });
    });

    describe("and validating transformed data structure", () => {
      it("should return the expected products", () => {
        const result = transformRawProducts(rawProductRowData);

        expect(result).toEqual(expectedProducts);
      });
    });
  });
});
