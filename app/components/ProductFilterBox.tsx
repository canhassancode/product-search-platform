"use client";

import { useState } from "react";
import { FilterOptions } from "@/lib/types/filter";
import { Button } from "@/components/ui/button";
import FilterSection from "@/components/FilterSection";

type SelectedFilters = {
  vendors: string[];
  goals: string[];
  categories: string[];
};

export default function ProductFilterBox({ filterOptions }: { filterOptions: FilterOptions }) {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    vendors: [],
    goals: [],
    categories: [],
  });

  const handleVendorChange = (selected: string[]) => {
    setSelectedFilters((prev) => ({ ...prev, vendors: selected }));
  };

  const handleGoalChange = (selected: string[]) => {
    setSelectedFilters((prev) => ({ ...prev, goals: selected }));
  };

  const handleCategoryChange = (selected: string[]) => {
    setSelectedFilters((prev) => ({ ...prev, categories: selected }));
  };

  const handleClearAll = () => {
    setSelectedFilters({
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
