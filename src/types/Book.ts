import { Category } from "./Category";

export interface Book {
  id: string;
  title: string;
  author: string;
  nbrPages: number;
  type: string;
  isBorrowable: Boolean;
  borrowerId?: string;
  categoryId: string;
  category: Category;
}
