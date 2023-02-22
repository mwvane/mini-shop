export interface Voucher {
  id?: number;
  key: string;
  price: number;
  createdBy: number;
  validDate?: Date;
  status: 'valid' 
}
