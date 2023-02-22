import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';
import { Constants } from 'src/app/constants/constants';

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
  onClose() {
    this.close.emit();
    this.openDialog = false;
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
