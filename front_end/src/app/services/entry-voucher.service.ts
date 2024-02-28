import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EntryVoucher } from '../models/EntryVoucher';
import {environment} from "../../enviroments/environment";

@Injectable({
  providedIn: 'root'
})
export class EntryVoucherService {
  API_URL =environment.apiUrl;
  entryVouchers!: EntryVoucher[]
  constructor(private http: HttpClient) { }

  // Get All EntryVouchers
  getEntryVouchers(): Observable<EntryVoucher[]> {
    let url = `${this.API_URL}/ENTRY-VOUCHER-SERVICE/entryVoucher`;
    return this.http.get<EntryVoucher[]>(url)
  }



  // Add EntryVoucher
  addEntryVoucher(entryVoucher: EntryVoucher): Observable<EntryVoucher> {
    let url = `${this.API_URL}/ENTRY-VOUCHER-SERVICE/entryVoucher`;
    return this.http.post<EntryVoucher>(url, entryVoucher)
  }

}
