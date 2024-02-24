import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TagService } from 'src/app/services/tag.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuperTag } from 'src/app/models/SuperTag';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.css']
})
export class AddTagComponent {
  selectedSuperTag!: SuperTag;

  TagForm: FormGroup;

  constructor(
    private tagService: TagService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedSuperTag = data.superTag;
    this.TagForm = this.createTagForm();
  }

  createTagForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      total_quantity: [0],
      min_quantity: [0, Validators.required],
      superTag: this.fb.group({
        name: this.selectedSuperTag.name
      })
    });
  }

  submitTag() {
    if (this.TagForm.valid) {
      const newTag = this.TagForm.value;
      this.tagService.addTag(newTag).subscribe(
        (addedTag) => {
          this.snackBar.open('Tag Added Successfully', 'Close', {
            duration: 2000,
          });
          // Reset the form with the initial values, including the cloned superTag
          this.TagForm = this.createTagForm();
          window.location.reload();
        },
        (error) => {
          this.snackBar.open('Error Adding Tag', 'Close', {
            duration: 2000,
          });
        }
      );
    }
  }
}
