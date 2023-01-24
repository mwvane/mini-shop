import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { ItemService } from '../item.service';
@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent {
  removeIcon = faRemove;
  maxQuantity: any = 100;
  @Input() cartItem: any;
  @Input() quantity: number = 1;
  @Output() remove = new EventEmitter()
  constructor(private service: ItemService) {}
  onDelete() {
    this.remove.emit()
  }
  onQuantityChange(quantity: number) {
    this.service.getItemQuantity(this.cartItem.item.id).subscribe((data) => {
      this.maxQuantity = data;
    });
    this.quantity = quantity;
    this.service.updateCartItemQuantity(this.cartItem.id, quantity).subscribe(data => {
      console.log(data)
    });
  }
}
