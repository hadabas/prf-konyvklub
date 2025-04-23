import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DbService } from '../../shared/services/db.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { RegSuccessDialogComponent } from '../../modal_windows/sikeres-regisztracio/reg-success';

@Component({
  selector: 'app-honapkonyve',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './honapkonyve.component.html',
  styleUrl: './honapkonyve.component.scss'
})
export class HonapkonyveComponent implements OnInit{

  honapKonyveForm!: FormGroup;
  konyvcimek: any[] = [];

  constructor(private fb: FormBuilder, private db: DbService, private router: Router, private dialog: MatDialog) {}


  ngOnInit() {

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;

    this.honapKonyveForm = this.fb.group({
      ev: [currentYear, Validators.required],
      honap: [currentMonth, Validators.required],
      honap_konyve: ['', Validators.required]
    });

    this.db.getBookTitles().subscribe(bookTitles => {
      this.konyvcimek = bookTitles;
      console.log(bookTitles);
    });

    

  }

  createHonapKonyve() {
    this.db.addHonapKonyve(this.honapKonyveForm.value).subscribe({
      next: (answer) => {
        console.log(answer);
        this.dialog.open(RegSuccessDialogComponent, {
          width: '600px',
          maxWidth: '95vw',
          data: {
          title: 'Siker.',
          message: 'Sikeres hónap könyve felvétel!'
          }
        });
      },
      error: (err) => {
        alert("Erre a hónapra már meg lett választva a hónap könyve.")
      }
    });
  }


}
