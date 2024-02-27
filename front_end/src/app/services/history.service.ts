import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { History } from '../models/History';
import {environment}  from "src/environment";
import { Product } from '../models/Product';


@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  API_URL =environment.apiUrl;
  tracked_activities!: History[]

  constructor(private http: HttpClient) { }

  getHistoryByTag(tagName: String): Observable<History> {
    let url = `${this.API_URL}/PRODUCT-SERVICE/product/history/tag/${tagName}`;
    return this.http.get<History>(url);
  }

  getHistoryByProduct(productRef: String): Observable<Product> {
    let url = `${this.API_URL}/PRODUCT-SERVICE/product/history/reference/${productRef}`;
    return this.http.get<Product>(url);
  }

}
