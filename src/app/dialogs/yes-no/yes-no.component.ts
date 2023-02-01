import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-yes-no',
  templateUrl: './yes-no.component.html',
  styleUrls: ['./yes-no.component.css']
})
export class YesNoComponent {
  constructor(public dialogRef: MatDialogRef<YesNoComponent>) {}
  close(result:boolean){
    this.dialogRef.close(result)
  }
}
