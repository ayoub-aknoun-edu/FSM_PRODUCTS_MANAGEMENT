import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import {environment} from "../../enviroments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  API_URL = environment.apiUrl;
  constructor(private http: HttpClient) { }

  // Get all products
  getProducts(): Observable<Product[]> {
    let url = `${this.API_URL}/PRODUCT-SERVICE/product`;
    return this.http.get<Product[]>(url);
  }

  // Get a product by ID
  getProductById(id: number): Observable<Product> {

    return this.http.get<Product>(`${this.API_URL}/products/${id}`);
  }

  // Get a product by Reference
  getProductByReference(reference: string): Observable<Product> {
    let url = `${this.API_URL}/PRODUCT-SERVICE/product/${reference}`;
    return this.http.get<Product>(url);
  }

  // Add a new product
  addProduct(newProduct: Product): Observable<Product> {
    let url = `${this.API_URL}/PRODUCT-SERVICE/product`;
    return this.http.post<Product>(url, newProduct);
  }

  // Update a product
  updateProduct(updatedProduct: Product): Observable<Product> {
    let url = `${this.API_URL}/PRODUCT-SERVICE/product/updateProduct`;
    return this.http.put<Product>(url, updatedProduct);
  }

  // Delete a product by ID
  deleteProduct(id: number): Observable<Product> {
    let url = `${this.API_URL}/PRODUCT-SERVICE/product/deleteProduct/${id}`;
    return this.http.delete<Product>(url);
  }

  getProductBySuperTagAndTag(supertagName: string, tagName: string): Observable<Product[]> {
    //return this.http.get<Product[]>(`${this.apiUrl}/products?tag.superTag.name=${supertagName}&tag.name=${tagName}`);
    let url: string = `${this.API_URL}/PRODUCT-SERVICE/product/tag/names?supertagName=${supertagName}&tagName=${tagName}`
    return this.http.get<Product[]>(url);
  }


}
