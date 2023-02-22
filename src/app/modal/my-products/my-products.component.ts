import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { Constants } from 'src/app/constants/constants';
import { VoucherStatus } from 'src/app/enums/voucherStatus';
import { Voucher } from 'src/app/Model/voucher';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css'],
})
export class MyProductsComponent {
  @Input() openDialog: boolean = false;
  @Input() data: any;
  @Input() voucher: Voucher = {key:"", price: 0, createdBy: 0, status: VoucherStatus.Valid}
  @Output() close = new EventEmitter();
  // product: any;
  onClose() {
    this.openDialog = false;
    this.close.emit();
  }
  dateFormat(date: any, format: string = Constants.DATE_FORMAT) {
    if(date){
      return moment(date).format(format);
    }
    return null
  }
}
