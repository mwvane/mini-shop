import { Item } from "./item";

export interface SoldProduct {
  id?: number;
  productId?: number;
  productName: string;
  userId?: number;
  quantity: number;
  totalPrice: number;
  voucherPrice:number;
}
