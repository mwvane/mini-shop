import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ItemService } from '../service/product.service';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-or-create.component.html',
  styleUrls: ['./edit-or-create.css'],
})
export class EditItemComponent implements OnInit {
  item: any = {};
  caption = '';
  isEditMode = true;
  loggedUser: any;
  editOrCreateForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    price: new FormControl(null, [Validators.required]),
    quantity: new FormControl(null, [Validators.required]),
  });
  constructor(
    private route: ActivatedRoute,
    private service: ItemService,
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.loggedUser = this.authService.userPayload;
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.caption = 'პროდუქტის განახლება';
        this.isEditMode = true;
        this.service.getProduct(params['id']).subscribe((data) => {
          this.item = data;
          console.log(data);
        });
      } else {
        this.caption = 'პროდუქტის დამატება';
        this.isEditMode = false;
      }
    });
  }
  onSubmit() {
    if (this.isEditMode) {
      if (this.isValuesModified()) {
        this.service
          .updateItem(this.validateNewItem(this.editOrCreateForm.value))
          .subscribe((data) => {
            if (!data.res) {
              this.toast.error(data.errors.join('\n'));
            } else {
              this.toast.success('პროდუქტი განახლდა წარმატებით');
              this.router.navigateByUrl('');
            }
          });
      } else {
        this.toast.warning('პროდუქტი არ არის შეცვლილი');
      }
    } else {
      this.service
        .addItem({
          ...this.editOrCreateForm.value,
          id: 0,
          createdBy: this.loggedUser.id,
        })
        .subscribe((data) => {
          this.toast.success('პროდუქტი შეიქმნა წარმატებით');
          this.router.navigateByUrl('');
        });
    }
  }

  isValuesModified() {
    for (let value of Object.values(this.editOrCreateForm.value)) {
      if (value) {
        return true;
      }
    }
    return false;
  }
  validateNewItem(newItem: any) {
    let item: any = { id: this.item.id };
    const keys = Object.keys(newItem);
    for (let key of keys) {
      console.log(newItem[key]);
      if (newItem[key] == null) {
        item[key] = this.item[key];
      } else {
        item[key] = newItem[key];
      }
    }
    return item;
  }
}
