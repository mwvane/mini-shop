import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  removeIcon = faRemove
  @Input() cartItem:any
  @Input() quantity:number = 1
  onDelete(){
    
  }
  onQuantityChange(quantity:number){
    this.quantity = quantity
  }
}
