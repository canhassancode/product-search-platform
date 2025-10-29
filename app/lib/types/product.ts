export type Product = {
  id: string;
  title: string;
  vendor: string;
  description: string;
  tags: string[];
  price: number;
  imageUrl: string;
  status: string;
};

export interface RawCSVRow {
  ID: string | null;
  TITLE: string | null;
  VENDOR: string;
  BODY_HTML: string;
  TAGS: string;
  PRICE_RANGE_V2: string;
  FEATURED_IMAGE: string;
  STATUS: string;
  [key: string]: string | null | undefined;
}
