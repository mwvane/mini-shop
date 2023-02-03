import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {
  faAllergies,
  faCheckDouble,
  faEnvelope,
  faLock,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { CustomValidators } from 'customValidators';
import { LoginRegisterService } from 'src/app/login-register.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  checkIcon = faCheckDouble;
  userIcon = faUser;
  lockIcon = faLock;
  emailIcon = faEnvelope;
  signupForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      firstname: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastname: new FormControl(null),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl(null, [Validators.required]),
    },
    [CustomValidators.MatchValidator('password', 'confirmPassword')]
  );
  get passwordMatchError() {
    return (
      this.signupForm.getError('mismatch') &&
      this.signupForm.get('confirmPassword')?.touched
    );
  }
  constructor(
    private router: Router,
    private service: LoginRegisterService,
    private toast: ToastrService
  ) {}
  onSubmit() {
    this.service.signup(this.signupForm.value).subscribe((data) => {
      const result: any = data;
      if (result.res) {
        console.log('userCreated');
        this.toast.success("მომხმარებელი წარმატებით შეიქმნა")
        this.router.navigateByUrl('login');
      } else {
        this.toast.error(result.errors.join('\n'));
      }
    });
  }
}
