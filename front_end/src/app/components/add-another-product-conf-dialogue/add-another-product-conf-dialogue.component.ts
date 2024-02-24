import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-another-product-conf-dialogue',
  templateUrl: './add-another-product-conf-dialogue.component.html',
  styleUrls: ['./add-another-product-conf-dialogue.component.css']
})
export class AddAnotherProductConfDialogueComponent {

  constructor(
    public dialogRef: MatDialogRef<AddAnotherProductConfDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
