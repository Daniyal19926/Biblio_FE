import { Category } from "./Category";

export interface AudioBook {
  id: string;
  title: string;
  runTimeMinutes: number;
  type: string;
  isBorrowable?: Boolean;
  borrowerId?: String;
  categoryId: string;
  category: Category;
}
