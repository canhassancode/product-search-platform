"use client";

import type { FilterOptions } from "@/lib/types/filter";
import { Button } from "@/components/ui/button";
import FilterSection from "@/components/FilterSection";

type ProductFilterBoxProps = {
  filterOptions: FilterOptions;
  selectedFilters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
};

export default function ProductFilterBox({ filterOptions, selectedFilters, onFilterChange }: ProductFilterBoxProps) {
  const handleVendorChange = (selected: string[]) => {
    onFilterChange({ ...selectedFilters, vendors: selected });
  };

  const handleGoalChange = (selected: string[]) => {
    onFilterChange({ ...selectedFilters, goals: selected });
  };

  const handleCategoryChange = (selected: string[]) => {
    onFilterChange({ ...selectedFilters, categories: selected });
  };

  const handleClearAll = () => {
    onFilterChange({
      vendors: [],
      goals: [],
      categories: [],
    });
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex justify-between items-center p-4">
        <h1>Filter</h1>
        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer hover:scale-101 hover:bg-black hover:text-white transition-all duration-200"
          onClick={handleClearAll}
        >
          Clear all
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <FilterSection
          title="Vendors"
          items={filterOptions.vendors}
          selectedItems={selectedFilters.vendors}
          limit={10}
          onSelectionChange={handleVendorChange}
        />
        <FilterSection
          title="Goals"
          items={filterOptions.goals}
          selectedItems={selectedFilters.goals}
          limit={10}
          onSelectionChange={handleGoalChange}
        />
        <FilterSection
          title="Categories"
          items={filterOptions.categories}
          selectedItems={selectedFilters.categories}
          limit={10}
          onSelectionChange={handleCategoryChange}
        />
      </div>
    </div>
  );
}
