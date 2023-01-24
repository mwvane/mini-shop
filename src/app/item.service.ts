import { EnvironmentInjector, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) {}
  getAllItems(){
    return this.http.get("https://localhost:7129/api/Item/getAllItems")
  }
  getCartItems(){
    return this.http.get("https://localhost:7129/api/Item/getCartItems")
  }
}
