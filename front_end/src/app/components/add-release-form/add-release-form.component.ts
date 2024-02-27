import { Component, OnInit } from '@angular/core';
import { ReleaseFormService } from 'src/app/services/release-form.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/models/Tag';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-add-release-form',
  templateUrl: './add-release-form.component.html',
  styleUrls: ['./add-release-form.component.css']
})
export class AddReleaseFormComponent implements OnInit {

  ReleaseForm!: FormGroup;
  tags!: Tag[]
  productList!: Product[];
  selectedTagName: string = ''; // tag selected from the dropdown menu (steper1)
  filteredProducts: Product[] = [];

  constructor(
    private releaseFormService: ReleaseFormService,
    private fb: FormBuilder,
    private tagService: TagService,
    private productService: ProductService
  ) { }


  ngOnInit(): void {
    this.LoadProducts();
    this.loadTags();

    this.ReleaseForm = this.fb.group({
      evNumber: [, Validators.required],
      date: [new Date(), Validators.required],
      userName: [, Validators.required],
      isConfirmed: [true, Validators.required],
      products: this.fb.array([]),
    });


  }

  filterProductsByTag(tagName: string): any[] {
    return this.productList.filter(product => product.tag.name === tagName);
  }
  onTagSelected(): void {
    this.filteredProducts = this.filterProductsByTag(this.selectedTagName);
    this.filteredProducts.forEach(product => {
      const productForm = this.fb.group({
        name: [product.name, Validators.required],
        reference: [product.reference, Validators.required],
        quantity: [{ value: product.quantity, disabled: true }, Validators.required],
        tag: [product.tag.name, Validators.required],
      });

      this.productsArray?.push(productForm);
    });
  }

  updateFormArray(products: any[]): void {
    const productsFormArray = this.ReleaseForm.get('products') as FormArray;
    productsFormArray.clear();

    products.forEach(product => {
      productsFormArray.push(
        this.fb.group({
          name: [product.name],
          reference: [product.reference],
          quantity: [0],
          tag: [product.tag.name]
        })
      );
    });
  }

  get productsArray(): FormArray | null {
    return this.ReleaseForm.get('products') as FormArray | null;
  }



  removeProduct(index: number) {
    this.productsArray?.removeAt(index)
  }

  addProduct() {
    const productForm = this.fb.group({
      name: [, Validators.required],
      reference: [, Validators.required],
      quantity: [, Validators.required],
      tag: [, Validators.required]
    })
    this.productsArray?.push(productForm)
  }

  loadTags() {
    this.tagService.getTags().subscribe(tags => {
      this.tags = tags;
    });
  }
  LoadProducts() {
    this.productService.getProducts().subscribe(
      res => {
        this.productList = res;
      }
    )
  }



}
