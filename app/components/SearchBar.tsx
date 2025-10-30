"use client";

import { Input } from "@/components/ui/input";
import LordIcon from "@/components/LordIcon";
import { motion } from "motion/react";

export default function SearchBar({ query, setQuery }: { query: string; setQuery: (query: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
      className="flex items-center gap-2 relative hover:scale-101 transform-all duration-200"
    >
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
    </motion.div>
  );
}
