import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../item';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input() item: any
  @Output() addToCart = new EventEmitter()
  cartIcon = faCartShopping
  onAddToCart(){
    this.addToCart.emit()
  }
}
