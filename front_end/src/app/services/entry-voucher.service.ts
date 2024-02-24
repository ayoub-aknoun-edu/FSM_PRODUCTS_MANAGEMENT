import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EntryVoucher } from '../models/EntryVoucher';

@Injectable({
  providedIn: 'root'
})
export class EntryVoucherService {
  private apiUrl = 'http://localhost:3000';
  entryVouchers!: EntryVoucher[]
  constructor(private http: HttpClient) { }

  // Get All EntryVouchers
  getEntryVouchers(): Observable<EntryVoucher[]> {
    let url = 'http://localhost:8888/ENTRY-VOUCHER-SERVICE/entryVoucher';
    return this.http.get<EntryVoucher[]>(url)
  }



  // Add EntryVoucher
  addEntryVoucher(entryVoucher: EntryVoucher): Observable<EntryVoucher> {
    let url = 'http://localhost:8888/ENTRY-VOUCHER-SERVICE/entryVoucher';
    return this.http.post<EntryVoucher>(url, entryVoucher)
  }

}
