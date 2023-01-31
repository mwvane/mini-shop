import { Item } from './item';
import { User } from './user';

export interface CartItem {
  id?: number;
  item: Item;
  quantity: number;
  user: User;
}
