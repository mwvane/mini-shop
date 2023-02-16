import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../service/item.service';
import { Item } from '../Model/item';
import { CartItem } from '../Model/cartItem';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { VoucherService } from '../service/voucher.service';
import { SoldProduct } from '../Model/soldProduct';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { Voucher } from '../Model/voucher';

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
  myProducts: SoldProduct[] = [];
  selectedCartItem: any;
  isItemsLoading = true;
  isCartLoading = true;
  openBuyDialog: boolean = false;
  myProductDialog: boolean = false;
  voucherDialog: boolean = false;
  isVoucherKeyConfirmed = false;
  ngOnInit(): void {
    const user = this.authService.userPayload;
    if (user) {
      this.loggedUser = user;
      this.loadItems();
      this.loadCartItems();
      this.loadSoldProducts();
    }
  }
  onAddToCart(item: Item) {
    const cartItem: CartItem = {
      itemId: item.id,
      userId: this.authService.userPayload.id,
      quantity: 0,
      totalPrice: item.price,
      voucherPrice: 0,
    };
    this.service.addToCart(cartItem).subscribe((data) => {
      if (!data.res) {
        this.msgService.warning(data.errors.join('\n'));
      } else {
        debugger;

        const payload: any = data.res;
        this.cartItems.unshift(payload);
        item.quantity--;
      }
    });
  }
  onCartItemChange(cartItem: any, value: number) {
    let item = this.items.find((val) => val.id === cartItem.item.id);
    if (item) {
      item.quantity -= value;
    }
    debugger;
  }
  onCartItemOpen(cartItem: CartItem) {
    this.selectedCartItem = cartItem;
    this.openBuyDialog = true;
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
              debugger;
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
  loadCartItems() {
    this.isCartLoading = true;
    this.service.getCartItems(this.loggedUser.id).subscribe((data) => {
      this.cartItems = data;
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
  loadSoldProducts() {
    this.service
      .getSoldProducts(Number(this.authService.userPayload.id))
      .subscribe((data) => {
        if (data.res) {
          const res: any = data.res;
          this.myProducts = res;
        }
      });
  }
  onCheckVoucherKey(key: string) {
    this.voucherService.getVoucher(key).subscribe((data) => {
      if (data.res) {
        let res: any = data.res;
        if (res.isValid) {
          if (!res.isUsed) {
            this.isVoucherKeyConfirmed = true;
            if (this.selectedCartItem.totalPrice > res.price) {
              this.selectedCartItem.voucherPrice = res.price;
              this.service
                .updateCartItem(this.selectedCartItem)
                .subscribe((data) => {
                  if (data.res) {
                    this.msgService.success(
                      `${this.selectedCartItem.item.name}-ზე დაგაკლდათ ${res.price} ₾`
                    );
                    res.isUsed = true;
                    this.voucherService.update(res).subscribe((data) => {
                      console.log('Voucher updated!');
                    });
                  }
                });
            } else {
              this.selectedCartItem.voucherPrice =
                this.selectedCartItem.totalPrice;
              res.price -=
                this.selectedCartItem.item.price *
                this.selectedCartItem.quantity;
              debugger;
              this.msgService.success(
                `${this.selectedCartItem.item.name}-ზე დაგაკლდათ ${
                  this.selectedCartItem.item.price *
                  this.selectedCartItem.quantity
                } ₾`
              );
              this.voucherService.update(res).subscribe((data) => {
                if (data) {
                  console.log(data);
                }
              });
            }
          } else {
            this.msgService.error('ვაუჩერი უკვე გამოყენებულია!');
          }
        } else {
          this.msgService.error('ვაუჩერი მოქმედების ვადა ამოწურულია!');
        }
      } else {
        this.msgService.error(data.errors.join('\n'));
      }
    });
  }
  onQuantityDecrease(item: any) {
    this.service.updateCartItemQuantity(item.id, -1).subscribe((data) => {
      if (data.res != null) {
        item.quantity--;
        this.onCartItemChange(item, -1);
      } else {
        this.msgService.warning(data.errors.join('\n'));
      }
    });
  }
  onQuantityIncrease(item: any) {
    debugger;
    this.service.updateCartItemQuantity(item.id, 1).subscribe((data) => {
      if (data.res != null) {
        item.quantity++;
        this.onCartItemChange(item, +1);
      } else {
        this.msgService.warning(data.errors.join('\n'));
      }
    });
  }
  onBuyDialogClose() {
    this.openBuyDialog = false;
  }
  onBuy(item: any) {
    this.service.buyProduct(item.id).subscribe((data) => {
      if (data.res) {
        this.msgService.success('პროდუქტი წარმატებით იყიდეთ!');
        this.cartItems = this.cartItems.filter((val) => val.id != item.id);
        const res: any = data.res;
        this.myProducts.unshift(res);
      } else {
        this.msgService.error(data.errors.join('\n'));
      }
    });
    this.openBuyDialog = false;
  }
  onMyProduct() {
    this.myProductDialog = true;
  }
  onMyProductModalClose() {
    this.myProductDialog = false;
  }
  openVoucherDialog() {
    this.voucherDialog = true;
  }
  onVoucherDialogClose() {
    this.voucherDialog = false;
  }
  onCreateVoucher(voucher: Voucher){
    console.log(voucher)////////////////
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
}
