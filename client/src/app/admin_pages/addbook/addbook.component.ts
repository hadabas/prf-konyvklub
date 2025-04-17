import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { MatDialog } from '@angular/material/dialog';
import { RegSuccessDialogComponent } from '../../modal_windows/sikeres-regisztracio/reg-success';
import { DbService } from '../../shared/services/db.service';

@Component({
  selector: 'app-addbook',
  imports: [ReactiveFormsModule],
  templateUrl: './addbook.component.html',
  styleUrl: './addbook.component.scss'
})
export class AddbookComponent {

  addBookForm!: FormGroup;

  constructor(private fb: FormBuilder, private db: DbService ,  private router: Router, private dialog: MatDialog ) {}

  ngOnInit(): void {
    this.addBookForm = this.fb.group({
      cim: ['', [Validators.required]],
      ev: ['', [Validators.required, Validators.min(0), Validators.max(2030)]],
      mufaj: ['', [Validators.required]],
      szerzo: ['', [Validators.required]]
    });
  }

  addBook(): void {
      if (this.addBookForm.valid) {
            console.log('Form data:', this.addBookForm.value);
            this.db.registerBook(this.addBookForm.value).subscribe({
              next: (data) => {
                console.log(data);
                this.router.navigate(['/dashboard']);
                this.dialog.open(RegSuccessDialogComponent, {
                              width: '600px',
                              maxWidth: '95vw',
                              data: {
                                  title: 'Sikeres regisztráció!',
                                  message: ''
                              }
                            });
              }, error: (err) => {
                console.log(err);
              }
            })
          } else {
            console.log('Form is not valid.');
          }
        }
    }
  

/*
          this.dialog.open(ErrorDialogComponent, {
            width: '600px',     
            maxWidth: '95vw',
            data: {
              title: 'Bejelentkezés sikertelen',
              message: 'Hibás felhasználónév vagy jelszó. Kérlek, próbáld újra.'
            }
          });
*/