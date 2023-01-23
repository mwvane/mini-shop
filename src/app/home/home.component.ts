import { Component } from '@angular/core';
import { Item } from '../item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  item: Item = {name: "Galaxy s10", quantity: 10, price: 1560}
}
