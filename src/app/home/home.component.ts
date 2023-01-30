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
  items: any = [];
  loggedUser: any;
  cartItems: any = [];
  selectedQuantity: number = 1;
  isItemsLoading = true;
  isCartLoading = true;
  ngOnInit(): void {
    const user = localStorage.getItem('loggedUser');
    if (user) {
      this.loggedUser = JSON.parse(user);
      this.service.getAllItems().subscribe((data) => {
        this.items = data;
        this.isItemsLoading = false
        
      });
      this.service.getCartItems(this.loggedUser.id).subscribe((data) => {
        this.cartItems = data;
        this.isCartLoading = false;
      });
    } else {
      this.router.navigateByUrl('login');
    }
  }
  onAddToCart(item: any) {
    let result: any;
    this.service.addToCart(item, this.loggedUser.id).subscribe((data) => {
      result = data;
      if (!result.res) {
        alert(result.errors.join('\n'));
      } else {
        const newItem = {
          id: result.res,
          item: {id: item.id, name: item.name, price: item.price},
          quantity: 1
        }
        this.cartItems.unshift(newItem)
        item.quantity --
      }
    });
  }
  onCartItemChange(quantityInStock: number, item:any){
    for(let i of this.items)
    if(i.id === item.item.id){
      i.quantity = quantityInStock
      break
    }
  }
  onCartItemDelete(id: number) {
    this.service.deleteCartItem(id).subscribe((data) => {
      if (data) {
        for(let [index,cartItem] of this.cartItems.entries()){
          if(cartItem.id === id){
            for(let item of this.items){
              if(item.id === cartItem.item.id){
                item.quantity += cartItem.quantity
              }
            }
            this.cartItems.splice(index,1)
            break
          }
        }
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
  // admin---------------
  onRemoveItem(itemId: number) {
    let result: any;
    this.service.removeItem(itemId).subscribe((data) => {
      result = data;
      if (result.res) {
      }
    });
  }
  onEditItem(itemId: number) {
    console.log(itemId);
  }
  onAddItem() {}
}
