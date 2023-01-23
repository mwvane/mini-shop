import { EnvironmentInjector, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) {}
  getItems(){
    return this.http.get("https://localhost:7129/api/Item/getItems")
  }
}
