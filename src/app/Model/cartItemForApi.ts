export interface CartItemForApi {
  id?: number;
  productId?: number;
  quantity?: number | 0;
  totalPrice?: number | 0;
  voucherId?: number | null;
  voucherAmount?: number | 0;
  userId?: number;
}
