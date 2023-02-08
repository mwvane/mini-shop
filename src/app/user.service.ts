import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from './Model/result';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}
  baseUrl = "https://localhost:7129/api/User"
  RemoveUser(userId: number){
    debugger
    return this.http.post<Result>(`${this.baseUrl}/deleteUser`,userId)
  }
}
