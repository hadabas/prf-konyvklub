import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DbService } from '../../shared/services/db.service';
import { RegSuccessDialogComponent } from '../../modal_windows/sikeres-regisztracio/reg-success';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-manageclubs',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './manageclubs.component.html',
  styleUrl: './manageclubs.component.scss'
})
export class ManageclubsComponent {

  addClubMemberForm!: FormGroup;
  deleteClubMemberForm!: FormGroup;

  felhasznalonevek: any[] = [];
  klubnevek: any[] = [];


  constructor(private fb: FormBuilder, private db: DbService, private dialog: MatDialog) {}


  ngOnInit() {

    this.addClubMemberForm = this.fb.group({
      felhasznalonev: ['', Validators.required],
      klubnev: ['', Validators.required]
    });

    this.deleteClubMemberForm = this.fb.group({
      klubnev: ['', Validators.required],
      felhasznalonev: ['', Validators.required]
    });

    this.db.mc_getUsers().subscribe(users => {
      this.felhasznalonevek = users;
      console.log(users);
    });

    this.db.mc_getClubNames().subscribe(clubs => {
      this.klubnevek = clubs;
      console.log(clubs);
    });

  }


  addClubMember() {
    this.db.mc_addClubMember(this.addClubMemberForm.value).subscribe({
          next: (answer) => {
            console.log(answer);
            this.dialog.open(RegSuccessDialogComponent, {
              width: '600px',
              maxWidth: '95vw',
              data: {
              title: 'Sikeres tagfelvétel.',
              message: 'Sikeresen felvette az új tagot a megadott klubba!'
              }
            });
          },
          error: (err) => {
            console.log(err);
            alert("A klubnak már tagja a felvenni kívánt személy.")
          }
        });   
  }

  deleteClubMember() {
    this.db.mc_deleteClubMember(this.deleteClubMemberForm.value).subscribe({
      next: (answer) => {
        console.log(answer);
        this.dialog.open(RegSuccessDialogComponent, {
          width: '600px',
          maxWidth: '95vw',
          data: {
          title: 'Sikeres törlés.',
          message: 'Sikeresen kitörölte a klubból a tagot.'
          }
        });
      },
      error: (err) => {
        console.log(err);
        alert("A klubban nincs benne a kiválasztott felhasználó, ezért nem lehet törölni.")
      }
    });   
}

}
