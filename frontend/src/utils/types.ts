export interface Book {
  _id: string;
  title: string;
  normalized_title?: string;
  description: string;
  author_id: {
    _id: string;
    name: string;
  };
  price: number;
  category_id: {
    _id: string;
    name: string;
  };
  rating?: number;
  no_of_pages: number;
  publication_year: number;
  stock: number;
  language: string;
  publisher: string;
  cover_image: string;
  createdAt: string;
  updatedAt: string;
}
