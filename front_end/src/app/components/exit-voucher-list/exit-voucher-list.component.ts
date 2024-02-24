import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ExitVoucher} from "../../models/ExitVoucher";
import {ExitVoucherService} from "../../services/exit-voucher.service";
import {MatSort} from "@angular/material/sort";
import {KeycloakService} from "keycloak-angular";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ExitProduct} from "../../models/ExitProduct";



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}


@Component({
  selector: 'app-exit-voucher-list',
  templateUrl: './exit-voucher-list.component.html',
  styleUrls: ['./exit-voucher-list.component.css'],
  animations:[
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),

  ]
})

export class ExitVoucherListComponent {

  // dataSource = ELEMENT_DATA;
  //columnsToDisplay = ['exv_number', 'date', 'approved', 'checked'];
  columnsToDisplay = ['exv_number', 'date'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay,'status', 'expand', 'actions'];
  expandedElement!: ExitVoucher | null;

  ELEMENT_DATA: any[] = [];
  dataSource!:MatTableDataSource<ExitVoucher> ;
  // expandedElement!: ExitVoucher | null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private exitVoucherService: ExitVoucherService,
    public ks:KeycloakService
  ) {
    this.loadExitVouchers();
  }

  loadExitVouchers(){
    this.exitVoucherService.getExitVouchers().subscribe({
      next: response => {
        this.ELEMENT_DATA = response;
        this.dataSource = new MatTableDataSource<ExitVoucher>(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  approve(exv_number: number) {
    this.exitVoucherService.approveExitVoucher(exv_number).subscribe({
      next: response => {
        this.loadExitVouchers();
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  reject(exv_number: number) {
    this.exitVoucherService.rejectExitVoucher(exv_number).subscribe({
      next: response => {
        this.loadExitVouchers();
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  //
  //
  // displayedColumns: string[] = ['Number', 'Name', 'Date', 'Approved', 'Actions'];
  // columnToDisplayWithExpandable: string[] = [...this.displayedColumns,'expand'];
  // ELEMENT_DATA: any[] = [];
  // dataSource!:MatTableDataSource<ExitVoucher> ;
  // expandedElement!: ExitVoucher | null;
  //
  //
  //
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  //
  // constructor(
  //   private exitVoucherService: ExitVoucherService,
  //   public ks:KeycloakService
  // ) {
  //   this.loadExitVouchers();
  // }
  //
  // ngOnInit(): void {
  //
  // }
  // ngAfterViewInit() {
  // }
  //
  // loadExitVouchers(){
  //   this.exitVoucherService.getExitVouchers().subscribe({
  //     next: response => {
  //       this.ELEMENT_DATA = response;
  //       this.dataSource = new MatTableDataSource<ExitVoucher>(this.ELEMENT_DATA);
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //     },
  //     error: (error: any) => {
  //       console.log(error);
  //     }
  //   });
  //
  // }
  // approve(exv_number: number) {
  //   this.exitVoucherService.approveExitVoucher(exv_number).subscribe({
  //     next: response => {
  //       this.loadExitVouchers();
  //     },
  //     error: (error: any) => {
  //       console.log(error);
  //     }
  //   })
  // }
  //
  // reject(exv_number: number) {
  //   this.exitVoucherService.rejectExitVoucher(exv_number).subscribe({
  //     next: response => {
  //       this.loadExitVouchers();
  //     },
  //     error: (error: any) => {
  //       console.log(error);
  //     }
  //   });
  // }
}




