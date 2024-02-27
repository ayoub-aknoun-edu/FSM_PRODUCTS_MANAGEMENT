import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Product } from 'src/app/models/Product';
import { SuperTag } from 'src/app/models/SuperTag';
import { Tag } from 'src/app/models/Tag';
import { ProductService } from 'src/app/services/product.service';
import { TagService } from 'src/app/services/tag.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AddAnotherProductConfDialogueComponent } from '../add-another-product-conf-dialogue/add-another-product-conf-dialogue.component';
import { AddSuperTagComponent } from '../add-super-tag/add-super-tag.component';
import { ActivatedRoute } from '@angular/router';
import { AddTagComponent } from '../add-tag/add-tag.component';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  superTags!: SuperTag[];
  tags!: Tag[];
  productForm: FormGroup = this.fb.group({
    reference: ['', Validators.required],
    name: ['', Validators.required],
    warehouse: ['', Validators.required],
    ev_number: ['', Validators.required],
    supplier: ['', Validators.required],
    quantity: [, Validators.required],
    technicalSheet: this.fb.group({
      color: ['', Validators.required],
      weight: ['', Validators.required],
      dimensions: ['', Validators.required],
      warnings: ['', Validators.required]
    }),
    tag: this.fb.group({
      name: ['', Validators.required],
      superTag: this.fb.group({
        name: [''],
      })
    }),
    accessories: this.fb.array([]),
    documents: this.fb.array([])
  });
  evNumber!: string | null;

  ngOnInit(): void {
    this.loadSuperTags();
    this.loadTags();
    this.evNumber = this.route.snapshot.paramMap.get('evNumber');
    this.productForm = this.fb.group({
      reference: ['', Validators.required],
      name: ['', Validators.required],
      warehouse: ['', Validators.required],
      ev_number: [this.evNumber, Validators.required],
      supplier: ['', Validators.required],
      quantity: [, [Validators.required, this.positiveNumberValidator]],
      technicalSheet: this.fb.group({
        color: ['', Validators.required],
        weight: ['', [Validators.required, this.positiveNumberValidator]],
        dimensions: ['', [Validators.required, this.dimensionsFormatValidator]],
        warnings: ['', Validators.required]
      }),
      tag: this.fb.group({
        name: ['', Validators.required],
        superTag: this.fb.group({
          name: [''],
        })
      }),
      accessories: this.fb.array([]),
      documents: this.fb.array([])
    });
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService,
    private tagService: TagService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {

  }

  private positiveNumberValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (isNaN(value) || value <= 0) {
      return { 'positiveNumber': { value } };
    }
    return null;
  }

  private dimensionsFormatValidator(control: AbstractControl): { [key: string]: any } | null {
    const dimensionsPattern = /^\d+x\d+x\d+$/;

    if (control.value && !dimensionsPattern.test(control.value)) {
      return { 'invalidFormat': true };
    }

    return null;
  }


  selectedtag?: Tag;
  onTagSelectionChange(selectedTag: string): void {
    // Use the standalone function to find the corresponding Tag object
    const foundTag = this.findTagBySelectedTag(selectedTag, this.tags);

    if (foundTag) {
      this.selectedtag = foundTag
      // Update the tag form group in the productForm
      this.productForm.patchValue({
        tag: {
          name: foundTag.name,
          superTag: {
            name: foundTag.superTag.name,
          },
        },
      });
    } else {
      console.log('Tag not found for selectedTag:', selectedTag);
    }
  }

  // fetch the selected tag
  findTagBySelectedTag(selectedTag: string | undefined, tags: Tag[]): Tag | null {
    if (selectedTag === undefined) {
      return null;
    }

    const foundTag = tags.find(tag => tag.name === selectedTag);
    return foundTag || null;
  }

  // cast the form to form group
  get ProductTagFormGroup(): FormGroup {
    return this.productForm?.get('tag') as FormGroup
  }
  // cast the form to form group
  get ProductSheetFormGroup(): FormGroup {
    return this.productForm?.get('technicalSheet') as FormGroup
  }
  get accessoriesArray() {
    return this.productForm.get('accessories') as FormArray;
  }
  get documentsArray() {
    return this.productForm.get('documents') as FormArray;
  }


  addAccessory() {
    const accessoryGroup = this.fb.group({
      name: ['', Validators.required]
    });
    this.accessoriesArray.push(accessoryGroup);
  }

  // Remove an accessory from the FormArray
  removeAccessory(index: number) {
    this.accessoriesArray.removeAt(index);
  }
  addDocument() {
    const documentGroup = this.fb.group({
      name: ['', Validators.required],
      url: ['', Validators.required],
      type: ['', Validators.required],
    });
    this.documentsArray.push(documentGroup);
  }
  // Remove a document from the FormArray
  removeDocument(index: number) {
    this.documentsArray.removeAt(index);
  }




  loadSuperTags() {
    this.tagService.getSuperTags().subscribe(superTags => {
      this.superTags = superTags;
    });
  }
  loadTags() {
    this.tagService.getTags().subscribe(tags => {
      this.tags = tags;
    });
  }

  addNewSupperTag() {
    const superTagName = this.ProductTagFormGroup.get('name')?.value;
    const popup = this.dialog.open(AddSuperTagComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      width: '50%',

    });
  }

  addNewTag() {
    const superTag = this.ProductTagFormGroup.get('superTag')?.value;
    const popup = this.dialog.open(AddTagComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data: { superTag }
    });
  }


  // fetch the tags related to the same super tag
  tagOptions: (string | null)[] = [];
  updateTagOptions() {
    const superTagName = this.ProductTagFormGroup.get('name')?.value;
    this.tagOptions = superTagName
      ? this.tags
        .filter((tag) => tag.superTag.name === superTagName)
        .map((tag) => tag.name)
      : [];

    const selectedSuperTag = this.superTags.find(
      (superTag) => superTag.name === superTagName
    );
    this.ProductTagFormGroup.get('superTag.name')?.setValue(
      selectedSuperTag ? selectedSuperTag.name : null
    );

    this.ProductSheetFormGroup.get('selectedTag')?.setValue(null);
  }


  submitForm() {
    if (this.productForm.valid) {
      const newProduct: Product = this.productForm.value;
      this.productService.addProduct(newProduct).subscribe(
        (addedProduct) => {

          this.openConfirmationDialog();
        },
        (error) => {
          console.error('Error adding product:', error);
        }
      );
    }
  }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(AddAnotherProductConfDialogueComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User confirmed
        window.location.reload();
      }
      // If result is false or undefined, do nothing (user canceled or closed the dialog)
      this.router.navigate([''])
    });
  }

}
