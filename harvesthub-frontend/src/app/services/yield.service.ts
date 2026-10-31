import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Yield } from '../models/yield';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YieldService {

  private apiUrl = `${environment.apiUrl}/yields`;

  constructor(private http: HttpClient) {

  }

  getAllYields(): Observable<Yield[]> {

    return this.http.get<Yield[]>(this.apiUrl);

  }

  getYieldById(id: number): Observable<Yield> {

    return this.http.get<Yield>(
      `${this.apiUrl}/${id}`
    );

  }

  createYield(yieldData: Yield): Observable<Yield> {

    return this.http.post<Yield>(
      this.apiUrl,
      yieldData
    );

  }

  updateYield(
    id: number,
    yieldData: Yield
  ): Observable<Yield> {

    return this.http.put<Yield>(
      `${this.apiUrl}/${id}`,
      yieldData
    );

  }

  deleteYield(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );

  }

}