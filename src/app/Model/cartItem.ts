import { Product } from './product';
import { User } from './user';
import { Voucher } from './voucher';

export interface CartItem {
  id?: number;
  product?: Product;
  quantity: number;
  totalPrice: number;
  voucher?: Voucher;
  voucherAmount: number | 0;
  user?: User;
}
