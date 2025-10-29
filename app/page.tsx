import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="flex justify-between items-center container mx-auto px-4 py-6">
          <div className="lg:flex hidden items-center gap-6">
            <Image src="/logo.png" alt="Healf Logo" width={50} height={50} className="rounded-2xl" />
            <h1 className="text-2xl font-bold">Wellness Products</h1>
          </div>
          <Image src="/logo.png" alt="Healf Logo" width={50} height={50} className="lg:hidden rounded-2xl" />
        </div>
      </header>

      {/* <SearchInterface products={products} /> */}
    </main>
  );
}
