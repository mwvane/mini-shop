import { Component, Input } from '@angular/core';
import { retry } from 'rxjs';
import { Item } from 'src/app/Model/item';
import { ItemService } from 'src/app/service/item.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent {
  @Input() openDialog:boolean = false
  @Input() data:any
  product: any
  constructor(private productService: ItemService){

  }
  onClose(){
    this.openDialog = false
  }
  // getProductById(id:number){
  //   this.productService.getProductById(id).subscribe(data => {
  //     if(data){
  //       return data
  //     }
  //     return ""
  //   })
  //   return "null"
  // }
}
