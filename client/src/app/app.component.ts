import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Virtuális könyvklub';

  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {

    

    this.authService.checkAuth().subscribe(value => {
      if(value){
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });  

  }

  

  logoutOnClick() {
    this.authService.logout().subscribe(res => {
      if(res) {
        alert(res);
        this.router.navigate(['/login']);
        window.location.reload();
      } else {
        alert("Hiba történt a szerverrel való kommunikáció során.");
        window.location.reload();
      }
    })

  }


}
