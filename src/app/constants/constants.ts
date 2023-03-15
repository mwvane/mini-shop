import { VoucherStatus } from '../enums/voucherStatus';
import { Helper } from '../helpers/helper';
import { Product } from '../Model/product';
import { Voucher } from '../Model/voucher';

export class Constants {
  public static DATE_FORMAT: string = 'LLL';

  public static DEAFULT_VOUCHER: Voucher = {
    createdBy: 0,
    key: '',
    price: 10,
    status: VoucherStatus.Valid,
    validDate: Helper.getDateAfter(5),
  };
  public static DEFAULT_PRODUCT: Product = {
    name: '',
    price: 0,
    quantity: 0,
  };
}
