import { Component, Input } from '@angular/core';
import { Item } from '../item';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input() item: any
  cartIcon = faCartShopping
}
