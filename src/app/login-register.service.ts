import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginRegisterService {
  constructor(private http: HttpClient) {}
  login(payload: any) {
    return this.http.post('https://localhost:7129/api/LoginRegister/login', {
      username: payload.username,
      password: payload.password,
    });
  }
}
