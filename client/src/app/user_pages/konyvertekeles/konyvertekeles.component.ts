import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DbService } from '../../shared/services/db.service';
import { RegSuccessDialogComponent } from '../../modal_windows/sikeres-regisztracio/reg-success';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-konyvertekeles',
  imports: [CommonModule],
  templateUrl: './konyvertekeles.component.html',
  styleUrl: './konyvertekeles.component.scss'
})
export class KonyvertekelesComponent implements OnInit {

  ertekelesek = [1, 2, 3, 4, 5];
  marErtekelte: any[] = []
  megNemErtekelte: any[] = []


  constructor(private db: DbService, private dialog: MatDialog){}


  loadKonyvek() {
    this.db.getUser().subscribe(user => {
      this.db.user_KonyvekInit(user).subscribe((res: any) => {
        this.marErtekelte = res.marErtekelte;
        this.megNemErtekelte = res.megNemErtekelte;
      });
    });
  }


  ngOnInit(): void {
    this.loadKonyvek();
  }

  onErtekelesClick(konyv: any, ertekeles: number | string) {
    // alert(konyv.cim+" "+ertekeles); működik.
    this.db.getUser().subscribe(user => {
      this.db.user_KonyvErtekeles(konyv,ertekeles,user.username).subscribe((res: any) => {
        this.dialog.open(RegSuccessDialogComponent, {
                    width: '600px',
                    maxWidth: '95vw',
                    data: {
                    title: 'Siker!',
                    message: res.message
                    }
                  });
              this.loadKonyvek();
      });
    });
  }

}
