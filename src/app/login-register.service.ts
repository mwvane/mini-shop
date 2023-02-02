import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})
export class LoginRegisterService {
  baseUrl: string = 'https://localhost:7129/api/LoginRegister';
  userPayload:any
  constructor(private http: HttpClient) {
    this.userPayload = this.decodeToken()
  }
  login(payload: any) {
    return this.http.post(`${this.baseUrl}/login`, {
      username: payload.username,
      password: payload.password,
    });
  }
  signup(form: any) {
    const user = {
      firstname: form.firstname,
      lastname: form.lastname,
      email: form.email,
      password: form.password,
    };
    return this.http.post(`${this.baseUrl}/signup`, user);
  }
  storeToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  logOut() {
    if (this.isLoggedIn()) {
      debugger
      localStorage.removeItem('token');
    }
  }
  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token:any = this.getToken();
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token)
    
  }
}
