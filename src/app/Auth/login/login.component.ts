import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginRegisterService } from 'src/app/login-register.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  });
  constructor(
    private router: Router,
    private service: LoginRegisterService,
    private toast: ToastrService
  ) {}
  onSignup() {
    this.router.navigateByUrl('signup');
  }
  onSubmit() {
    this.service.login(this.loginForm.value).subscribe((data) => {
      const result: any = data;
      if (result.res) {
        this.service.storeToken(result.res.token);
        this.service.userPayload = this.service.decodeToken();
        this.router.navigateByUrl('home');
        this.toast.success('თქვენ წარმატებით გაიარეთ ავტორიზაცია');
      } else {
        this.toast.error(result.errors.join('\n'));
      }
    });
  }
}
