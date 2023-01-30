import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { ItemService } from '../item.service';
@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent {
  removeIcon = faRemove;
  @Input() cartItem: any;
  @Output() remove = new EventEmitter();
  @Output() change = new EventEmitter()
  maxQuantity: any = 10;

  constructor(private service: ItemService) {}
  onDelete() {
    this.remove.emit();
  }
  onQuantityIncrease() {
    let result: any;
    console.log(this.cartItem)
    this.service
      .updateCartItemQuantity(this.cartItem.id, 1)
      .subscribe((data) => {
        result = data;
        if (result.res != null) {
          this.cartItem.quantity++;
          this.change.emit(result.res)
        } else {
          alert(result.errors.join('\n'));
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
          this.change.emit(result.res)
        } else {
          alert(result.errors.join('\n'));
        }
      });
  }
}
