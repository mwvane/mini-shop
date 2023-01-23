import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUserPlus, faLock, faEnvelope,faCheckDouble} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  checkIcon = faCheckDouble
  lockIcon = faLock
  emailIcon = faEnvelope
  userPlusIcon = faUserPlus
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  });
  constructor(private router: Router){

  }
  onSignup(){
    this.router.navigateByUrl("signup")
  }
  onSubmit() {}
}

