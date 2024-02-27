import { Component, OnInit } from '@angular/core';
import { SuperTag } from './models/SuperTag';
import { Tag } from './models/Tag';
import { TagService } from './services/tag.service';
import { InventoryService } from './services/inventory.service';
import * as XLSX from 'xlsx';
import { feuilleComptage } from './models/feuilleComptage';
import { ExcelService } from './services/excel.service';
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GestionBiens';

  superTags: SuperTag[] = [];
  tags: Tag[] = [];
  selectedTags: Tag[] = []

  selectedSuperTag: SuperTag | undefined;
  selectedSubTag: Tag | undefined;
  public profile?: KeycloakProfile;

  constructor(
    private tagService: TagService,
    private inventoryService: InventoryService,
    private excelService: ExcelService,
    public ks: KeycloakService,
    private router: Router
  ) { }


  ngOnInit(): void {
    if (this.ks.isLoggedIn()) {
      this.ks.loadUserProfile().then(profile=>{
        this.profile = profile;
      })
    }
    this.tagService.getSuperTags().subscribe(superTags => this.superTags = superTags);
    this.tagService.getTags().subscribe(tags => this.tags = tags)
  }
  onSuperTagChange() {
    if (this.selectedSuperTag) {
      this.tagService.getTagsBySuperTag(this.selectedSuperTag).subscribe(tags => {
        this.selectedTags = tags;
      });
    }
  }

  createFeuilleComptage() {
    this.inventoryService.createFeuilleComptage().subscribe(feuille => {
      this.exportToExcel_new(feuille);
    })
  }

  exportToExcel_new(data: any) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data.data);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Sheet 1': worksheet },
      SheetNames: ['Sheet 1'],
    };

    // Add metadata (id, date, processed) to the Excel sheet
    workbook.Props = {
      Title: 'Your Sheet Title',
      Author: 'Your Name',
    };

    // Add id, date, processed to A1, B1, C1
    const metadataWorksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([
      { id: data.id, date: data.date, processed: data.processed },
    ]);
    XLSX.utils.book_append_sheet(workbook, metadataWorksheet, 'Metadata');

    // Save the workbook to an Excel file
    const fileName = `${data.id}_${data.date}_${data.processed}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  }


  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.readExcelFile(file);
    }
  }

  readExcelFile(file: File): void {
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[firstSheetName];

      // Convert worksheet data to JSON
      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Assuming the structure of the jsonData matches your feuilleComptage model
      const feuille: feuilleComptage = {
        id: jsonData[1][0], // Assuming "id" is in the first row
        date: jsonData[3][1], // Assuming "Date" is in cell B4
        processed: jsonData[1][2], // Assuming "processed" is in the third row
        data: jsonData.slice(2), // Assuming "data" starts from the third row
      };

      this.processFeuilleComptage(feuille);
    };

    reader.readAsBinaryString(file);
  }

  processFeuilleComptage(feuille: feuilleComptage): void {
    this.inventoryService.processFeuilleComptage(feuille).subscribe(updatedFeuille => {

    });
  }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];

      this.excelService.importFromExcel(file).subscribe((jsonData) => {
        this.inventoryService.processFeuilleComptage(jsonData).subscribe((updatedFeuille) => {

          this.excelService.exportToExcel(updatedFeuille);
        });
      });
    }
  }


logout() {
    this.ks.logout(window.location.origin);
  }

async  login() {
    await this.ks.login(
      {redirectUri:window.location.origin}
    )
  }


  async signup() {
    await this.ks.register(
      {redirectUri:window.location.origin}
    )
  }

  goTo(s: string) {
    this.router.navigate([s]);
  }
}
