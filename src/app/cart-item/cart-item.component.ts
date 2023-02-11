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
  @Output() remove = new EventEmitter();
  @Output() change = new EventEmitter();
  @Output() open = new EventEmitter();
  maxQuantity: any = 10;

  constructor(
    private service: ItemService,
    private msgService: ToastrService
  ) {}
  onDelete(e: Event) {
    e.stopPropagation();
    this.remove.emit();
  }
  onQuantityIncrease() {
    let result: any;
    console.log(this.cartItem);
    this.service
      .updateCartItemQuantity(this.cartItem.id, 1)
      .subscribe((data) => {
        result = data;
        if (result.res != null) {
          this.cartItem.quantity++;
          this.change.emit(result.res);
        } else {
          this.msgService.warning(result.errors.join('\n'));
        }
      });
  }
  onQuantityDecrease() {
    let result: any;
    this.service
      .updateCartItemQuantity(this.cartItem.id, -1)
      .subscribe((data) => {
        result = data;
        if (result.res != null) {
          this.cartItem.quantity--;
          this.change.emit(result.res);
        } else {
          this.msgService.warning(result.errors.join('\n'));
        }
      });
  }
  onItemClick() {
    this.open.emit(this.cartItem);
  }
}
