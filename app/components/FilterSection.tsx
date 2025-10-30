"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronsUpDown, X } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type FilterSectionProps = {
  title: string;
  items: string[];
  selectedItems?: string[];
  limit?: number;
  onSelectionChange?: (selected: string[]) => void;
};

export default function FilterSection({ title, items, selectedItems = [], limit = 4, onSelectionChange }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const displayItems = items.slice(0, limit);

  const handleItemClick = (item: string) => {
    const newSelection = selectedItems.includes(item) ? selectedItems.filter((i) => i !== item) : [...selectedItems, item];

    onSelectionChange?.(newSelection);
  };

  const handleRemoveItem = (item: string) => {
    const newSelection = selectedItems.filter((i) => i !== item);
    onSelectionChange?.(newSelection);
  };

  return (
    <div className="flex flex-col gap-3 bg-white rounded-xl p-4 mx-1">
      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedItems.map((item) => (
            <Badge key={item} variant="secondary" className="flex items-center gap-1 pr-1">
              <span>{item}</span>
              <button
                onClick={() => handleRemoveItem(item)}
                className="ml-1 rounded-full hover:bg-black/10 p-0.5 transition-colors"
                aria-label={`Remove ${item}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-medium text-md">{title}</h2>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="flex flex-col gap-2 mt-2 overflow-hidden">
          {displayItems.map((item) => (
            <div
              key={item}
              onClick={() => handleItemClick(item)}
              className={`flex text-sm items-center gap-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-gray-100 ${
                selectedItems.includes(item) ? "bg-gray-50 font-medium" : ""
              }`}
            >
              {item}
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
