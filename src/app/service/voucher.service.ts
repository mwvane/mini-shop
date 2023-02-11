import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Voucher } from '../Model/voucher';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  constructor(private http: HttpClient) { }
  getAllVouchers(){
    this.http.get<Voucher[]>()
  }
}
