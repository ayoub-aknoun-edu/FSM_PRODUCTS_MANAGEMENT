import { Component, ViewChild } from '@angular/core';
import { EntryVoucher } from 'src/app/models/EntryVoucher';
import { EntryVoucherService } from 'src/app/services/entry-voucher.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-entry-voouchers',
  templateUrl: './display-entry-voouchers.component.html',
  styleUrls: ['./display-entry-voouchers.component.css']
})
export class DisplayEntryVoouchersComponent {

  entryVouchers!: EntryVoucher[];
  displayedColumns: string[] = ['evNumber', 'date', 'totalAmount', 'dueDate', 'description', 'action'];
  dataSource!: MatTableDataSource<EntryVoucher>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private entryVoucherService: EntryVoucherService,
    private router: Router
  ) {
    this.loadEntryVouchers()
  }

  loadEntryVouchers() {
    this.entryVoucherService.getEntryVouchers().subscribe(
      (res) => {
        this.entryVouchers = res.reverse();;
        this.dataSource = new MatTableDataSource(this.entryVouchers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error fetching entry vouchers', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  enterProduct(evNumber: string): void {
    // Navigate to the component responsible for adding a product
    // Pass the evNumber as a parameter to the route
    console.log("ev number received:", evNumber)
    this.router.navigate(['/add-product', evNumber]);
  }
}
