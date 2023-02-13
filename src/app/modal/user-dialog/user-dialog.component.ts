import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  roles: string[] = ['admin', 'user', 'seller'];

  onSubmit() {
    this.submitted = true;
    this.submit.emit(this.data);
  }
  onClose() {
    this.openDialog = false;
    this.close.emit();
  }
}
