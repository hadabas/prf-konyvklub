import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DbService } from '../../shared/services/db.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegSuccessDialogComponent } from '../../modal_windows/sikeres-regisztracio/reg-success';

@Component({
  selector: 'app-addclub',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './addclub.component.html',
  styleUrl: './addclub.component.scss'
})


export class AddclubComponent implements OnInit {
  addClubForm!: FormGroup;

  konyvcimek: any[] = []; // Ezt töltjük majd fel az API-ból

  constructor(private fb: FormBuilder, private db: DbService, private router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    this.addClubForm = this.fb.group({
      klubnev: ['', Validators.required],
      kep_path: [null, Validators.required],
      description: ['', Validators.required],
      kivalasztottKonyvek: [[], Validators.required], // Tömb az ID-khoz
    });

    this.db.getBookTitles().subscribe(bookTitles => {
      this.konyvcimek = bookTitles;
      console.log(bookTitles);
    });


  }

  addClub() {
    this.db.registerClub(this.addClubForm.value).subscribe(data => {
      //console.log("A VALASZ A SZERVERTOL: ",data)

      this.dialog.open(RegSuccessDialogComponent, {
                    width: '600px',
                    maxWidth: '95vw',
                    data: {
                        title: 'Sikeres klubregisztráció!',
                        message: '-'
                    }
                  });
                this.router.navigate(['/dashboard']);
    });
  }

}