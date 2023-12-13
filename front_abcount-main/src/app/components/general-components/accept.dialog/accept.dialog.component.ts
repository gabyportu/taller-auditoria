import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accept.dialog',
  templateUrl: './accept.dialog.component.html',
  styleUrls: ['./accept.dialog.component.css']
})
export class AcceptDialogComponent {

  public fName!: string;
  public fIndex: any;

  constructor(
    private modalRef: MatDialogRef<AcceptDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {title: string, message: string, action: Function }
  ) {}

  confirm() {
    this.modalRef.close();
    if (this.data.action) {
      this.data.action();
    }
  }
  cancel() {
    this.modalRef.close();
  }
}
