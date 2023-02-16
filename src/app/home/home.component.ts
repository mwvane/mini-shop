import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../service/item.service';
import { Item } from '../Model/item';
import { CartItem } from '../Model/cartItem';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { VoucherService } from '../service/voucher.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ConfirmationService],
})
export class HomeComponent implements OnInit {
  constructor(
    private service: ItemService,
    private authService: AuthService,
    private voucherService: VoucherService,
    private router: Router,
    private dialog: ConfirmationService,
    private msgService: ToastrService
  ) {}
  items: Item[] = [];
  loggedUser: any;
  cartItems: CartItem[] = [];
  selectedCartItem: any;
  isItemsLoading = true;
  isCartLoading = true;
  isbuyModalOpen: boolean = false;
  isVoucherKeyConfirmed = false;
  ngOnInit(): void {
    const user = this.authService.userPayload;
    if (user) {
      this.loggedUser = user;
      this.loadItems();
      this.loadCartItems();
    }
  }
  onAddToCart(item: Item) {
    const cartItem: CartItem = {
      itemId: item.id,
      userId: this.authService.userPayload.id,
      quantity: 1,
      totalPrice: item.price,
      voucherPrice: 0,
    };
    this.service.addToCart(cartItem).subscribe((data) => {
      if (!data.res) {
        this.msgService.warning(data.errors.join('\n'));
      } else {
        const item: any = data.res;
        this.cartItems.unshift(item);
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
  onCartItemOpen(cartItem: CartItem) {
    this.selectedCartItem = cartItem;
    this.isbuyModalOpen = true;
  }
  onCartItemDelete(id?: number) {
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
          } else {
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
      debugger;
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
  onCheckVoucherKey(key: string) {
    this.voucherService.getVoucher(key).subscribe((data) => {
      if (data.res) {
        let res: any = data.res;
        this.isVoucherKeyConfirmed = true;
        this.selectedCartItem.voucherPrice = res.price;
        if (this.selectedCartItem.totalPrice > res.price) {
          this.service
            .updateCartItem(this.selectedCartItem)
            .subscribe((data) => {
              if (data.res) {
                this.msgService.success(
                  `მითითებულ პროდუქტზე დაგაკლდათ ${res.price} ₾`
                );
              }
            });
        } else {
        }
      } else {
        this.msgService.error(data.errors.join('\n'));
      }
    });
  }
   onQuantityDecrease(item:any){
    this.service
      .updateCartItemQuantity(item.id, -1)
      .subscribe((data) => {
        if (data.res != null) {
          item.quantity--;
        } else {
          this.msgService.warning(data.errors.join('\n'));
        }
      });
   }
   onQuantityIncrease(item:any){
    this.service
      .updateCartItemQuantity(item.id, 1)
      .subscribe((data) => {
        if (data.res != null) {
          item.quantity++;
        } else {
          this.msgService.warning(data.errors.join('\n'));
        }
      });
   }
}
