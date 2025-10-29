import { Suspense } from "react";
import { loadProducts } from "@/lib/data/product-loader";
import { ProductSearchPage } from "@/components/ProductSearchPage";

function SearchLoading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="flex justify-between items-center container mx-auto px-4 py-6">
          <div className="lg:flex hidden items-center gap-6">
            <div className="w-[50px] h-[50px] bg-gray-200 rounded-2xl animate-pulse"></div>
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="w-[50px] h-[50px] bg-gray-200 rounded-2xl lg:hidden animate-pulse"></div>
          <div className="h-10 w-64 lg:w-96 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-600 mx-auto"></div>
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    </main>
  );
}

async function ProductsContent() {
  const products = await loadProducts("app/lib/data/products.csv");

  return <ProductSearchPage products={products.slice(11, 30)} />;
}

export default function Home() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <ProductsContent />
    </Suspense>
  );
}
