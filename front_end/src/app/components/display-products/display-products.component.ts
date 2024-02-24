import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { SingleProductComponent } from '../single-product/single-product.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HistoryService } from 'src/app/services/history.service';
import { DisplayProductsHistoryComponent } from '../display-products-history/display-products-history.component';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.css']
})
export class DisplayProductsComponent implements OnInit, AfterViewInit {
  products: Product[] = [];
  displayedColumns: string[] = ['id', 'reference', 'name', 'supplier', 'quantity', 'actions'];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>(this.products);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private dialog: MatDialog,
    private historyService: HistoryService,
    public ks:KeycloakService

  ) { }

  ngAfterViewInit(): void {
    // Set up paginator and sort after the view initialization
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const supertagName = params['supertagName'];
      const tagName = params['tagName'];
      this.getProductsBySuperTagAndTag(supertagName, tagName);
    });
  }

  getProductsBySuperTagAndTag(supertagName: string, tagName: string): void {
    this.productService.getProductBySuperTagAndTag(supertagName, tagName).subscribe(
      (products: Product[]) => {
        this.products = products;
        this.dataSource.data = this.products;
      },
      (error) => {
        console.error(`Error fetching products for Tag ${tagName}:`, error);
      }
    );
  }


  DisplayProductDetails(reference: string) {
    this.productService.getProductByReference(reference).subscribe(
      (product: any) => {
        console.log(product)
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

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  displayProductHistory(productRef: String) {
    this.historyService.getHistoryByProduct(productRef).subscribe(
      (history) => {
        const popup = this.dialog.open(DisplayProductsHistoryComponent, {
          enterAnimationDuration: '500ms',
          exitAnimationDuration: '500ms',
          width: '70%',
          height: '70%',
          data: { history }
        });

        popup.afterClosed().subscribe(res => {
          console.log('dialog closed.');
        });
      },
      error => {
        console.error('Error fetching history:', error);
      }


    )
  }

}
