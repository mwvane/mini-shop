import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { subscribeOn } from 'rxjs';
import { Result } from '../Model/result';
import { Voucher } from '../Model/voucher';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  constructor(private http: HttpClient) { }
  private baseUrl:string = "https://localhost:7129/api/Voucher"
  getAllVouchers(){
    return this.http.get<Voucher[]>(`${this.baseUrl}/getAllVouchers`)
  }
  generateKey(){
    return this.http.get<Result>(`https://localhost:7129/api/Voucher/generateVoucherKey`);
  }
  create(voucher: Voucher){
    return this.http.post<Result>(`${this.baseUrl}/createVoucher`, voucher)
  }
  update(voucher: Voucher){
    
  }
}
