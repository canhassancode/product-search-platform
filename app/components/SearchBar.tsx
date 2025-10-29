import { Input } from "@/components/ui/input";

export default function SearchBar({ query, setQuery }: { query: string; setQuery: (query: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <Input type="text" placeholder="Search products" className="bg-white" value={query} onChange={(e) => setQuery(e.target.value)} />
    </div>
  );
}
