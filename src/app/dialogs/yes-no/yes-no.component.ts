import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-yes-no',
  templateUrl: './yes-no.component.html',
  styleUrls: ['./yes-no.component.css']
})
export class YesNoComponent {
  caption:string = ''
  message:string = ''
  constructor(public dialogRef: MatDialogRef<YesNoComponent>, @Inject(MAT_DIALOG_DATA) data:any) {
    this.caption = data.caption
    this.message = data.message
  }
  close(result:boolean){
    this.dialogRef.close(result)
  }
}
