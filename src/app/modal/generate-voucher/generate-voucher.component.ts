import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { VoucherStatus } from 'src/app/enums/voucherStatus';
import { Voucher } from 'src/app/Model/voucher';
import { VoucherService } from 'src/app/service/voucher.service';
import * as moment from 'moment';
import { Constants } from 'src/app/constants/constants';
import { Helper } from 'src/app/helpers/helper';
import { ModalService } from 'src/app/service/modal.service';
@Component({
  selector: 'app-generate-voucher',
  templateUrl: './generate-voucher.component.html',
  styleUrls: ['./generate-voucher.component.css'],
})
export class GenerateVoucherComponent {
  constructor(
    private voucherService: VoucherService,
    private msgService: ToastrService,
    public modalService: ModalService,
  ) {}

  @Input() openDialog: boolean = false;
  @Input() data: Voucher = Constants.DEAFULT_VOUCHER;
  @Output() submit = new EventEmitter();
  @Output() close = new EventEmitter();
  submitted: boolean = false;
  roles: string[] = ['admin', 'user', 'seller'];
  days: any = [5, 10, 15, 20, 25, 30];

  onSubmit() {
    this.submitted = true;
    this.submit.emit(this.data);
  }

  onClose() {
    this.modalService.openGenerateVoucherModal = false
  }

  onGenerateKey() {
    this.voucherService.generateKey().subscribe((data) => {
      if (data.res) {
        this.data.key = data.res.toString();
      }
    });
  }

  onValidateChange(value: any) {
    this.data.validDate = Helper.getDateAfter(value.value);
  }

  onCopy() {
    navigator.clipboard.writeText(this.data.key);
    this.msgService.success('გასაღები დაკოპირდა');
  }
  dateFormat(date: any, format: string = Constants.DATE_FORMAT) {
    return moment(date).format(format);
  }
}
