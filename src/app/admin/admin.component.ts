import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ItemService } from '../service/product.service';
import { Product } from '../Model/product';
import { ToastrService } from 'ngx-toastr';
import { User } from '../Model/user';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';
import { Voucher } from '../Model/voucher';
import { VoucherService } from '../service/voucher.service';
import { VoucherStatus } from '../enums/voucherStatus';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ConfirmationService],
})
export class AdminComponent {
  productModal: boolean = false;
  userModal: boolean = false;
  products: Product[] = [{ name: '', price: 0, quantity: 0 }];
  product: any;
  vouchers: Voucher[] = [
    { key: '', price: 0, status: VoucherStatus.Valid, createdBy: 0 },
  ];
  voucher: Voucher = this.getDefaultVoucher();
  voucherModal: boolean = false;
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

  getDefaultVoucher() {
    let voucher: Voucher = {
      price: 10,
      createdBy: 0,
      key: '',
      status: VoucherStatus.Valid,
      validDate: this.addDays(5),
    };
    return voucher;
  }

  addDays(days: number) {
    let dateNow = new Date();
    let validate = new Date();
    validate.setDate(dateNow.getDate() + days);
    return validate;
  }

  loadProducts() {
    this.productService
      .getAllProducts()
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
      this.userModal = true;
    }
    if (this.currentMenuTab.label === 'Products') {
      this.product = {};
      this.productModal = true;
    }
    if (this.currentMenuTab.label === 'Vouchers') {
      this.voucher = this.getDefaultVoucher();
      this.voucherModal = true;
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
    debugger;

    if (this.currentMenuTab.label === 'Users') {
      this.user = { ...item };
      this.userModal = true;
    }
    if (this.currentMenuTab.label === 'Products') {
      this.product = { ...item };
      this.productModal = true;
    }
    if (this.currentMenuTab.label === 'Vouchers') {
      this.voucher = { ...item };
      this.voucherModal = true;
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
            this.user = this.getDefaultVoucher();
          }
        });
      },
    });
  }

  deleteVoucher(voucher: any) {
    this.confirmationService.confirm({
      message: 'ნამდვილად გინდათ წაშლა ? ' + voucher.key + '?',
      header: 'დაადასტურე',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.voucherService.delete([voucher.id]).subscribe((data) => {
          if (data.res) {
            this.vouchers = this.vouchers.filter((val) => val.id != voucher.id);
            this.msgService.success('ვაუჩერი წარმატებით წაიშალა!');
          }
        });
      },
    });
  }

  hideDialog() {
    this.productModal = false;
    this.submitted = false;
    this.userModal = false;
    this.voucherModal = false;
  }

  saveDialogResult(result: any) {
    this.submitted = true;
    if (this.currentMenuTab.label === 'Users') {
      if (this.user.id) {
        this.userService.UpdateUser(result).subscribe((data) => {
          if (data.res) {
            const index = this.findIndexById(result.id, this.users);
            result.lastUpdated = Date.now();
            this.users[index] = { ...result };
            this.msgService.success('მომხმარებელი წარმატებით განახლდა!');
          } else {
            this.msgService.error(data.errors.join('\n'));
          }
          this.user = {};
          this.users = [...this.users];
          this.userModal = false;
        });
      } else {
        this.authService.signup(result).subscribe((data) => {
          if (data.res) {
            result.id = data.res;
            this.users.unshift(result);
            this.msgService.success('მომხმარებელი წარმატებით შეიქმნა!');
            this.user = {};
            this.users = [...this.users];
            this.userModal = false;
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
            this.productModal = false;
          });
        } else {
          this.productService.addItem(this.product).subscribe((data) => {
            if (data.res) {
              this.product.createdBy = this.authService.userPayload.id;
              this.products.unshift({ ...this.product });
              this.msgService.success('პროდუქტი წარმატებით შეიქმნა!');
              this.product = {};
              this.products = [...this.products];
              this.productModal = false;
            }
          });
        }
      }
    }
    if (this.currentMenuTab.label === 'Vouchers') {
      if (this.voucher.id) {
        this.voucherService.update(result).subscribe((data) => {
          if (data.res) {
            const index = this.findIndexById(result.id, this.vouchers);
            this.vouchers[index] = { ...result };
            this.msgService.success('ვაუჩერი წარმატებით განახლდა');
          } else {
            this.msgService.error(data.errors.join('\n'));
          }
        });
      } else {
        this.voucherService.create(result).subscribe((data) => {
          if (data.res) {
            result = data.res;
            this.vouchers.unshift(result);
            this.msgService.success('ვაუჩერი წარმატებით შეიქმნა');
          } else {
            this.msgService.error(data.errors.join('\n'));
          }
        });
      }
      this.voucher = this.getDefaultVoucher();
      this.voucherModal = false;
    }
  }

  onGenerateKey() {
    this.voucherService.generateKey().subscribe((data) => console.log(data));
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
