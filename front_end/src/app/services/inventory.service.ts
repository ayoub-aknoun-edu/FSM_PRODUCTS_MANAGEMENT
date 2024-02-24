import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { feuilleComptage } from '../models/feuilleComptage';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  apiUrl = 'http://localhost:8888/INVENTORY-SERVICE/feuille-comptage';

  constructor(private http: HttpClient) { }

  createFeuilleComptage(): Observable<feuilleComptage> {
    let url = this.apiUrl;
    return this.http.post<feuilleComptage>(url, null);
  }

  processFeuilleComptage(feuille: feuilleComptage): Observable<feuilleComptage> {
    let url = this.apiUrl+'/process'
    return this.http.post<feuilleComptage>(url, feuille)
  }

  getStockActuelByReference() {

  }


}
