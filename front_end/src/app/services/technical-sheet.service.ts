import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TechnicalSheet } from '../models/TechnicalSheet';

@Injectable({
  providedIn: 'root'
})
export class TechnicalSheetService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  // Get all technical sheets
  getTechnicalSheets(): Observable<TechnicalSheet[]> {
    return this.http.get<TechnicalSheet[]>(`${this.apiUrl}/technicalSheets`);
  }

  // Get a technical sheet by ID
  getTechnicalSheetById(id: number): Observable<TechnicalSheet> {
    return this.http.get<TechnicalSheet>(`${this.apiUrl}/technicalSheets/${id}`);
  }

  // Add a new technical sheet
  addTechnicalSheet(newTechnicalSheet: TechnicalSheet): Observable<TechnicalSheet> {
    return this.http.post<TechnicalSheet>(`${this.apiUrl}/technicalSheets`, newTechnicalSheet);
  }

  // Update a technical sheet
  updateTechnicalSheet(updatedTechnicalSheet: TechnicalSheet): Observable<TechnicalSheet> {
    return this.http.put<TechnicalSheet>(`${this.apiUrl}/technicalSheets/${updatedTechnicalSheet.id}`, updatedTechnicalSheet);
  }

  // Delete a technical sheet by ID
  deleteTechnicalSheet(id: number): Observable<TechnicalSheet> {
    return this.http.delete<TechnicalSheet>(`${this.apiUrl}/technicalSheets/${id}`);
  }


}
