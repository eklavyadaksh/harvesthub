import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Farm } from '../models/farm';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FarmService {

  private apiUrl = `${environment.apiUrl}/farms`;

  constructor(private http: HttpClient) {

  }

  getAllFarms(): Observable<Farm[]> {

    return this.http.get<Farm[]>(this.apiUrl);

  }

  getFarmById(id: number): Observable<Farm> {

    return this.http.get<Farm>(
      `${this.apiUrl}/${id}`
    );

  }

  createFarm(
    farm: Omit<Farm, 'farmId'>
  ): Observable<Farm> {

    return this.http.post<Farm>(
      this.apiUrl,
      farm
    );

  }

  updateFarm(
    id: number,
    farm: Farm
  ): Observable<Farm> {

    return this.http.put<Farm>(
      `${this.apiUrl}/${id}`,
      farm
    );

  }

  deleteFarm(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );

  }

}
