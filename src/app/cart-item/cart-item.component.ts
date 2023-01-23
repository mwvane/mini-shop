import { Component } from '@angular/core';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  removeIcon = faRemove
  onDelete(){
    
  }
}
