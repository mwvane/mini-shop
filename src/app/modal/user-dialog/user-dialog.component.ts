import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserRole } from 'src/app/enums/userRole';
import { User } from 'src/app/Model/user';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css'],
})
export class UserDialogComponent {
  @Input() openDialog: boolean = false;
  @Input() data: User = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: 'User',
  };
  @Output() submit = new EventEmitter();
  submitted: boolean = false;
  roles: string[] = [UserRole.Admin, UserRole.Client, UserRole.Seller];

  constructor(public modalService: ModalService){}
  onSubmit() {
    this.submitted = true;
    this.submit.emit(this.data);
  }
  onClose() {
    this.modalService.openUserModal = false
  }
}
