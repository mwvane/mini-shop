import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';
import { faCartShopping, faAdd } from '@fortawesome/free-solid-svg-icons';
import { Item } from '../Model/item';
import { CartItem } from '../Model/cartItem';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { YesNoComponent } from '../dialogs/yes-no/yes-no.component';
import { LoginRegisterService } from '../login-register.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private service: ItemService,
    private authService: LoginRegisterService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  cartIcon = faCartShopping;
  addIcon = faAdd;
  items: Item[] = [];
  loggedUser: any;
  cartItems: CartItem[] = [];
  isItemsLoading = true;
  isCartLoading = true;
  ngOnInit(): void {
    const user = this.authService.userPayload
    debugger
    if (user) {
      this.loggedUser = user
      this.loadItems();
      this.loadCartItems()
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
    this.openDialog(
      'კალათიდან პროდუქტის წაშლა',
      'ნამდვილად გინდათ კალათიდან პროდუქტის წაშლა?'
    ).subscribe((data) => {
      if (data) {
        if (id) {
          this.service.deleteCartItem(id).subscribe((data) => {
            if (data) {
              this.cartItems = this.cartItems.filter((item) => item.id != id);
              this.loadItems();
            }
          });
        }
      }
    });
  }
  onLogout() {
    this.openDialog('გასვლა', 'ნამდვილად გსურთ გასვლა?').subscribe((data) => {
      if (data) {
        this.authService.logOut()
        this.router.navigateByUrl('login');
      }
    });
  }
  openDialog(caption: string, message: string) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = { caption, message };
    return this.dialog.open(YesNoComponent, dialogConfig).afterClosed();
  }
  // admin---------------
  onRemoveItem(itemId: number) {
    this.openDialog(
      'პროდუქტის წაშლა',
      'ნამდვილად გინდათ პროდუქტის წაშლა?'
    ).subscribe((data) => {
      if (data) {
        this.service.removeItem(itemId).subscribe((data) => {
          if (data.res) {
            this.items = this.items.filter((item) => item.id != itemId);
            this.loadCartItems();
          }
        });
      }
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
      this.isCartLoading = false;
    });
  }
  loadItems() {
    debugger
    this.items = []
    this.isItemsLoading = true;
    this.service.getAllItems().subscribe((data) => {
      this.items = data;
      this.isItemsLoading = false;
    });
  }
}
