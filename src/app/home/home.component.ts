import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';
import { faCartShopping, faAdd } from '@fortawesome/free-solid-svg-icons';
import { Item } from '../Model/item';
import { CartItem } from '../Model/cartItem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private service: ItemService, private router: Router) {}
  cartIcon = faCartShopping;
  addIcon = faAdd;
  items: Item[] = [];
  loggedUser: any;
  cartItems: CartItem[] = [];
  isItemsLoading = true;
  isCartLoading = true;
  ngOnInit(): void {
    const user = localStorage.getItem('loggedUser');
    if (user) {
      this.loggedUser = JSON.parse(user);
      console.log(this.loggedUser.role)
      this.loadItems();
      this.loadCartItems();
    } else {
      this.router.navigateByUrl('login');
    }
  }
  onAddToCart(item: Item) {
    this.service.addToCart(item, this.loggedUser.id).subscribe((data) => {
      if (!data.res) {
        alert(data.errors.join('\n'));
      } else {
        const newItem: CartItem = {
          id: Number(data.res),
          item: item,
          quantity: 1,
          user: this.loggedUser,
        };
        this.cartItems.unshift(newItem);
        item.quantity--;
      }
    });
  }
  onCartItemChange(quantityInStock: number, item: any) {
    for (let i of this.items)
      if (i.id === item.item.id) {
        i.quantity = quantityInStock;
        break;
      }
  }
  onCartItemDelete(id?: number) {
    if (id) {
      this.service.deleteCartItem(id).subscribe((data) => {
        if (data) {
          this.cartItems = this.cartItems.filter((item) => item.id != id);
          this.loadItems()
        }
      });
    }
  }
  onLogout() {
    localStorage.removeItem('loggedUser');
    this.router.navigateByUrl('login');
  }
  // admin---------------
  onRemoveItem(itemId: number) {
    debugger
    this.service.removeItem(itemId).subscribe((data) => {
      if (data.res) {
        this.items = this.items.filter((item) => item.id != itemId);
        this.loadCartItems();
      }
    });
  }
  onEditItem(itemId: number) {
    this.router.navigate(['editItem/', itemId])
  }
  onCreateItem() {
    this.router.navigateByUrl('editItem/');
  }
  loadCartItems() {
    this.isCartLoading = true;
    this.service.getCartItems(this.loggedUser.id).subscribe((data) => {
      this.cartItems = data;
      this.isCartLoading = false;
    });
  }
  loadItems() {
    this.isItemsLoading = true;
    this.service.getAllItems().subscribe((data) => {
      this.items = data;
      this.isItemsLoading = false;
    });
  }
}
