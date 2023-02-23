import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ModalService } from '../service/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authService: AuthService, private modalService: ModalService) {}
  @Output() myOrders = new EventEmitter()
  @Output() logout = new EventEmitter()
  @Output() generateVoucher = new EventEmitter()
  @Output() vouchers = new EventEmitter()
  loggedUser = this.authService.userPayload;
  onMyProduct() {
    this.modalService.openMyOrdersModal = true
  }
  openTable(){

  }
  onLogout(){
    this.logout.emit()
  }
  onVouchers(){
    this.modalService.openVouchersModal = true
  }
  onGenerateVoucher(){
    this.modalService.openGenerateVoucherModal = true
  }
}
