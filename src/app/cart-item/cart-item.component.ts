import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemService } from '../service/item.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent {
  @Input() cartItem: any;
  @Input() voucherPrice: number = 0;
  @Output() remove = new EventEmitter();
  @Output() open = new EventEmitter();
  @Output() decrease = new EventEmitter();
  @Output() increase = new EventEmitter();
  maxQuantity: any = 10;
  onDelete(e: Event) {
    e.stopPropagation();
    this.remove.emit();
  }
  onQuantityIncrease() {
    this.increase.emit();
  }
  onQuantityDecrease() {
    this.decrease.emit();
  }
  onItemClick() {
    this.open.emit(this.cartItem);
  }
}
