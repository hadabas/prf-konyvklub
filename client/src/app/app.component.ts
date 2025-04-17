import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { DbService } from './shared/services/db.service';
import { CommonModule } from '@angular/common';
import { User } from './shared/model/User';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Virtuális könyvklub';

  isLoggedIn = false;
  currentUser: any = null;

  constructor(private authService: AuthService, private router: Router, private dbService: DbService) {}

  ngOnInit() {
    try {
      
    this.authService.checkAuth().subscribe(value => {
      if(value){
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
    
    
    this.dbService.getUser().subscribe(user => {
      if(user){
        this.currentUser = user;
        console.log(this.currentUser)
      } else {
        console.log("Hiba");
      }
    
  });

  } catch(error) {
    console.log("Nem vagy bejelentkezve.")
  }
    
}

  

  logoutOnClick() {
    this.authService.logout().subscribe(res => {
      if(res) {
        alert('Sikeres kijelentkezés!');
        this.router.navigate(['/login']);
        window.location.reload();
      } else {
        alert("Hiba történt a szerverrel való kommunikáció során.");
        window.location.reload();
      }
    })

  }


}
