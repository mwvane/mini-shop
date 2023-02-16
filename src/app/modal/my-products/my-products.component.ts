import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css'],
})
export class MyProductsComponent {
  @Input() openDialog: boolean = false;
  @Input() data: any;
  @Output() close = new EventEmitter();
  product: any;
  onClose() {
    this.openDialog = false;
    this.close.emit();
  }
}
