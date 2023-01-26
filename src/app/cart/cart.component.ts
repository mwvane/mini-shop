import { Component, OnInit } from '@angular/core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { ItemService } from '../item.service';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartIcon = faCartShopping;
  homeIcon = faHome;
  cartItems: any = null;
  selectedQuantity: number = 1;
  loggedUser: any;
  constructor(private service: ItemService, private router:Router) {}
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
  onBackToHome(){
    this.router.navigateByUrl('home')
  }
}
