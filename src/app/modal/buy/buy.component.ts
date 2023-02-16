import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from 'src/app/Model/cartItem';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css'],
})
export class BuyComponent {
  @Input() data: any;
  @Input() openDialog: boolean = false;
  @Output() increaseQuantity = new EventEmitter();
  @Output() decreaseQuantity = new EventEmitter();
  @Output() checkVoucherKey = new EventEmitter();
  @Output() submit = new EventEmitter();
  @Output() close = new EventEmitter();
  onIncrease() {
    this.increaseQuantity.emit();
  }
  onDecrease() {
    this.decreaseQuantity.emit();
  }
  onCheckKey(key:string) {
    this.checkVoucherKey.emit(key);
  }
  onSubmit() {
    this.submit.emit();
    this.onClose()
  }
  onClose() {
    this.close.emit();
    this.openDialog = false;
  }
}
