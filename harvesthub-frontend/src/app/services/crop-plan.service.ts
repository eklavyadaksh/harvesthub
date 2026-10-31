import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CropPlan } from '../models/crop-plan';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CropPlanService {

  private apiUrl = `${environment.apiUrl}/crop-plans`;

  constructor(private http: HttpClient) {

  }

  getAllCropPlans(): Observable<CropPlan[]> {

    return this.http.get<CropPlan[]>(this.apiUrl);

  }

  getCropPlanById(id: number): Observable<CropPlan> {

    return this.http.get<CropPlan>(
      `${this.apiUrl}/${id}`
    );

  }

  createCropPlan(cropPlan: CropPlan): Observable<CropPlan> {

    return this.http.post<CropPlan>(
      this.apiUrl,
      cropPlan
    );

  }

  updateCropPlan(
    id: number,
    cropPlan: CropPlan
  ): Observable<CropPlan> {

    return this.http.put<CropPlan>(
      `${this.apiUrl}/${id}`,
      cropPlan
    );

  }

  deleteCropPlan(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );

  }

}