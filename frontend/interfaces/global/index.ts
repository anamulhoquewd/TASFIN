export interface IPagination {
  page: number;
  total: number;
  limit: number;
  totalPages: number;
  nextPage: number | null;
  prevPage: number | null;
  sortBy: string;
  sortType: "asc" | "desc";
}

export interface IImage {
  alt: string;
  url: string;
}
