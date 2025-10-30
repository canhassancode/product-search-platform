import LordIcon from "./LordIcon";

export default function NoProductsFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 lg:py-48 text-center">
      <LordIcon iconName="search" size={48} />
      <p className="text-gray-800 font-medium">No products found</p>
      <p className="text-gray-500">
        Try adjusting your filters or search query. If you&apos;re looking for a specific product, you can search for it by name or description.
      </p>
    </div>
  );
}
