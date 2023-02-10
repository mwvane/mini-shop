import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private msgService: ToastrService
  ) {}
  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.msgService.warning('ავტორიზაცია საჭიროა', 'გაფრთხილება!');
      this.router.navigateByUrl('login');
      return false;
    }
  }
}
