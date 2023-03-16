import { Injectable } from '@angular/core';
import { BlockableUI } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }
  openMyOrdersModal:boolean = false;
  openGenerateVoucherModal:boolean = false;
  openVouchersModal:boolean = false;
  openProductModal: boolean = false;
  openUserModal: boolean = false;
  openCartModal: boolean = false;
}
