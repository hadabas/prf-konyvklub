import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DbService } from '../../shared/services/db.service';
import { Club } from '../../shared/model/Club';
import { RegSuccessDialogComponent } from '../../modal_windows/sikeres-regisztracio/reg-success';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-klubcsatlakozas',
  imports: [CommonModule],
  templateUrl: './klubcsatlakozas.component.html',
  styleUrl: './klubcsatlakozas.component.scss'
})
export class KlubcsatlakozasComponent implements OnInit {
  megNemTagja: any[] = []
  marTagja: any[] = []

  constructor(private db: DbService, private dialog: MatDialog, private router: Router){}

  loadKlubok() {
    this.db.getUser().subscribe(user => {
      this.db.user_Klubcsat_init(user).subscribe((res: any) => {
        this.megNemTagja = res.megNemTagja;
        this.marTagja = res.marTagja;
      });
    });
  }

  ngOnInit(): void {
    this.loadKlubok();
  }

  onCsatlakozasClick(klub: Club) {
    
    this.db.getUser().subscribe(user => { 
      this.db.user_Klubcsat_csatlakozas(klub,user.username).subscribe((res: any) => {
        this.dialog.open(RegSuccessDialogComponent, {
                      width: '600px',
                      maxWidth: '95vw',
                      data: {
                      title: 'Siker!',
                      message: res.message
                      }
                    });
        

      this.loadKlubok();
      
      });
     });

    


  }

}
