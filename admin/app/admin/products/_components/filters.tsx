import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import useCategory from "../../categories/_hook/useCategory";

function Filters({
  search,
  setSearch,
  isItNew,
  setIsItNew,
  status,
  setStatus,
  featured,
  setFeatured,
  category,
  setCategory,
  custom,
  setCustom,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  isItNew: string;
  setIsItNew: React.Dispatch<React.SetStateAction<string>>;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  featured: string;
  setFeatured: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  custom: string;
  setCustom: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { categories } = useCategory();

  return (
    <div className="mb-6 space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search products by title or tags..."
          className="pl-8"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <Select value={isItNew} onValueChange={setIsItNew}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by new" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Newest & Oldest</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>

        <Select value={custom} onValueChange={setCustom}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by custom" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Custom</SelectItem>
            <SelectItem value="custom">Customizable</SelectItem>
            <SelectItem value="not-custom">Not Customizable</SelectItem>
          </SelectContent>
        </Select>

        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <Select value={featured} onValueChange={setFeatured}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by featured" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Products</SelectItem>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="not-featured">Not Featured</SelectItem>
          </SelectContent>
        </Select>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c._id} value={c._id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default Filters;
