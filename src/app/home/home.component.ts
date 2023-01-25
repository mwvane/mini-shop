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
    this.service.getAllItems().subscribe((data) => {
      this.items = data;
      console.log(this.items);
    });
  }
  onAddToCart(item: any) {
    let result:any
    this.service.addToCart(item, 4, 1).subscribe((data) => {
      if(data.hasOwnProperty('res')){
        result = data
        if(!result.res){
          alert(result.errors.join("\n"))
        }
      }
    });
  }
}
