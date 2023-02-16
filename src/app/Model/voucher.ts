export interface Voucher {
  id?: number;
  key: string;
  price: number;
  isValid: boolean;
  createdBy: number;
  validDate?: Date;
  isUsed: boolean;
}
