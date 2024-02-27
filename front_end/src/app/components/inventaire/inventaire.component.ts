import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { StockActuel } from '../../models/ActuelStock';
import {InventoryService} from "../../services/inventory.service";

@Component({
  selector: 'app-inventaire',
  templateUrl: './inventaire.component.html',
  styleUrls: ['./inventaire.component.css'],
})
export class InventaireComponent implements OnInit {
  displayedColumns: string[] = ['reference', 'quantity', 'date', 'status'];
  dataSource!: MatTableDataSource<StockActuel>;
  filterBy: string = '';
  filterValue: string = '';
  STOCK_DATA: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private datePipe: DatePipe, private inventoryService:InventoryService) {}
  ngOnInit() {
    this.loadAllData()
  }
  loadAllData(){
    this.inventoryService.getStockActuel().subscribe({
      next: response => {
        this.modifieData(response);
      }
    });
  }

  applyFilter() {
    if (this.filterBy === 'date') {
      // Convert filterValue to Date object and filter
      const filterDate = this.datePipe.transform(this.filterValue, 'dd-MM-yyyy');
      if (filterDate != null) {
        this.inventoryService.getStockActuelByDate(filterDate).subscribe({
          next: response => {
            this.modifieData(response);
          }
        });
      }
    } else if (this.filterBy === 'reference') {
      // Filter by reference
      this.inventoryService.getStockActuelByReference(this.filterValue).subscribe({
        next: response => {
          this.modifieData(response);        }
      });
    } else {
      // If no filter is selected, get all data
      this.inventoryService.getStockActuel().subscribe({
        next: response => {
          this.modifieData(response);
        }
      });
    }
  }

  modifieData(data: any) {
    this.STOCK_DATA = data;
    this.dataSource = new MatTableDataSource(this.STOCK_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  clearFilter() {
    this.filterValue = '';
    this.filterBy = '';
    this.dataSource.filter = '';
    this.loadAllData();
  }

  change() {
    this.filterValue = '';
    this.loadAllData();
  }
}
