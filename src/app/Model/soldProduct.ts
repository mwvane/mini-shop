import { Item } from "./item";

export interface SoldProduct {
  id?: number;
  product?: Item;
  userId?: number;
  quantity: number;
  totalPrice: number;
}
