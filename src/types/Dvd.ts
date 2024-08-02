import { Category } from "./Category";

export interface Dvd {
  id: string;
  title: string;
  runTimeMinutes: number;
  type: string;
  category: Category;
  isBorrowable: Boolean;
  categoryId: string;
  borrowerId?: string;
}
