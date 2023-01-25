import { Component, OnInit } from '@angular/core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartIcon = faCartShopping;
  cartItems: any;
  selectedQuantity: number = 1;
  loggedUser: any;
  constructor(private service: ItemService) {}
  ngOnInit(): void {
    const user = localStorage.getItem('loggedUser');
    if (user) {
      this.loggedUser = JSON.parse(user);
    }
    this.service.getCartItems(this.loggedUser.id).subscribe((data) => {
      this.cartItems = data;
    });
  }
  onDelete(id: number) {
    this.service.deleteCartItem(id).subscribe((data) => {
      if (data) {
        this.service.getCartItems(this.loggedUser.id).subscribe((data) => {
          this.cartItems = data;
        });
      }
    });
  }
}
