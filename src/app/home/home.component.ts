import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private service: ItemService, private router: Router) {}
  cartIcon = faCartShopping;
  items: any;
  loggedUser: any;
  cartItemCount: any = 0;
  ngOnInit(): void {
    const user = localStorage.getItem('loggedUser');
    if (user) {
      this.loggedUser = JSON.parse(user);
      this.service.getAllItems().subscribe((data) => {
        this.items = data;
      });
      this.service.getCartItemsCount(this.loggedUser.id).subscribe((data) => {
        this.cartItemCount = data;
      });
    } else {
      this.router.navigateByUrl('login');
    }
  }
  onAddToCart(item: any) {
    let result: any;
    this.service.addToCart(item, this.loggedUser.id, 1).subscribe((data) => {
      result = data;
      if (!result.res) {
        alert(result.errors.join('\n'));
      } else {
        this.cartItemCount++
      }
    });
  }
  onLogout() {
    localStorage.removeItem('loggedUser');
    this.router.navigateByUrl('login');
  }
  onCart() {
    this.router.navigateByUrl('cart');
  }
}
