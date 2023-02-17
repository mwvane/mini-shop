import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-show-voucher',
  templateUrl: './show-voucher.component.html',
  styleUrls: ['./show-voucher.component.css']
})
export class ShowVoucherComponent {
  @Input() data: any;
  @Input() openDialog: boolean = false;
  @Output() close = new EventEmitter();
  onClose() {
    this.close.emit();
    this.openDialog = false;
  }
}
