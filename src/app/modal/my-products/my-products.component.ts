import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { Constants } from 'src/app/constants/constants';
import { VoucherStatus } from 'src/app/enums/voucherStatus';
import { Voucher } from 'src/app/Model/voucher';
import { ModalService } from 'src/app/service/modal.service';

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

  constructor(public modalService: ModalService){}
  // product: any;
  onClose() {
    this.modalService.openMyOrdersModal = false
  }
  dateFormat(date: any, format: string = Constants.DATE_FORMAT) {
    if(date){
      return moment(date).format(format);
    }
    return null
  }
}
