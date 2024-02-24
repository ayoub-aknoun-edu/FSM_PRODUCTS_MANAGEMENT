import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReleaseForm } from '../models/ReleaseForm';


@Injectable({
  providedIn: 'root'
})
export class ReleaseFormService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Get All Release Forms
  getAllReleaseForms(): Observable<ReleaseForm[]> {
    return this.http.get<ReleaseForm[]>(`${this.apiUrl}/RF`)
  }

  // Add Release Form
  addReleaseForm(newReleaseForm: ReleaseForm): Observable<ReleaseForm> {
    return this.http.put<ReleaseForm>(`${this.apiUrl}/RF`, newReleaseForm)
  }


}
