export interface IPagination {
  page: number;
  total: number;
  totalPages: number;
  nextPage: number | null;
  prevPage: number | null;
}

export interface IImage {
  url: string;
  publicId: string;
  position: number;
  isPrimary?: boolean;
}
