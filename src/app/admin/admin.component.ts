import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ItemService } from '../service/item.service';
import { Item } from '../Model/item';
import { ToastrService } from 'ngx-toastr';
import { User } from '../Model/user';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';
import { Voucher } from '../Model/voucher';
import { VoucherService } from '../service/voucher.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ConfirmationService],
})
export class AdminComponent {
  productDialog: boolean = false;
  userDialog: boolean = false;
  products: Item[] = [{ name: '', price: 0, quantity: 0 }];
  product: any;
  vouchers: Voucher[] = [{ key: '', price: 0, isValid: false, createdBy: 0 }];
  voucher: any;
  voucherDialog: boolean = false;
  selectedProducts: any;
  users: User[] = [
    { email: '', firstname: '', lastname: '', password: '', role: '', id: 0 },
  ];
  user: any;

  submitted: boolean = false;
  menuItems: any[] = [
    { label: 'Products', icon: 'pi pi-shopping-bag' },
    { label: 'Users', icon: 'pi pi-fw pi-users' },
    { label: 'Vouchers', icon: 'pi pi-money-bill' },
  ];
  currentMenuTab: any = this.menuItems[0];

  constructor(
    private productService: ItemService,
    private userService: UserService,
    private authService: AuthService,
    private voucherService: VoucherService,
    private confirmationService: ConfirmationService,
    private msgService: ToastrService
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadusers();
    this.loadVouchers();
  }
  loadProducts() {
    this.productService
      .getAllItems()
      .subscribe((data) => (this.products = data));
  }
  loadusers() {
    this.productService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }
  loadVouchers() {
    this.voucherService
      .getAllVouchers()
      .subscribe((data) => (this.vouchers = data));
  }
  openNew() {
    if (this.currentMenuTab.label === 'Users') {
      this.user = {};
      this.userDialog = true;
    }
    if (this.currentMenuTab.label === 'Products') {
      this.product = {};
      this.productDialog = true;
    }
    if (this.currentMenuTab.label === 'Vouchers') {
      this.voucher = {};
      this.voucherDialog = true;
    }
    this.submitted = false;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'ნამდვილად გინდათ მონიშნული პროდუქტის წაშლა?',
      header: 'დაადასტურე',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const selectedProducts = this.products
          .filter((val) => this.selectedProducts.includes(val))
          .map((item) => {
            return item.id;
          });
        this.productService.removeItem(selectedProducts).subscribe((data) => {
          if (data.res) {
            this.loadProducts();
            this.msgService.success('წარმატებით წაიშალა!');
          } else {
            this.msgService.error(data.errors.join('\n'));
          }
        });
        this.selectedProducts = null;
      },
    });
  }

  editItem(item: any) {
    debugger

    if (this.currentMenuTab.label === 'Users') {
      this.user = { ...item };
      this.userDialog = true;
    }
    if (this.currentMenuTab.label === 'Products') {
      this.product = { ...item };
      this.productDialog = true;
    }
    if (this.currentMenuTab.label === 'Vouchers') {
      this.voucher = { ...item };
      this.voucherDialog = true;
    }
  }

  deleteProduct(product: any) {
    this.confirmationService.confirm({
      message: 'ნამდვილად გინდათ პროდუქტის წაშლა ? ' + product.name + '?',
      header: 'დაადასტურე',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.removeItem([product.id]).subscribe((data) => {
          if (data.res) {
            this.products = this.products.filter(
              (val) => val.id !== product.id
            );
            this.msgService.success('პროდუქტი წარმატებით წაიშალა!');
            this.product = {};
          }
        });
      },
    });
  }

  deleteUser(user: any) {
    this.confirmationService.confirm({
      message: 'ნამდვილად გინდათ წაშლა ? ' + user.email + '?',
      header: 'დაადასტურე',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.RemoveUser([user.id]).subscribe((data) => {
          if (data.res) {
            this.users = this.users.filter((val) => val.id !== user.id);
            this.msgService.success('მომხმარებელი წარმატებით წაიშალა!');
            this.user = {};
          }
        });
      },
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
    this.userDialog = false;
  }

  saveDialogResult(result: any) {
    this.submitted = true;
    if (this.currentMenuTab.label === 'Users') {
      if (this.user.id) {
        this.userService.UpdateUser(result).subscribe((data) => {
          if (data.res) {
            const index = this.findIndexById(result.id, this.users);
            this.users[index] = { ...result };
            this.msgService.success('მომხმარებელი წარმატებით განახლდა!');
          } else {
            this.msgService.error(data.errors.join('\n'));
          }
          this.user = {};
          this.users = [...this.users];
          this.userDialog = false;
        });
      } else {
        this.authService.signup(result).subscribe((data) => {
          if (data.res) {
            result.id = data.res;
            this.users.unshift(result);
            this.msgService.success('მომხმარებელი წარმატებით შეიქმნა!');
            this.user = {};
            this.users = [...this.users];
            this.userDialog = false;
          } else {
            this.msgService.error(data.errors.join('\n'));
          }
        });
      }
    }

    if (this.currentMenuTab.label === 'Products') {
      if (this.product.name.trim()) {
        if (this.product.id) {
          this.productService.updateItem(this.product).subscribe((data) => {
            if (data.res) {
              const index = this.findIndexById(this.product.id, this.products);
              this.products[index] = { ...this.product };
              this.msgService.success('პროდუქტი წარმატებით განახლდა!');
            } else {
              this.msgService.error(data.errors.join('\n'));
            }
            this.product = {};
            this.product = [...this.users];
            this.productDialog = false;
          });
        } else {
          this.productService.addItem(this.product).subscribe((data) => {
            if (data.res) {
              this.product.createdBy = this.authService.userPayload.id;
              this.products.unshift({ ...this.product });
              this.msgService.success('პროდუქტი წარმატებით შეიქმნა!');
              this.product = {};
              this.products = [...this.products];
              this.productDialog = false;
            }
          });
        }
      }
    }
    if (this.currentMenuTab.label === 'Vouchers') {
      if (this.voucher.id) {
      } else {
        this.voucherService.create(result).subscribe((data) => {
      debugger

          if (data.res) {
            result.id = data.res;
            this.vouchers.unshift(result);
            this.msgService.success('ვაუჩერი წარმატებით შეიქმნა');
          } else {
            this.msgService.error(data.errors.join('\n'));
          }
        });
      }
      this.voucher = {}
      this.voucherDialog = false
    }
  }
  onGenerateKey() {
    this.voucherService
      .generateKey()
      .subscribe((data) => console.log(data));
  }
  findIndexById(id: number, array: any[]): number {
    for (let [index, item] of array.entries()) {
      if (item.id === id) {
        return index;
      }
    }
    return -1;
  }
  onMenuItemChange(item: any) {
    this.currentMenuTab = item;
  }
  getUsername(id: number) {
    const username = this.users.find((user) => user.id == id)?.email;
    return username === this.authService.userPayload.email
      ? `${username}(you)`
      : username;
  }
}
