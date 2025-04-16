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
    const body = new URLSearchParams()
    body.set('username', username);
    body.set('password',password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/login', body, {headers: headers});
  }

  register(user: User) {
    // HTTP POST request
    const body = new URLSearchParams();

    body.set('username', user.username);
    body.set('email', user.email);
    body.set('password', user.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    console.log("A BODY TARTALMA:",body)

    return this.http.post('http://localhost:5000/app/register', body, {headers: headers});
  }

  
  logout() {}

  checkAuth() {}

}