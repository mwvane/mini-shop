import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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
  @Output() increase = new EventEmitter();
  @Output() decrease = new EventEmitter();
  onPlus() {
    this.increase.emit();
  }
  onMinus() {
    if (this.currentQuantity > 1) {
      this.decrease.emit();
    }
  }
}
