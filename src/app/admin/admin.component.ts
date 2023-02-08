import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ItemService } from '../item.service';
import { Item } from '../Model/item';
import { ToastrService } from 'ngx-toastr';
import { User } from '../Model/user';
import { UserService } from '../user.service';
import { LoginRegisterService } from '../login-register.service';
import { faL } from '@fortawesome/free-solid-svg-icons';

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
  users: User[] = [{ email: '', firstname: '', lastname: '', role: '', id: 0 }];
  user: any;
  product: any;
  selectedProducts: any;
  selectedUser: any;
  submitted: boolean = false;
  statuses: any[] = [];
  menuItems: any[] = [
    { label: 'Products', icon: 'pi pi-shopping-bag' },
    { label: 'Users', icon: 'pi pi-fw pi-users' },
  ];
  role: string[] = ['admin', 'user', 'seller'];
  currentMenuTab: any = this.menuItems[0];

  constructor(
    private productService: ItemService,
    private userService: UserService,
    private authService: LoginRegisterService,
    private confirmationService: ConfirmationService,
    private msgService: ToastrService
  ) {}

  ngOnInit() {
    this.productService
      .getAllItems()
      .subscribe((data) => (this.products = data));
    this.productService.getAllUsers().subscribe((data) => {
      this.users = data;
      debugger
    });
  }

  openNew() {
    if (this.currentMenuTab.label === 'Users') {
      debugger;
      this.user = {};
      this.submitted = false;
      this.userDialog = true;
    }
    if (this.currentMenuTab.label === 'Products') {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
    }
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'ნამდვილად გინდათ მონიშნული პროდუქტის წაშლა?',
      header: 'დაადასტურე',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        ////////////'''''''''''''''''''''''
        const selectedProducts = this.products
          .filter((val) => this.selectedProducts.includes(val))
          .map((item) => {
            return item.id;
          });
        this.productService
          .removeItem(selectedProducts)
          .subscribe((data) => {});
        this.selectedProducts = null;
      },
    });
  }

  editItem(item: any) {
    if (this.currentMenuTab.label === 'Users') {
      this.user = { ...item };
      this.userDialog = true;
    }
    if (this.currentMenuTab.label === 'Products') {
      this.product = { ...item };
      this.productDialog = true;
    }
  }

  deleteProduct(product: any) {
    this.confirmationService.confirm({
      message: 'ნამდვილად გინდათ პროდუქტის წაშლა ? ' + product.name + '?',
      header: 'დაადასტურე',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.removeItem(product.id).subscribe((data) => {
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
        this.userService.RemoveUser(user.id).subscribe((data) => {
          if (data.res) {
            debugger;
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

  saveDialogResult() {
    this.submitted = true;

    if (this.currentMenuTab.label === 'Users') {
      if (this.user.id) {
        this.userService.UpdateUser(this.user).subscribe((data) => {
          debugger;
          if (data.res) {
            const index = this.findIndexById(this.user.id, this.users);
            this.users[index] = { ...this.user };
            this.msgService.success('მომხმარებელი წარმატებით განახლდა!');
          } else {
            this.msgService.error(data.errors.join('\n'));
          }
          this.user = {};
          this.users = [...this.users];
          this.userDialog = false;
        });
      } else {
        this.authService.signup(this.user).subscribe((data) => {
          if (data.res) {
            this.users.unshift(this.user);
            this.msgService.success('მომხმარებელი წარმატებით განახლდა!');
            this.user = {};
            this.users = [...this.users];
            this.userDialog = false;
          }
        });
      }
    }

    if (this.currentMenuTab.label === 'Products') {
      if (this.product.name.trim()) {
        if (this.product.id) {
          this.products[this.findIndexById(this.product.id, this.products)] =
            this.product;
        } else {
          this.product.id = this.createId();
          this.products.push(this.product);
        }

        this.products = [...this.products];
        this.productDialog = false;
        this.product = {};
      }
    }
  }

  findIndexById(id: number, array: any[]): number {
    for (let [index, item] of array.entries()) {
      debugger;
      if (item.id === id) {
        return index;
      }
    }
    return -1;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
  onMenuItemChange(item: any) {
    console.log(this.users);
    this.currentMenuTab = item;
  }
}