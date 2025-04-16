import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router ) {}

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
      this.authService.login(username,password).subscribe({
        next: (data) => {
          //TODO navigáció másik oldalra
          console.log("Az adat:"+ data);
        }, error: (err) => {
          console.log("ERROR ÁG");
          console.log(err);
        }
      });

    }
  }

  jumpToRegister() {
    this.router.navigate(['/register']);
  }

}
