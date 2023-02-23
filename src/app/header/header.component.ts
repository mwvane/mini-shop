import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ModalService } from '../service/modal.service';
import { State } from '../state/state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private modalService: ModalService,
    public state: State
  ) {}

  @Output() myOrders = new EventEmitter();
  @Output() logout = new EventEmitter();
  @Output() generateVoucher = new EventEmitter();
  @Output() vouchers = new EventEmitter();
  loggedUser = this.authService.userPayload;
  
  onMyProduct() {
    this.modalService.openMyOrdersModal = true;
  }
  onLogout() {
    this.logout.emit();
  }
  onVouchers() {
    this.modalService.openVouchersModal = true;
  }
  onGenerateVoucher() {
    this.modalService.openGenerateVoucherModal = true;
  }
}
