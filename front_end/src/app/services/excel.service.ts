import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  private importSubject = new Subject<any>();

  constructor() { }

  importFromExcel(file: File): Observable<any> {
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });
      const metadataSheet: XLSX.WorkSheet = workbook.Sheets['Metadata'];
      const metadataJsonData = XLSX.utils.sheet_to_json(metadataSheet);
      const metadata = metadataJsonData[0];
      const mainSheet: XLSX.WorkSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(mainSheet);
      const finalData = { ...(metadata as Record<string, any>), data: jsonData };
      this.importSubject.next(finalData);
    };

    reader.readAsBinaryString(file);

    return this.importSubject.asObservable();
  }



  exportToExcel(data: any) {
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Data': XLSX.utils.json_to_sheet(data.data) },
      SheetNames: ['Data'],
    };
    workbook.Props = {
      Title: 'Your Sheet Title',
      Author: 'Your Name',
    };
    const metadataWorksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([
      { id: data.id, date: data.date, processed: data.processed },
    ]);
    XLSX.utils.book_append_sheet(workbook, metadataWorksheet, 'Metadata');
    const fileName = `${data.id}_${data.date}_${data.processed}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  }
}
