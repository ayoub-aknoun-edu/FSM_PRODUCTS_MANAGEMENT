import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/services/product.service';
import { SingleProductComponent } from '../single-product/single-product.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TagService } from 'src/app/services/tag.service';
import { Observable } from 'rxjs';
import { UpdateProductsTagComponent } from '../update-products-tag/update-products-tag.component';
import {KeycloakService} from "keycloak-angular";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  dataSource: any;
  productList: any;
  displayedColumns: string[] = ['id', 'reference', 'name', 'tag',
    'supplier', 'warehouse', 'received_quantity', 'warning', 'actions',
  ];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private tagService: TagService,
    public ks: KeycloakService
  ) {
    this.LoadProducts()
  }

  LoadProducts() {
    this.productService.getProducts().subscribe(
      res => {
        this.productList = res;
        console.log(this.productList)

        this.dataSource = new MatTableDataSource(this.productList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }




  DisplayProductDetails(reference: string) {
    this.productService.getProductByReference(reference).subscribe(
      (product: any) => {
        //console.log(product)
        const popup = this.dialog.open(SingleProductComponent, {
          enterAnimationDuration: '500ms',
          exitAnimationDuration: '500ms',
          width: '70%',
          data: { product }
        });

        popup.afterClosed().subscribe(res => {
          console.log('dialog closed.');
        });
      },
      error => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  updateProductTag(reference: string) {
    this.productService.getProductByReference(reference).subscribe(
      (product: any) => {
        const popup = this.dialog.open(UpdateProductsTagComponent, {
          enterAnimationDuration: '500ms',
          exitAnimationDuration: '500ms',
          width: '50%',
          data: { product }
        });
        popup.afterClosed().subscribe(res => {
        });
      },
      error => {
        console.error('Error fetching product details:', error);
      }
    );



  }


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (this.dataSource) {
      this.dataSource.filter = filterValue;

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  deleteProduct(productId: number): void {
    // Call the deleteProduct method from the service
    this.productService.deleteProduct(productId).subscribe(
      () => {
        // Handle success, show a notification, or perform any other actions
        this.snackBar.open('Product deleted successfully', 'Close', {
          duration: 2000, // Duration in milliseconds
        });

        window.location.reload();
      },
      (error) => {
        // Handle error, show a notification, or perform any other error handling
        this.snackBar.open('Error deleting product', 'Close', {
          duration: 2000, // Duration in milliseconds
        });
        console.error('Error deleting product:', error);
      }
    );
  }

  openConfirmationDialog(productId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { productId },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User confirmed, delete the product
        this.deleteProduct(productId);
      }
      // If result is false or undefined, do nothing (user canceled or closed the dialog)
    });
  }



}
