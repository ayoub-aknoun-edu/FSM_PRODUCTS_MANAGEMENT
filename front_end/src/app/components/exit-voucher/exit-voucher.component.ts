import { Component, OnInit } from '@angular/core';
import { SuperTag } from 'src/app/models/SuperTag';
import { Tag } from 'src/app/models/Tag';
import { TagService } from 'src/app/services/tag.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/Product';
import { MatTableDataSource } from '@angular/material/table';
import { SelectedProduct } from 'src/app/models/SelectedProduct';
import {KeycloakService} from "keycloak-angular";
import {Router} from "@angular/router";
import {ExitVoucher} from "../../models/ExitVoucher";
import {KeycloakProfile} from "keycloak-js";
import {ExitProduct} from "../../models/ExitProduct";
import {ExitVoucherService} from "../../services/exit-voucher.service";


@Component({
  selector: 'app-exit-voucher',
  templateUrl: './exit-voucher.component.html',
  styleUrls: ['./exit-voucher.component.css']
})
export class ExitVoucherComponent implements OnInit {

  selectedSuperTag: SuperTag = { name: '', id: 0 };
  selectedTag: Tag = { name: '', id: 0, superTag: { name: '', id: 0 }, total_quantity: 0, min_quantity: 0 };
  superTags: SuperTag[] = [];
  tags: Tag[] = [];
  selectedProducts: SelectedProduct[] = [];
  st2displayedColumns: string[] = ['name', 'description', 'actions'];
  st3displayedColumns: string[] = ['name', 'quantity'];
  dataSource = new MatTableDataSource(this.selectedProducts);
  isDateSelected = false;
  currentDate = new Date();
  datechoosed!: Date;
  exitVoucher!: ExitVoucher;
  exitProducts:ExitProduct[] = [];
  profile!: KeycloakProfile ;
  constructor(
    private tagService: TagService,
    private productService: ProductService,
    public ks:KeycloakService,
    private router: Router,
    private exitVoucherService:ExitVoucherService
  ) { }

  ngOnInit(): void {
    this.loadSuperTags();
  }

  exitDate(date: any) {
    this.isDateSelected = true;
    this.datechoosed = date.value;
  }

  loadSuperTags() {
    this.tagService.getSuperTags().subscribe(
      (superTags: SuperTag[]) => {
        this.superTags = superTags;
        if (this.superTags.length > 0) {
          this.selectedSuperTag = this.superTags[0];
          this.loadTagsBySuperTag(this.selectedSuperTag);
        }
      }
    )
  }

  loadTagsBySuperTag(superTag: SuperTag) {
    this.tagService.getTagsBySuperTag(superTag).subscribe(
      (tags: Tag[]) => {
        this.tags = tags;
        if (this.tags.length > 0) {
          this.selectedTag = this.tags[0];
          this.loadProductsByTag(this.selectedTag);
        }
      }
    )
  }

  loadProductsByTag(tag: Tag): void {
    this.productService.getProductBySuperTagAndTag(tag.superTag.name, tag.name).subscribe((products: Product[]) => {
      this.selectedProducts = [];
      products.forEach((product: Product) => {
        this.selectedProducts.push({
          product: product,
          name: product.name,
          isSelected: false,
          quantity: 1
        });
      });
    });
    this.dataSource.data = [];
  }

  onSuperTagChange(superTag: SuperTag) {
    this.loadTagsBySuperTag(superTag);
  }

  toggleSelection(selectedProduct: SelectedProduct): void {
    this.dataSource.data = this.selectedProducts.filter((product: SelectedProduct) => product.isSelected);
  }

  onTagChange(tag: Tag) {
    this.loadProductsByTag(tag);
  }

  increaseQuantity(selectedProduct: SelectedProduct): void {
    selectedProduct.quantity++;
  }

  decreaseQuantity(selectedProduct: SelectedProduct): void {
    if (selectedProduct.quantity > 1) {
      selectedProduct.quantity--;
    }
  }

  submitExitVoucher(): void {
    this.dataSource.data.forEach((selectedProduct: SelectedProduct) => {
      this.exitProducts.push({
        name: selectedProduct.name,
        reference: selectedProduct.product.reference,
        quantity: selectedProduct.quantity,
        tag: selectedProduct.product.tag.name,
        superTag: selectedProduct.product.tag.superTag.name
      });
    });


    this.ks.loadUserProfile().then(profile => {
      this.profile = profile;
      this.exitVoucher = {
        exv_number: 0,
        date: this.datechoosed,
        user_name: this.profile.firstName + " " + this.profile.lastName,
        checked: false,
        approved: false,
        exitedProduct: this.exitProducts
      };
      this.exitVoucherService.addExitVoucher(this.exitVoucher).subscribe({
        next: response => {
          window.location.reload();
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    })

    }


  exitvoucherList(): void {
    this.router.navigate(['/xvlist']);
  }
  protected readonly SelectedProduct = SelectedProduct;
  protected readonly ProductService = ProductService;

}
