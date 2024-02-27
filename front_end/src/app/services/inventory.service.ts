import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { feuilleComptage } from '../models/feuilleComptage';
import {StockActuel} from "../models/ActuelStock";
import {environment} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  API_URL = environment.apiUrl;

  apiUrl = `${this.API_URL}/INVENTORY-SERVICE`;

  constructor(private http: HttpClient) { }

  createFeuilleComptage(): Observable<feuilleComptage> {
    let url = this.apiUrl+'/feuille-comptage';
    return this.http.post<feuilleComptage>(url, null);
  }

  processFeuilleComptage(feuille: feuilleComptage): Observable<feuilleComptage> {
    let url = this.apiUrl+'/feuille-comptage/process'
    return this.http.post<feuilleComptage>(url, feuille)
  }

  getStockActuelByReference(ref: string):Observable<StockActuel> {
    let url = this.apiUrl+'/inventory/products/'+ref;
    return this.http.get<StockActuel>(url);
  }

  getStockActuel(): Observable<StockActuel[]> {
    let url = this.apiUrl+'/inventory';
    return this.http.get<StockActuel[]>(url);
  }

  getStockActuelByDate(date: string): Observable<StockActuel[]> {
    let url = this.apiUrl+'/inventory/byDate/'+date;
    return this.http.get<StockActuel[]>(url);
  }


}
