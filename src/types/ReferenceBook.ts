import { Category } from "./Category";

export interface ReferenceBook {
  id: string;
  title: string;
  author: string;
  nbrPages: number;
  category: Category;
  type: string;
  isBorrowable: Boolean;
}
