import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-regsuccess-dialog',
  templateUrl: './reg-success.html',
  styleUrls: ['./reg-success.scss'],
  imports: [MatIconModule, MatDialogModule, MatButtonModule]
})
export class RegSuccessDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<RegSuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}