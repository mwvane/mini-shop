import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../Model/result';
import { User } from '../Model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}
  baseUrl = "https://localhost:7129/api/User"

  UpdateUser(newUser:User){
    debugger
    return this.http.post<Result>(`${this.baseUrl}/updateUser`,newUser)
  }
  RemoveUser(userId: number[]){
    debugger
    return this.http.post<Result>(`${this.baseUrl}/deleteUser`,userId)
  }
}
