import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { History } from '../models/History';
import { Product } from '../models/Product';


@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private apiUrl = 'http://localhost:3000';
  tracked_activities!: History[]

  constructor(private http: HttpClient) { }

  getHistoryByTag(tagName: String): Observable<History> {
    let url = `http://localhost:8080/product/history/tag/${tagName}`;
    return this.http.get<History>(url);
  }

  getHistoryByProduct(productRef: String): Observable<Product> {
    let url = `http://localhost:8080/product/history/reference/${productRef}`;
    return this.http.get<Product>(url);
  }

}
