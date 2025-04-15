import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  // login
  login(username: string, password: string){
    //TODO
  }

  register() {}

  
  logout() {}

  checkAuth() {}

}