import { AudioBook } from "./AudioBook";
import { Book } from "./Book";
import { Dvd } from "./Dvd";
import { ReferenceBook } from "./ReferenceBook";

export interface Category {
  id: string;
  name: string;
  audioBook: AudioBook[];
  book: Book[];
  dvd: Dvd[];
  referenceBook: ReferenceBook[];
}
