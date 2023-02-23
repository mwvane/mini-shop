import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/Model/product';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent {
  @Input() openDialog: boolean = false;
  @Input() data: Product = {
    name: '',
    price: 0,
    quantity: 0,
  };
  @Output() submit = new EventEmitter();
  @Output() close = new EventEmitter();
  constructor(public modalService: ModalService){}

  roles: string[] = ['admin', 'user', 'seller'];

  onSubmit() {
    this.submit.emit(this.data);
  }
  onClose() {
    this.modalService.openProductModal = false
  }
}
