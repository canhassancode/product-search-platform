import { FilterOptions } from "@/lib/types/filter";

export default function ProductFilterBox({ filterOptions }: { filterOptions: FilterOptions }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <h1 className="p-4">Filter</h1>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 bg-white rounded-xl p-4 mx-1">
          <h2 className="font-medium text-sm">Vendors</h2>
          {filterOptions.vendors.map((vendor) => (
            <div key={vendor} className="flex items-center gap-2">
              {vendor}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 bg-white rounded-xl p-4 mx-1">
          <h2 className="font-medium text-sm">Goals</h2>
          {filterOptions.goals.map((goal) => (
            <div key={goal} className="flex items-center gap-2">
              {goal}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 bg-white rounded-xl p-4 mx-1">
          <h2 className="font-medium text-sm">Categories</h2>
          {filterOptions.categories.map((category) => (
            <div key={category} className="flex items-center gap-2">
              {category}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
