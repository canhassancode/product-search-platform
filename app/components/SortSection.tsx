import LordIcon from "./LordIcon";
import { Button } from "./ui/button";
import { useRef } from "react";
import type { LordIconRef } from "./LordIcon";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { type SortOption, SORT_OPTIONS } from "@/lib/types/sort";

type SortSectionProps = {
  currentSort: SortOption;
  onSortChange: (option: SortOption) => void;
};

export default function SortSection({ currentSort, onSortChange }: SortSectionProps) {
  const sortIconRef = useRef<LordIconRef>(null);

  const handleSortIconHover = () => {
    sortIconRef.current?.play();
  };

  const currentSortLabel = SORT_OPTIONS.find((option) => option.value === currentSort)?.label || "Relevance";

  return (
    <div className="px-4 w-full items-right justify-end text-right">
      <div className="pb-4 flex justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2 cursor-pointer" onMouseEnter={handleSortIconHover}>
              <LordIcon iconName="sort" size={20} ref={sortIconRef} />
              Sort by: {currentSortLabel}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuRadioGroup value={currentSort} onValueChange={(value) => onSortChange(value as SortOption)}>
              {SORT_OPTIONS.map((option) => (
                <DropdownMenuRadioItem key={option.value} value={option.value}>
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="border-b-2 border-gray-200 w-full" />
    </div>
  );
}
