import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { LoginRegisterService } from '../login-register.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService:LoginRegisterService, private router:Router, private msgService: ToastrService ){}
  canActivate(): boolean {
    if(this.authService.isLoggedIn()){
      return true
    }
    else{
      this.msgService.warning("ავტორიზაცია საჭიროა","გაფრთხილება!")
      this.router.navigateByUrl("login")
      return false
    }
  }
}
