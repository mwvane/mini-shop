import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginRegisterService } from '../login-register.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService:LoginRegisterService, private router:Router){}
  canActivate(): boolean {
    if(this.authService.isLoggedIn()){
      return true
    }
    else{
      alert("Must login first")
      this.router.navigateByUrl("login")
      return false
    }
  }
}
