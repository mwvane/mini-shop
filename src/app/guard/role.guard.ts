import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginRegisterService } from '../login-register.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: LoginRegisterService,
    private msgService: ToastrService,
    private router: Router
  ) {}
  canActivate() {
    if (
      this.authService.userPayload &&
      this.authService.userPayload.role === 'admin'
    ) {
      return true;
    } else {
      this.router.navigateByUrl('home');
      this.msgService.warning('თქვენ არ გაქვთ უფლება', 'გაფრთხილება!');
      return false;
    }
  }
}
