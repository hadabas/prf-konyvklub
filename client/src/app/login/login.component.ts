import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../modal_windows/login-error/login-error.component'; // Modális error window componens





@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private dialog: MatDialog ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log('Bejelentkezési adatok:', username, password);
      // AuthService login meghívása itt
      this.authService.login(username, password).subscribe({
        next: (data) => {
          console.log("Szöveges válasz: " + data); // Itt szöveges adatot kapsz
          this.router.navigate(['/dashboard']);


        },
        error: (err) => {
          console.log("ERROR ÁG");
          console.log(err);
          this.dialog.open(ErrorDialogComponent, {
            width: '600px',     
            maxWidth: '95vw',
            data: {
              title: 'Bejelentkezés sikertelen',
              message: 'Hibás felhasználónév vagy jelszó. Kérlek, próbáld újra.'
            }
          });
        }
      });

      

    }
  }

  jumpToRegister() {
    this.router.navigate(['/register']);
  }

}
