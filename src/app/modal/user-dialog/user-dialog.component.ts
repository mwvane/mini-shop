import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserRole } from 'src/app/enums/userRole';
import { User } from 'src/app/Model/user';

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
  @Output() close = new EventEmitter();
  submitted: boolean = false;
  roles: string[] = [UserRole.Admin, UserRole.Client, UserRole.Seller];

  onSubmit() {
    this.submitted = true;
    this.submit.emit(this.data);
  }
  onClose() {
    this.openDialog = false;
    this.close.emit();
  }
}
