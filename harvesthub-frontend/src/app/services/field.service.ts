import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Field } from '../models/field';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  private apiUrl = `${environment.apiUrl}/fields`;

  constructor(private http: HttpClient) {

  }

  getAllFields(): Observable<Field[]> {

    return this.http.get<Field[]>(this.apiUrl);

  }

  getFieldById(id: number): Observable<Field> {

    return this.http.get<Field>(`${this.apiUrl}/${id}`);

  }

  createField(field: Field): Observable<Field> {

    return this.http.post<Field>(this.apiUrl, field);

  }

  updateField(id: number, field: Field): Observable<Field> {

    return this.http.put<Field>(
      `${this.apiUrl}/${id}`,
      field
    );

  }

  deleteField(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );

  }

}