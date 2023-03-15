import { File } from "./file";

export interface Product {
  id?: number;
  name: string;
  price: number | 0;
  quantity: number | 0;
  createdBy?: number | null;
  images?: File[];
  document?: any;
}
