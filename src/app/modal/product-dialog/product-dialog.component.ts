import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from 'src/app/Model/item';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent {
  @Input() openDialog: boolean = false;
  @Input() data: Item = {
    name: '',
    price: 0,
    quantity: 0,
  };
  @Output() submit = new EventEmitter();
  @Output() close = new EventEmitter();
  submitted: boolean = false;
  roles: string[] = ['admin', 'user', 'seller'];

  onSubmit() {
    this.submitted = true;
    this.submit.emit(this.data);
  }
  onClose() {
    this.openDialog = false;
    this.close.emit();
  }
}
