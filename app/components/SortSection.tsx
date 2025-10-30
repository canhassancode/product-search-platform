import LordIcon from "./LordIcon";
import { Button } from "./ui/button";
import { useRef } from "react";
import type { LordIconRef } from "./LordIcon";

export default function SortSection() {
  const sortIconRef = useRef<LordIconRef>(null);

  const handleSortIconHover = () => {
    sortIconRef.current?.play();
  };

  return (
    <div className="px-4 w-full items-right justify-end text-right">
      <div className="pb-4 flex justify-between">
        <Button variant="outline" size="sm" className="flex items-center gap-2 cursor-pointer" onMouseEnter={handleSortIconHover}>
          <LordIcon iconName="sort" size={20} ref={sortIconRef} />
          Sort by: Popularity
        </Button>
      </div>
      <div className="border-b-2 border-gray-200 w-full" />
    </div>
  );
}
