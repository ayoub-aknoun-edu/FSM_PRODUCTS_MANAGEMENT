import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { TagService } from 'src/app/services/tag.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddTagComponent } from '../add-tag/add-tag.component';
import { SuperTag } from 'src/app/models/SuperTag';

@Component({
  selector: 'app-add-super-tag',
  templateUrl: './add-super-tag.component.html',
  styleUrls: ['./add-super-tag.component.css']
})
export class AddSuperTagComponent {
  superTagForm: FormGroup = this.fb.group({
    name: ['', Validators.required]
  })


  constructor(
    private tagService: TagService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  createNewTags(superTag: SuperTag) {
    const popup = this.dialog.open(AddTagComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data: { superTag }
    });
    popup.afterClosed().subscribe(res => {
      console.log('dialog closed.');
    });
  }
  refreshPage() {
    window.location.reload();
  }

  submitSuperTag() {
    if (this.superTagForm.valid) {
      const newSuperTag = this.superTagForm.value;
      this.tagService.addSuperTag(newSuperTag).subscribe(
        (addedSuperTag) => {
          this.snackBar.open('Super Tag Added Successfully', 'Close', {
            duration: 2000, // Duration in milliseconds
          });
          this.createNewTags(this.superTagForm.value)
          //this.router.navigate(['/products']);
        },
        (error) => {
          this.snackBar.open('Error Adding Super Tag', 'Close', {
            duration: 2000, // Duration in milliseconds
          });
        }
      )
    }
  }



}
