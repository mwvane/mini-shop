import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  faUserPlus,
  faLock,
  faEnvelope,
  faCheckDouble,
} from '@fortawesome/free-solid-svg-icons';
import { LoginRegisterService } from 'src/app/login-register.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  checkIcon = faCheckDouble;
  lockIcon = faLock;
  emailIcon = faEnvelope;
  userPlusIcon = faUserPlus;
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  });
  constructor(private router: Router, private service: LoginRegisterService) {}
  onSignup() {
    this.router.navigateByUrl('signup');
  }
  onSubmit() {
    this.service.login(this.loginForm.value).subscribe((data) => {
      const result: any = data;
      if (result.res) {
        this.service.storeToken(result.res.token)
        localStorage.setItem('loggedUser', JSON.stringify(result.res));
        this.router.navigateByUrl('home');
      } else {
        alert(result.errors.join('\n'));
      }
    });
  }
}
