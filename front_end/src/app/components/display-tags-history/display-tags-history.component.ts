import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { History } from 'src/app/models/History';
import { DatePipe } from '@angular/common';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {KeycloakService} from "keycloak-angular";

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-display-tags-history',
  templateUrl: './display-tags-history.component.html',
  styleUrls: ['./display-tags-history.component.css']
})
export class DisplayTagsHistoryComponent {

  historyList: History[] = [];
  displayedColumns: string[] = ['id', 'action', 'date', 'quantity', 'productReference'];
  dataSource!: MatTableDataSource<History>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private datePipe: DatePipe,
    public ks:KeycloakService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.historyList = data.history;
    this.dataSource = new MatTableDataSource(this.historyList);
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss') || '';
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  downloadPDF(): void {
    const docDefinition = {
      content: [
        { text: 'History List', style: 'header' },
        this.generateTable(),
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        table: {
          margin: [0, 5, 0, 15],
        },
      },
    };

    pdfMake.createPdf(docDefinition as any).download(`tag_history_${new Date()}`);
  }


  private generateTable(): any {
    const headers = ['ID', 'Action', 'Date', 'Quantity', 'Product Reference'];
    const rows = [];

    // Add table headers
    rows.push(headers);

    // Add table rows
    this.historyList.forEach(history => {
      const row = [
        history.id.toString(),
        history.action,
        this.formatDate(history.date),
        history.quantity.toString(),
        history.productReference,
      ];
      rows.push(row);
    });

    return {
      table: {
        headerRows: 1,
        widths: ['auto', 'auto', 'auto', 'auto', 'auto'], // adjust widths as needed
        body: rows,
      },
    };
  }

}
