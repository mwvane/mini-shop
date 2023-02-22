import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { VoucherStatus } from 'src/app/enums/voucherStatus';
import { Voucher } from 'src/app/Model/voucher';
import { VoucherService } from 'src/app/service/voucher.service';

@Component({
  selector: 'app-generate-voucher',
  templateUrl: './generate-voucher.component.html',
  styleUrls: ['./generate-voucher.component.css'],
})
export class GenerateVoucherComponent{
  constructor(
    private voucherService: VoucherService,
    private msgService: ToastrService
  ) {}

  @Input() openDialog: boolean = false;
  @Input() data: Voucher = this.getDefaultVoucher()
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
    this.openDialog = false;
    this.close.emit();
  }

  onGenerateKey() {
    this.voucherService.generateKey().subscribe((data) => {
      if (data.res) {
        this.data.key = data.res.toString();
      }
    });
  }

  onValidateChange(value: any) {
    this.data.validDate = this.addDays(value.value);
  }

  onCopy() {
    navigator.clipboard.writeText(this.data.key);
    this.msgService.success('გასაღები დაკოპირდა');
  }

  private addDays(days: number) {
    let dateNow = new Date();
    let validate = new Date();
    validate.setDate(dateNow.getDate() + days);
    return validate;
  }

  getDefaultVoucher() {
    let voucher: Voucher = {
      price: 10,
      createdBy: 0,
      key: '',
      status: VoucherStatus.Valid,
      validDate: this.addDays(5),
    };
    return voucher;
  }
}
