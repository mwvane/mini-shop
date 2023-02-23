import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';
import { Constants } from 'src/app/constants/constants';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-show-voucher',
  templateUrl: './show-voucher.component.html',
  styleUrls: ['./show-voucher.component.css'],
})
export class ShowVoucherComponent {
  @Input() data: any;
  @Input() openDialog: boolean = false;
  @Output() close = new EventEmitter();
  @Output() add = new EventEmitter();
  constructor(public modalService: ModalService){}
  onClose() {
    this.modalService.openProductModal = false;
  }
  onAdd() {
    this.add.emit();
  }
  dateFormat(date: any, format: string = Constants.DATE_FORMAT) {
    if (date) {
      return moment(date).format(format);
    }
    return null;
  }
}
