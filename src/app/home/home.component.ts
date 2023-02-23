import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../service/product.service';
import { Product } from '../Model/product';
import { CartItem } from '../Model/cartItem';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { VoucherService } from '../service/voucher.service';
import { order } from '../Model/order';
import { Voucher } from '../Model/voucher';
import { VoucherStatus } from '../enums/voucherStatus';
import { Helper } from '../helpers/helper';
import { CartItemForApi } from '../Model/cartItemForApi';
import { ModalService } from '../service/modal.service';
import { State } from '../state/state';

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
    private msgService: ToastrService,
    public modalService: ModalService,
    private state: State
  ) {}

  products: Product[] = [];
  loggedUser: any;
  cartItems: CartItem[] = [];
  myOrders: order[] = [];
  selectedCartItem: any;
  isItemsLoading = true;
  isCartLoading = true;
  buyModal: boolean = false;
  isVoucherKeyConfirmed = false;
  vouchers: Voucher[] = [];

  openTable() {}

  ngOnInit(): void {
    const user = this.authService.userPayload;
    if (user) {
      this.loggedUser = user;
      this.loadProducts();
      this.loadCartItems();
      this.loadOrders();
      this.loadVouchers();
    }
  }

  // Products functions --------------------------------------
  loadProducts() {
    this.isItemsLoading = true;
    this.service.getAllProducts().subscribe((data) => {
      this.products = data;
      this.isItemsLoading = false;
    });
  }

  onCreateItem() {
    this.router.navigateByUrl('editItem/');
  }

  onEditItem(itemId: number) {
    this.router.navigate(['editItem/', itemId]);
  }

  onRemoveItem(itemId: number) {
    this.dialog.confirm({
      message: 'ნამდვილად გინდათ პროდუქტის წაშლა?',
      header: 'პროდუქტის წაშლა',
      icon: 'pi pi-question',
      accept: () => {
        this.service.removeItem([itemId]).subscribe((data) => {
          if (data.res) {
            this.products = this.products.filter((item) => item.id != itemId);
            this.msgService.success('პროდუქტი წარმატებით წაიშალა!');
            this.loadCartItems();
          } else {
            this.msgService.success('პროდუქტი ვერ წაიშალა!');
          }
        });
      },
    });
  }

  // CartItem functions --------------------------------------

  loadCartItems() {
    this.isCartLoading = true;
    this.service.getCartItems(this.loggedUser.id).subscribe((data) => {
      this.cartItems = data;
      this.state.cartItemsCount = this.cartItems ? this.cartItems.length : 0;
      this.isCartLoading = false;
    });
  }

  onAddToCart(product: Product) {
    const cartItem: CartItemForApi = {
      productId: product.id,
      userId: this.authService.userPayload.id,
    };

    this.service.addToCart(cartItem).subscribe((data) => {
      if (!data.res) {
        this.msgService.warning(data.errors.join('\n'));
      } else {
        const payload: any = data.res;
        this.cartItems.unshift(payload);
        this.state.cartItemsCount++;
        product.quantity--;
      }
    });
  }

  onCartItemChange(cartItem: any, value: number) {
    let item = this.products.find((val) => val.id === cartItem.product.id);
    if (item) {
      item.quantity -= value;
    }
  }

  onCartItemRemove(id?: number) {
    this.dialog.confirm({
      message: 'ნამდვილად გინდათ კალათიდან პროდუქტის წაშლა?',
      header: 'კალათიდან პროდუქტის წაშლა',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (id) {
          this.service.deleteCartItem(id).subscribe((data) => {
            if (data) {
              this.cartItems = this.cartItems.filter((item) => item.id != id);
              this.state.cartItemsCount > 0 ? this.state.cartItemsCount-- : 0;
              this.msgService.success('პრდუქტი, კალათიდან წარმატებით წაიშალა');
              this.loadProducts();
              this.loadVouchers();
              this.dialog.close();
            }
          });
        }
      },
    });
  }

  onCartItemOpen(cartItem: CartItem) {
    this.selectedCartItem = cartItem;
    this.buyModal = true;
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
    this.service.updateCartItemQuantity(item.id, 1).subscribe((data) => {
      if (data.res != null) {
        item.quantity++;
        this.onCartItemChange(item, +1);
      } else {
        this.msgService.warning(data.errors.join('\n'));
      }
    });
  }

  onBuy(item: any) {
    this.service.buyProduct(item.id).subscribe((data) => {
      if (data.res) {
        debugger;
        this.msgService.success('პროდუქტი წარმატებით იყიდეთ!');
        this.cartItems = this.cartItems.filter((val) => val.id != item.id);
        if (item.voucher) {
          let voucher = Helper.getItemById(item.voucher, this.vouchers);
          if (voucher) {
            voucher.status = VoucherStatus.Used;
          }
        }
        const res: any = data.res;
        this.myOrders.unshift(res);
      } else {
        this.msgService.error(data.errors.join('\n'));
      }
    });
    this.buyModal = false;
  }

  //Voucher functions -----------------------------------------
  loadVouchers() {
    this.voucherService.getAllVouchers().subscribe((data) => {
      if (data) {
        this.vouchers = data;
      }
    });
  }

  onCreateVoucher(voucher: Voucher) {
    debugger;
    this.voucherService.create(voucher).subscribe((data) => {
      if (data.res) {
        this.msgService.success('ვაუჩერი წარმატებით შეიქმნა!');
        const res: any = data.res;
        this.vouchers.unshift(res);
        this.modalService.openGenerateVoucherModal = false;
      } else {
        this.msgService.error(data.errors.join('\n'));
      }
    });
  }

  onVoucherRemove(cartItem: any) {
    this.dialog.confirm({
      message: 'ნამდვილად გინდათ ვაუჩერის გაუქმება?',
      header: 'ვაჩერის გაუქმება',
      icon: 'pi pi-question',
      accept: () => {
        let voucher = cartItem.voucher;
        if (
          cartItem.voucherAmount > 0 &&
          voucher.status === VoucherStatus.Valid
        ) {
          voucher.price += cartItem.voucherAmount;
        }
        cartItem.voucher.status = VoucherStatus.Valid;
        this.voucherService.update(voucher).subscribe((data) => {
          if (data.res) {
            const res: any = data.res;
            cartItem.voucher = null;
            cartItem.voucherAmount = 0;
            this.updateVoucher(res);
            this.msgService.success('ვაუჩერი წარმატებით გაუქმდა');
            this.service.updateCartItem(cartItem).subscribe();
            this.dialog.close();
          }
        });
      },
    });
  }

  onCheckVoucherKey(key: string) {
    this.voucherService.getVoucher(key).subscribe((data) => {
      if (data.res) {
        let voucher: any = data.res;
        const totalPrice =
          this.selectedCartItem.product.price * this.selectedCartItem.quantity;
        debugger;
        if (voucher.status === VoucherStatus.Valid) {
          if (totalPrice < voucher.price) {
            debugger;
            this.selectedCartItem.voucherAmount = totalPrice;
            voucher.price -= totalPrice;
          } else {
            this.selectedCartItem.voucherAmount = voucher.price;
            voucher.status = VoucherStatus.PreUsed;
          }
          this.selectedCartItem.voucher = voucher;
          this.voucherService.update(voucher).subscribe((data) => {
            if (data.res) {
              this.service
                .updateCartItem(this.selectedCartItem)
                .subscribe((data) => {
                  debugger;
                  if (data.res) {
                    this.msgService.success(
                      `${this.selectedCartItem.product.name}-ზე დაგაკლდათ ${this.selectedCartItem.voucherAmount} ₾`
                    );
                  }
                });
              this.updateVoucher(voucher);
              console.log('Voucher updated!');
            }
          });
        } else {
          this.msgService.error('ვაუჩერი ვერ მოიძებნა!');
        }
      } else {
        this.msgService.error(data.errors.join('\n'));
      }
    });
  }

  //Order functions --------------------------------------------
  loadOrders() {
    this.service
      .getOrders(Number(this.authService.userPayload.id))
      .subscribe((data) => {
        if (data.res) {
          const res: any = data.res;
          this.myOrders = res;
        }
      });
  }

  // Modal controls -------------------------------------------
  onBuyDialogClose() {
    this.buyModal = false;
  }

  openVoucherDialog() {
    this.modalService.openGenerateVoucherModal = true;
  }
  //Other functions ---------------------------------------------
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

  selectMenuItem(e: any) {
    console.log(e.target);
    alert(e.target.value);
  }

  // Helpers ---------------------------------------------------
  updateVoucher(voucher: any) {
    const index = Helper.getItemIndexById(voucher.id, this.vouchers);
    if (index >= 0) {
      this.vouchers[index] = voucher;
    }
  }
}
