import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Maintenance } from '../models/maintenance';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  private apiUrl = `${environment.apiUrl}/maintenance`;

  constructor(private http: HttpClient) {

  }

  getAllMaintenance(): Observable<Maintenance[]> {

    return this.http.get<Maintenance[]>(this.apiUrl);

  }

  getMaintenanceById(id: number): Observable<Maintenance> {

    return this.http.get<Maintenance>(
      `${this.apiUrl}/${id}`
    );

  }

  createMaintenance(
    maintenance: Maintenance
  ): Observable<Maintenance> {

    return this.http.post<Maintenance>(
      this.apiUrl,
      maintenance
    );

  }

  updateMaintenance(
    id: number,
    maintenance: Maintenance
  ): Observable<Maintenance> {

    return this.http.put<Maintenance>(
      `${this.apiUrl}/${id}`,
      maintenance
    );

  }

  deleteMaintenance(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );

  }

}