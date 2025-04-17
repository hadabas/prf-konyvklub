import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }


  // Visszaadja a felhasználót, aki be van logolva. A szerver oldalon ez csak akkor kerül lefutásra, ha a felhasználó be van jelentkezve, egyébként hibát dob.
  // Nem ugyan az, mint a checkAuth, ez a konkrét felhasználót kéri le, a jelszaván kívül minden adatával.
  getUser() {
    return this.http.get<User>('http://localhost:5000/app/getUser', {withCredentials: true});
  }

}
