import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  @Input() item: any;
  @Input() loggedUser: any;
  @Output() addToCart = new EventEmitter();
  @Output() editItem = new EventEmitter<number>();
  @Output() removeItem = new EventEmitter<number>();
  @Output() addItem = new EventEmitter<number>();
  constructor(private msgService: ToastrService) {}

  onAddToCart(e: any) {
    e.stopPropagation();
    e.preventDefault();
    if (this.item.quantity) {
      this.addToCart.emit();
    } else {
      this.msgService.warning('პროდუქტის მარაგი ამოიწურა');
    }
  }
  onRemove(e: any) {
    e.stopPropagation();
    e.preventDefault();
    if (
      this.loggedUser.role === 'admin' ||
      this.loggedUser.id == this.item.createdBy
    ) {
      this.removeItem.emit(this.item.id);
    }
  }
  onEdit() {
    debugger;
    if (
      this.loggedUser.role === 'admin' ||
      this.loggedUser.id == this.item.createdBy
    ) {
      this.editItem.emit(this.item.id);
    }
  }
}
