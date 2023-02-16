import { Item } from './item';
import { User } from './user';

export interface CartItem {
  id?: number;
  itemId?: number;
  quantity: number;
  totalPrice: number;
  voucherPrice: number;
  userId?: number;
}
