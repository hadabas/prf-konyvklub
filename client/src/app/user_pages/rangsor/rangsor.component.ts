import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DbService } from '../../shared/services/db.service';
import { Rangsor } from '../../shared/model/Rangsor';

@Component({
  selector: 'app-rangsor',
  imports: [CommonModule],
  templateUrl: './rangsor.component.html',
  styleUrl: './rangsor.component.scss'
})
export class RangsorComponent implements OnInit {

  constructor(private db: DbService) {}

  Rangsor_tomb: Rangsor[] = [];
  Honapok = ["Január","Február","Március","Áprílis","Május","Június","Július","Augusztus","Szeptember","Október","November","December"];

  loadRangsor() {
        this.db.getRangsor().subscribe((res: any) => {
          res.map((rangsor_entry: any) => {
            const rangsoradat: Rangsor = {
              ev: rangsor_entry.ev,
              honap: rangsor_entry.honap,
              honap_konyve: rangsor_entry.honap_konyve,
              elsohelyezett: rangsor_entry.elsohelyezett,
              masodikhelyezett: rangsor_entry.masodikhelyezett,
              harmadikhelyezett: rangsor_entry.harmadikhelyezett
            }
            this.Rangsor_tomb.push(rangsoradat);
          })
          console.log(this.Rangsor_tomb);
      });
  }

  ngOnInit() {
    this.loadRangsor();
  }

}
