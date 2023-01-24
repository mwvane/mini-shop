import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-quantity-selector',
  templateUrl: './quantity-selector.component.html',
  styleUrls: ['./quantity-selector.component.css'],
})
export class QuantitySelectorComponent {
  minusIcon = faMinus;
  plusIcon = faPlus;
  @Input() currentQuantity: number = 1;
  @Input() maxValue = 100;
  @Output() change = new EventEmitter<number>();
  onPlus() {
    if (this.currentQuantity < this.maxValue) {
      this.currentQuantity++;
    }
    this.change.emit(this.currentQuantity);
  }
  onMinus() {
    if (this.currentQuantity > 1) {
      this.currentQuantity--;
      this.change.emit(this.currentQuantity);
    }
  }
}
