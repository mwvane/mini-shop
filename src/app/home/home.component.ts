import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private service: ItemService) {}
  items: any;
  ngOnInit(): void {
    this.service.getItems().subscribe((data) => {
      this.items = data;
      console.log(this.items)
    });
  }
  item: Item = { name: 'Galaxy s10', quantity: 10, price: 1560 };
}
