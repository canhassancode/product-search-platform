import { Product, RawCSVRow } from "@/lib/types/product";

export function transformRawProducts(rawProductRows: RawCSVRow[]): Product[] {
  return rawProductRows
    .map((rawProduct) => {
      return transformSingleProductRow(rawProduct);
    })
    .filter((p): p is Product => p !== null);
}

function transformSingleProductRow(rawProductRow: RawCSVRow): Product | null {
  try {
    const { ID, TITLE, VENDOR, BODY_HTML, TAGS, PRICE_RANGE_V2, FEATURED_IMAGE, STATUS } = rawProductRow;

    if (!ID || !TITLE) {
      return null;
    }

    return {
      id: ID,
      title: TITLE.trim(),
      vendor: VENDOR?.trim() || "Unknown",
      description: stripHtml(BODY_HTML || ""),
      tags: parseTags(TAGS),
      price: parsePrice(PRICE_RANGE_V2),
      imageUrl: parseImage(FEATURED_IMAGE) ?? "",
      status: STATUS || "ACTIVE",
    };
  } catch {
    return null;
  }
}

function parseTags(tagsString?: string): string[] {
  if (!tagsString) return [];
  return tagsString.split(",").map((t) => t.trim());
}

function stripHtml(htmlString: string): string {
  return htmlString
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\s+([.!?])/g, "$1")
    .trim();
}

function parsePrice(priceJson?: string): number {
  try {
    const parsed = JSON.parse(priceJson || "{}");
    return parseFloat(parsed.min_variant_price?.amount || "0");
  } catch {
    return 0;
  }
}

function parseImage(imageJson: string): string | null {
  try {
    const parsed = JSON.parse(imageJson || "{}");
    return parsed.url || null;
  } catch {
    return null;
  }
}
