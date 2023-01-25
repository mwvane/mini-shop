import { EnvironmentInjector, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './item';

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
    debugger
    return this.http.get(`${this.baseUrl}/getCartCount?id=${id}`);
  }
  updateCartItemQuantity(id: number, quantity: number) {
    return this.http.post(`${this.baseUrl}/updateCartItemQuantity`, {
      id,
      quantity,
    });
  }
  deleteCartItem(id: number) {
    return this.http.post(`${this.baseUrl}/deleteCartItem`, { id });
  }
  addToCart(item: any, userId: number, quantity: number) {
    return this.http.post(`${this.baseUrl}/addToCart`, {
      itemId: item.id,
      userId: userId,
      quantity,
    });
  }
}
