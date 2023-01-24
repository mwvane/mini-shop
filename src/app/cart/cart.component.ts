import { Component, OnInit } from '@angular/core';
import {faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartIcon = faCartShopping
  cartItems: any
  selectedQuantity: number = 1
  constructor(private service: ItemService){
    
  }
  ngOnInit(): void {
    this.service.getCartItems().subscribe(data => {
      this.cartItems = data
    })
  }
  onDelete(id: number){
    this.service.deleteCartItem(id).subscribe(data => {
      if(data){
        this.service.getCartItems().subscribe(data => {
          this.cartItems = data
        })
      }
    })
  }
}
