import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Get all products
  getProducts(): Observable<Product[]> {
    let url = `http://localhost:8888/PRODUCT-SERVICE/product`;
    return this.http.get<Product[]>(url);
  }

  // Get a product by ID
  getProductById(id: number): Observable<Product> {

    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  // Get a product by Reference
  getProductByReference(reference: string): Observable<Product> {
    let url = `http://localhost:8080/product/${reference}`;
    return this.http.get<Product>(url);
  }

  // Add a new product
  addProduct(newProduct: Product): Observable<Product> {
    let url = `http://localhost:8888/PRODUCT-SERVICE/product`;
    return this.http.post<Product>(url, newProduct);
  }

  // Update a product
  updateProduct(updatedProduct: Product): Observable<Product> {
    let url = `http://localhost:8888/PRODUCT-SERVICE/product/updateProduct`;
    return this.http.put<Product>(url, updatedProduct);
  }

  // Delete a product by ID
  deleteProduct(id: number): Observable<Product> {
    let url = `http://localhost:8080/product/deleteProduct/${id}`;
    return this.http.delete<Product>(url);
  }

  getProductBySuperTagAndTag(supertagName: string, tagName: string): Observable<Product[]> {
    //return this.http.get<Product[]>(`${this.apiUrl}/products?tag.superTag.name=${supertagName}&tag.name=${tagName}`);
    let url: string = `http://localhost:8888/PRODUCT-SERVICE/product/tag/names?supertagName=${supertagName}&tagName=${tagName}`
    return this.http.get<Product[]>(url);
  }


}
