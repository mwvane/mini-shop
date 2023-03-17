import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ItemService } from '../service/product.service';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FileService } from '../service/file.service';
import { FileType } from '../enums/fileType';

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
  productImages: any[] = [];
  productDocument: any;
  defaultImageType: FileType = FileType.AllImages;
  defaultDocumentType: FileType = FileType.Pdf;
  constructor(
    private route: ActivatedRoute,
    private service: ItemService,
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService,
    private fileService: FileService
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

  onUplaodImage() {
    alert();
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
              debugger
              if(this.productImages && this.productImages.length) {
                this.fileService
                  .uploadProductImages(this.item.id, this.productImages)
                  .subscribe((data) => {
                    if (data) {
                      console.log('images uploaded');
                    }
                  });
              }
              if (this.productDocument && this.productDocument.length) {
                this.fileService
                  .uploadProductDocuments(this.item.id, this.productDocument)
                  .subscribe((data) => {
                    if (data) {
                      console.log('documents uploaded');
                    }
                  });
              }
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
          if (data.res) {
            this.toast.success('პროდუქტი შეიქმნა წარმატებით');
            if (this.productImages &&  this.productImages.length) {
              this.fileService
                .uploadProductImages(Number(data.res), this.productImages)
                .subscribe((data) => {
                  if (data) {
                    console.log('images uploaded');
                  }
                });
            }
            if (this.productDocument && this.productDocument.length) {
              this.fileService
                .uploadProductDocuments(Number(data.res), this.productDocument)
                .subscribe((data) => {
                  if (data) {
                    console.log('documents uploaded');
                  }
                });
            }
            this.router.navigateByUrl('');
          }
        });
    }
  }

  onSelectImage(data: any) {
    debugger;
    this.productImages = data;
  }

  onSelectDocument(data: any) {
    this.productDocument = data;
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
