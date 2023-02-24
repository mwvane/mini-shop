import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../Model/result';
import { Voucher } from '../Model/voucher';

@Injectable({
  providedIn: 'root',
})
export class VoucherService {
  constructor(private http: HttpClient) {}
  private baseUrl: string = 'https://localhost:7129/api/Voucher';
  getAllVouchers() {
    return this.http.get<Voucher[]>(`${this.baseUrl}/getAllVouchers`);
  }
  getVoucher(key: string, productId:number) {
debugger
    return this.http.get<Result>(`${this.baseUrl}/getVoucher?key=${key}&productId=${productId}`);
  }
  generateKey() {
    return this.http.get<Result>(`${this.baseUrl}/generateVoucherKey`);
  }
  create(voucher: Voucher) {
    return this.http.post<Result>(`${this.baseUrl}/createVoucher`, voucher);
  }
  update(voucher: Voucher) {
    return this.http.post<Result>(`${this.baseUrl}/updateVoucher`, voucher);
  }
  delete(voucherIds: number[]) {
    return this.http.post<Result>(`${this.baseUrl}/deleteVoucher`, voucherIds);
  }
}
