import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormArray, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/models/Tag';
import { Observable, forkJoin } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  single_product!: any;
  productForm!: FormGroup;
  tags!: Tag[]
  fetchedProduct!: any;

  constructor(
    private tagService: TagService,
    private fb: FormBuilder,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private diag: MatDialog,
    public ks:KeycloakService,
    private dialog: MatDialogRef<SingleProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.single_product = data.product;
  }

  ngOnInit(): void {
    this.productService.getProductByReference(this.single_product.reference).subscribe(
      (res) => {
        this.fetchedProduct = res;
        console.log(this.fetchedProduct)
      }
    )

    this.productForm = this.fb.group({
      id: [this.single_product.id],
      name: [this.single_product.name],
      reference: [this.single_product.reference],
      ev_number: [this.single_product.ev_number],
      warehouse: [this.single_product.warehouse],
      supplier: [this.single_product.supplier],
      quantity: [this.single_product.quantity],
      tag: this.fb.group({
        name: [this.single_product.tag.name, Validators.required],
        superTag: this.fb.group({
          name: [this.single_product.tag.superTag.name],
        })
      }),
      technicalSheet: this.fb.group({
        weight: [this.single_product.technicalSheet.weight],
        dimensions: [this.single_product.technicalSheet.dimensions],
        colors: [this.single_product.technicalSheet.colors],
        warnings: [this.single_product.technicalSheet.warnings],
      }),
      accessories: this.fb.array([]),
      documents: this.fb.array([])
    })
  }





  private positiveNumberValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (isNaN(value) || value <= 0) {
      return { 'positiveNumber': { value } };
    }
    return null;
  }



  onSubmit(): void {
    if (this.single_product != this.fetchedProduct) {
      this.productService.updateProduct(this.single_product).subscribe(
        () => {
          this.snackBar.open('Product updated successfully', 'Close', {
            duration: 2000, // Duration in milliseconds
          });
          window.location.reload();
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );
    } else {
      console.log('nothing changed!')
    }



  }

  openConfirmationDialog(): void {
    const dialogRef = this.diag.open(ConfirmationDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User confirmed, delete the product
        this.onSubmit();
      }
      // If result is false or undefined, do nothing (user canceled or closed the dialog)
    });
  }


}
