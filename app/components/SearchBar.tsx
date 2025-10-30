"use client";

import { Input } from "@/components/ui/input";
import LordIcon from "@/components/LordIcon";

export default function SearchBar({ query, setQuery }: { query: string; setQuery: (query: string) => void }) {
  return (
    <div className="flex items-center gap-2 relative">
      <Input
        type="text"
        placeholder="Search products..."
        className="bg-white border border-gray-400 absolute left-0"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="absolute right-0 flex items-center justify-center pr-2">
        <LordIcon iconName="search" size={20} />
      </div>
    </div>
  );
}
