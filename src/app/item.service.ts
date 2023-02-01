import { EnvironmentInjector, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './Model/item';
import { ThisReceiver } from '@angular/compiler';
import { Observable } from 'rxjs';
import { Result } from './Model/result';
import { CartItem } from './Model/cartItem';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient) {}
  baseUrl: string = 'https://localhost:7129/api/Item';
  getAllItems() {
    return this.http.get<Item[]>(`${this.baseUrl}/getAllItems`);
  }
  getItem(id:number){
    return this.http.get<Item>(`${this.baseUrl}/getItem?id=${id}`)
  }

  getCartItems(userId: number) {
    return this.http.get<CartItem[]>(`${this.baseUrl}/getCartItems?id=${userId}`);
  }

  getItemQuantity(id: number) {
    return this.http.get(`${this.baseUrl}/getItemQuantity?id=${id}`);
  }

  getCartItemsCount(id: number) {
    return this.http.get<number>(`${this.baseUrl}/getCartCount?id=${id}`);
  }

  updateCartItemQuantity(id: number, quantity: number) {
    return this.http.post<Result>(`${this.baseUrl}/updateCartItemQuantity`, {
      id,
      quantity,
    });
  }

  deleteCartItem(id: number) {
    return this.http.post(`${this.baseUrl}/deleteCartItem`, id);
  }
  addToCart(item: Item, userId: number, quantity: number = 0) {
    return this.http.post<Result>(`${this.baseUrl}/addToCart`, {
      itemId: item.id,
      userId: userId,
      quantity,
    });
  }

  //admin-----------
  removeItem(itemId:number) {
    return this.http.post<Result>(`https://localhost:7129/api/Admin/removeItem`, itemId)
  }
  updateItem(newItem:Item){
    return this.http.post<Result>(`https://localhost:7129/api/Admin/updateItem`, newItem)
  }
  addItem(newItem:any){
    return this.http.post(`https://localhost:7129/api/Admin/createItem`, newItem)
  }
}
