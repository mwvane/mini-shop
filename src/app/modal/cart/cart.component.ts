import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  @Input() openDialog: boolean = false;
  @Input() data: any[] = [];
  @Output() remove = new EventEmitter();
  @Output() decrease = new EventEmitter();
  @Output() increase = new EventEmitter();
  @Output() open = new EventEmitter();

  constructor(public modalService: ModalService) {}

  onClose() {
    this.modalService.openCartModal = false;
  }
  onRemove(id: number) {
    this.remove.emit(id);
  }

  onDecrease(cartItem: any) {
    this.decrease.emit(cartItem);
  }

  onIncrease(cartItem: any) {
    this.increase.emit(cartItem);
  }
  onOpen(event: any) {
    this.open.emit(event);
  }
}
