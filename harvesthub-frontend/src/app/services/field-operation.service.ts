import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FieldOperation } from '../models/field-operation';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FieldOperationService {

  private apiUrl = `${environment.apiUrl}/field-operations`;

  constructor(private http: HttpClient) {

  }

  getAllFieldOperations(): Observable<FieldOperation[]> {

    return this.http.get<FieldOperation[]>(this.apiUrl);

  }

  getFieldOperationById(id: number): Observable<FieldOperation> {

    return this.http.get<FieldOperation>(
      `${this.apiUrl}/${id}`
    );

  }

  createFieldOperation(
    operation: FieldOperation
  ): Observable<FieldOperation> {

    return this.http.post<FieldOperation>(
      this.apiUrl,
      operation
    );

  }

  updateFieldOperation(
    id: number,
    operation: FieldOperation
  ): Observable<FieldOperation> {

    return this.http.put<FieldOperation>(
      `${this.apiUrl}/${id}`,
      operation
    );

  }

  deleteFieldOperation(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );

  }

}