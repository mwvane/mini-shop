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
import * as moment from 'moment';

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
  products: Product[] = [];
  loggedUser: any;
  cartItems: CartItem[] = [];
  myOrders: order[] = [];
  selectedCartItem: any;
  isItemsLoading = true;
  isCartLoading = true;
  buyModal: boolean = false;
  myProductModal: boolean = false;
  voucherCreateModal: boolean = false;
  voucherShowModal = false;
  isVoucherKeyConfirmed = false;
  vouchers: Voucher[] = [];
  openFilterTable:boolean = false
  openTable(){
    this.openFilterTable = true;
  }
  ngOnInit(): void {
    const user = this.authService.userPayload;
    if (user) {
      this.loggedUser = user;
      this.loadProducts();
      this.loadCartItems();
      this.loadSoldProducts();
      this.loadVouchers();
      // alert(moment(new Date()).format('l'))
    }
  }

  onAddToCart(product: Product) {
    const cartItem: any = {
      id: 0,
      productId: product.id,
      userId: this.authService.userPayload.id,
      quantity: 0,
      totalPrice: 0,
      voucherId: null,
      vocherAmount: 0,
    };

    this.service.addToCart(cartItem).subscribe((data) => {
      if (!data.res) {
        this.msgService.warning(data.errors.join('\n'));
      } else {
        const payload: any = data.res;
        this.cartItems.unshift(payload);
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

  onCartItemOpen(cartItem: CartItem) {
    this.selectedCartItem = cartItem;
    this.buyModal = true;
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
      debugger;
      this.cartItems = data;
      this.isCartLoading = false;
    });
  }

  loadProducts() {
    this.isItemsLoading = true;
    this.service.getAllProducts().subscribe((data) => {
      this.products = data;
      this.isItemsLoading = false;
    });
  }

  loadSoldProducts() {
    this.service
      .getOrders(Number(this.authService.userPayload.id))
      .subscribe((data) => {
        if (data.res) {
          const res: any = data.res;
          this.myOrders = res;
        }
      });
  }

  loadVouchers() {
    this.voucherService.getAllVouchers().subscribe((data) => {
      if (data) {
        this.vouchers = data;
      }
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

  selectMenuItem(e: any) {
    console.log(e.target);
    alert(e.target.value);
  }

  onBuyDialogClose() {
    this.buyModal = false;
  }

  onBuy(item: any) {
    this.service.buyProduct(item.id).subscribe((data) => {
      if (data.res) {
        debugger
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

  onMyProduct() {
    this.myProductModal = true;
  }

  onMyProductModalClose() {
    this.myProductModal = false;
  }

  openVoucherDialog() {
    this.voucherCreateModal = true;
  }

  openVoucherShowModal() {
    this.voucherShowModal = true;
  }

  onVoucherDialogClose() {
    this.voucherCreateModal = false;
  }

  onVoucherShowModalClose() {
    this.voucherShowModal = false;
  }

  onCreateVoucher(voucher: Voucher) {
    this.voucherService.create(voucher).subscribe((data) => {
      if (data.res) {
        this.msgService.success('ვაუჩერი წარმატებით შეიქმნა!');
        const res: any = data.res;
        this.vouchers.unshift(res);
        this.voucherCreateModal = false;
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
        debugger;
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
            debugger;
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

  showVouchers() {
    this.voucherService.getAllVouchers().subscribe((data) => {
      console.log(data);
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

  onEditItem(itemId: number) {
    this.router.navigate(['editItem/', itemId]);
  }

  onCreateItem() {
    this.router.navigateByUrl('editItem/');
  }

  // Helpers----------
  updateVoucher(voucher: any) {
    const index = Helper.getItemIndexById(voucher.id, this.vouchers);
    if (index >= 0) {
      this.vouchers[index] = voucher;
    }
  }
}
