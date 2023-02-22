import { VoucherStatus } from '../enums/voucherStatus';
import { Helper } from '../helpers/helper';
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


}
