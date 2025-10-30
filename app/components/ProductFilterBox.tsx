"use client";

import { useRef } from "react";
import type { FilterOptions } from "@/lib/types/filter";
import { Button } from "@/components/ui/button";
import FilterSection from "@/components/FilterSection";
import LordIcon, { type LordIconRef } from "@/components/LordIcon";
import { motion } from "motion/react";

type ProductFilterBoxProps = {
  filterOptions: FilterOptions;
  selectedFilters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
};

export default function ProductFilterBox({ filterOptions, selectedFilters, onFilterChange }: ProductFilterBoxProps) {
  const filterIconRef = useRef<LordIconRef>(null);
  const clearAllIconRef = useRef<LordIconRef>(null);
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

  const handleFilterIconHover = () => {
    filterIconRef.current?.play();
  };

  const handleClearAllIconHover = () => {
    clearAllIconRef.current?.play();
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.3 }}
        className="flex justify-between items-center p-4"
      >
        <div className="flex items-center gap-2">
          <div onMouseEnter={handleFilterIconHover} className="flex items-center justify-center">
            <LordIcon ref={filterIconRef} iconName="filter" size={20} />
          </div>
          <h1>Filter</h1>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer hover:scale-101"
          onClick={handleClearAll}
          onMouseEnter={handleClearAllIconHover}
        >
          <LordIcon iconName="clear" size={20} ref={clearAllIconRef} />
          <span>Clear all</span>
        </Button>
      </motion.div>
      <div className="flex flex-col gap-2">
        <FilterSection
          title="Vendors"
          items={filterOptions.vendors}
          selectedItems={selectedFilters.vendors}
          iconName="vendors"
          limit={10}
          onSelectionChange={handleVendorChange}
        />
        <FilterSection
          title="Goals"
          items={filterOptions.goals}
          selectedItems={selectedFilters.goals}
          iconName="goals"
          limit={10}
          onSelectionChange={handleGoalChange}
        />
        <FilterSection
          title="Categories"
          items={filterOptions.categories}
          selectedItems={selectedFilters.categories}
          iconName="category"
          limit={10}
          onSelectionChange={handleCategoryChange}
        />
      </div>
    </div>
  );
}
