import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginRegisterService {
  baseUrl: string = 'https://localhost:7129/api/LoginRegister';
  constructor(private http: HttpClient) {}
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
}
