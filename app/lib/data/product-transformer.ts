import { Product, RawCSVRow } from "@/lib/types/product";

export const transformRawProducts = (rawProducts: RawCSVRow[]): Product[] => {
  return rawProducts
    .map((rawProduct) => {
      if (!rawProduct.ID) {
        return null;
      }
      return {
        id: rawProduct.ID,
        title: rawProduct.TITLE,
        vendor: rawProduct.VENDOR,
        description: rawProduct.BODY_HTML,
        tags: rawProduct.TAGS.split(", "),
        price: parseFloat(JSON.parse(rawProduct.PRICE_RANGE_V2).min_variant_price.amount),
        imageUrl: JSON.parse(rawProduct.FEATURED_IMAGE).url,
      };
    })
    .filter((p): p is Product => p !== null);
};
