import { Product } from "./product";
import { User } from "./user";
import { Voucher } from "./voucher";

export interface order {
  id?: number;
  product?: Product;
  user?: User;
  quantity: number;
  totalPrice: number;
  voucher?:Voucher;
}
