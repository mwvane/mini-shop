import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';
import { Item } from '../Model/item';
import { CartItem } from '../Model/cartItem';
import { LoginRegisterService } from '../login-register.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ConfirmationService],
})
export class HomeComponent implements OnInit {
  constructor(
    private service: ItemService,
    private authService: LoginRegisterService,
    private router: Router,
    private dialog: ConfirmationService,
    private msgService: ToastrService
  ) {}
  items: Item[] = [];
  loggedUser: any;
  cartItems: CartItem[] = [];
  isItemsLoading = true;
  isCartLoading = true;
  ngOnInit(): void {
    const user = this.authService.userPayload;
    if (user) {
      this.loggedUser = user;
      this.loadItems();
      this.loadCartItems();
    }
  }
  onAddToCart(item: Item) {
    this.service.addToCart(item, this.loggedUser.id).subscribe((data) => {
      if (!data.res) {
        this.msgService.warning(data.errors.join('\n'));
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
    debugger
    this.dialog.confirm({
      message: 'ნამდვილად გინდათ კალათიდან პროდუქტის წაშლა?',
      header: 'კალათიდან პროდუქტის წაშლა',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (id) {
          this.service.deleteCartItem(id).subscribe((data) => {
            if (data) {
              this.cartItems = this.cartItems.filter((item) => item.id != id);
              this.msgService.success('პრდუქტი, კალათიდან წარმატებით წაიშალა');
              this.loadItems();
            }
          });
        }
      },
    });
  }
  onLogout() {
    this.dialog.confirm({
      message: 'ნამდვილად გსურთ გასვლა?',
      header: 'გასვლა',
      icon: 'pi pi-question',
      accept: () => {
        this.authService.logOut();
        this.router.navigateByUrl('login');
      },
    });
  }
  // admin---------------
  onRemoveItem(itemId: number) {
    this.dialog.confirm({
      message: 'ნამდვილად გინდათ პროდუქტის წაშლა?',
      header: 'პროდუქტის წაშლა',
      icon: 'pi pi-question',
      accept: () => {
        this.service.removeItem([itemId]).subscribe((data) => {
          if (data.res) {
            this.items = this.items.filter((item) => item.id != itemId);
            this.msgService.success('პროდუქტი წარმატებით წაიშალა!');
            this.loadCartItems();
          }
          else{
            this.msgService.success('პროდუქტი ვერ წაიშალა!');
          }
        });
      },
    });
  }

  onEditItem(itemId: number) {
    this.router.navigate(['editItem/', itemId]);
  }
  onCreateItem() {
    this.router.navigateByUrl('editItem/');
  }
  loadCartItems() {
    this.isCartLoading = true;

    this.service.getCartItems(this.loggedUser.id).subscribe((data) => {
      this.cartItems = data;
      debugger
      this.isCartLoading = false;
    });
  }
  loadItems() {
    this.items = [];
    this.isItemsLoading = true;
    this.service.getAllItems().subscribe((data) => {
      this.items = data;
      this.isItemsLoading = false;
    });
  }
}
