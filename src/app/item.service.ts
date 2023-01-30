import { EnvironmentInjector, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './item';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient) {}
  baseUrl: string = 'https://localhost:7129/api/Item';
  getAllItems() {
    return this.http.get(`${this.baseUrl}/getAllItems`);
  }

  getCartItems(userId: number) {
    return this.http.get(`${this.baseUrl}/getCartItems?id=${userId}`);
  }

  getItemQuantity(id: number) {
    return this.http.get(`${this.baseUrl}/getItemQuantity?id=${id}`);
  }

  getCartItemsCount(id: number) {
    return this.http.get(`${this.baseUrl}/getCartCount?id=${id}`);
  }

  updateCartItemQuantity(id: number, quantity: number) {
    return this.http.post(`${this.baseUrl}/updateCartItemQuantity`, {
      id,
      quantity,
    });
  }

  deleteCartItem(id: number) {
    return this.http.post(`${this.baseUrl}/deleteCartItem`, id);
  }
  addToCart(item: any, userId: number, quantity: number = 0) {
    return this.http.post(`${this.baseUrl}/addToCart`, {
      itemId: item.id,
      userId: userId,
      quantity,
    });
  }

  //admin-----------
  removeItem(itemId:number){
    return this.http.post(`https://localhost:7129/api/Admin/removeItem`, itemId)
  }
}
