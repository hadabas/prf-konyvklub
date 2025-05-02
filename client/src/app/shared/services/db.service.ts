import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/User';
import { Book } from '../model/Book';
import { Club } from '../model/Club';

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

  getBookTitles() {
    return this.http.get<string[]>('http://localhost:5000/app/getBookTitles', {withCredentials: true});
  }




  registerBook(book: Book) {
    // HTTP POST request
    const body = new URLSearchParams();

    body.set('cim', book.cim);
    body.set('ev', book.ev);
    body.set('mufaj', book.mufaj);
    body.set('szerzo', book.szerzo);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    console.log("A BODY TARTALMA:", body)

    return this.http.post<Book>('http://localhost:5000/app/registerBook', body, {headers: headers});
  }

 
  registerClub(formData: any) {
      const body = new URLSearchParams();

      body.set('klubnev', formData.klubnev);
      body.set('kep_path', formData.kep_path);
      body.set('description', formData.description);
      body.set('kivalasztottKonyvek', JSON.stringify(formData.kivalasztottKonyvek));

      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      });

      console.log("A BODY TARTALMA:", body);

      return this.http.post<any>('http://localhost:5000/app/registerClub', body, {headers: headers});

  }

  addHonapKonyve(formData: any) {
    const body = new URLSearchParams();

    body.set('ev',formData.ev);
    body.set('honap',formData.honap);
    body.set('honap_konyve',formData.honap_konyve);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<any>('http://localhost:5000/app/registerHonapKonyve', body, {headers: headers});
  }



  //Manageclubs rész

  //Betöltéshez adat query-k
  mc_getUsers() {
    return this.http.get<string[]>('http://localhost:5000/app/mc_getUsers', {withCredentials: true});
  }

  mc_getClubNames() {
    return this.http.get<string[]>('http://localhost:5000/app/mc_getClubNames', {withCredentials: true});
  }

  //Hozzáadás és törlés
  mc_addClubMember(formData: any) {
      const body = new URLSearchParams();

      body.set('felhasznalonev', formData.felhasznalonev);
      body.set('klubnev', formData.klubnev);

      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      });

      console.log("A BODY TARTALMA:", body);

      return this.http.post<any>('http://localhost:5000/app/mc_addClubMember', body, {headers: headers});
  }


  mc_deleteClubMember(formData: any) {
      const body = new URLSearchParams();

      body.set('klubnev', formData.klubnev);
      body.set('felhasznalonev', formData.felhasznalonev);
      

      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      });

      console.log("A BODY TARTALMA:", body);

      return this.http.post<any>('http://localhost:5000/app/mc_deleteClubMember', body, {headers: headers});
  }
  




}
