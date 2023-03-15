import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../Model/product';
import { Result } from '../Model/result';
import { CartItem } from '../Model/cartItem';
import { User } from '../Model/user';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient) {}
  baseUrl: string = 'https://localhost:7129/api/Item';
  getAllProducts() {
    return this.http.get<Product[]>(`${this.baseUrl}/getAllProducts`);
  }
  getProduct(id: number) {
    return this.http.get<Product>(`${this.baseUrl}/getProductById?id=${id}`);
  }

  getCartItems(userId: number) {
    return this.http.get<CartItem[]>(
      `${this.baseUrl}/getCartItems?id=${userId}`
    );
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

  addToCart(cartItem: any) {
    return this.http.post<Result>(`${this.baseUrl}/addToCart`, cartItem);
  }

  updateCartItem(cartItem: CartItem) {
    return this.http.post<Result>(`${this.baseUrl}/updateCartItem`, cartItem);
  }

  buyProduct(id: number) {
    return this.http.post<Result>(`${this.baseUrl}/buyProduct`, id);
  }

  getOrders(userId: number) {
    return this.http.get<Result>(`${this.baseUrl}/getOrders?userId=${userId}`);
  }
  getAllOrders() {
    return this.http.get<Result>(`${this.baseUrl}/getAllOrders`);
  }
  getProductById(id: number) {
    return this.http.get(`${this.baseUrl}/getProductById?id=${id}`);
  }

  //admin-----------
  getAllUsers() {
    return this.http.get<User[]>(`${this.baseUrl}/getAllUsers`);
  }

  removeItem(itemIds: any[]) {
    return this.http.post<Result>(
      `https://localhost:7129/api/Admin/removeItem`,
      itemIds
    );
  }

  updateItem(newItem: Product) {
    return this.http.post<Result>(
      `https://localhost:7129/api/Admin/updateItem`,
      newItem
    );
  }

  addItem(newItem: any) {
    debugger;
    return this.http.post<Result>(
      `https://localhost:7129/api/Admin/createItem`,
      newItem
    );
  }
}
