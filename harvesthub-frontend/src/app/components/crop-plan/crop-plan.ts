import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CropPlan } from '../../models/crop-plan';
import { Field } from '../../models/field';

import { CropPlanService } from '../../services/crop-plan.service';
import { FieldService } from '../../services/field.service';

@Component({
  selector: 'app-crop-plan',
  imports: [CommonModule, FormsModule],
  templateUrl: './crop-plan.html',
  styleUrl: './crop-plan.css'
})
export class CropPlanComponent implements OnInit {

  cropPlans: CropPlan[] = [];

  fields: Field[] = [];

  newCropPlan: CropPlan = {
    planId: 0,
    field: {
      fieldId: 0,
      farm: {
        farmId: 0,
        name: '',
        location: '',
        area: 0
      },
      name: '',
      location: '',
      area: 0
    },
    cropName: '',
    season: '',
    sowingDate: '',
    harvestDate: ''
  };

  editingCropPlan: CropPlan | null = null;

  constructor(
    private cropPlanService: CropPlanService,
    private fieldService: FieldService
  ) {

  }

  ngOnInit(): void {

    this.getAllCropPlans();

    this.getAllFields();

  }

  getAllCropPlans(): void {

    this.cropPlanService
      .getAllCropPlans()
      .subscribe(data => {

        this.cropPlans = data;

      });

  }

  getAllFields(): void {

    this.fieldService
      .getAllFields()
      .subscribe(data => {

        this.fields = data;

      });

  }

  addCropPlan(): void {

    this.cropPlanService
      .createCropPlan(this.newCropPlan)
      .subscribe(data => {

        this.cropPlans.push(data);

        this.newCropPlan = {
          planId: 0,
          field: {
            fieldId: 0,
            farm: {
              farmId: 0,
              name: '',
              location: '',
              area: 0
            },
            name: '',
            location: '',
            area: 0
          },
          cropName: '',
          season: '',
          sowingDate: '',
          harvestDate: ''
        };

      });

  }

  editCropPlan(cropPlan: CropPlan): void {

    this.editingCropPlan = {
      ...cropPlan
    };

  }

  updateCropPlan(): void {

    if (this.editingCropPlan === null) {
      return;
    }

    this.cropPlanService
      .updateCropPlan(
        this.editingCropPlan.planId,
        this.editingCropPlan
      )
      .subscribe(data => {

        const index = this.cropPlans.findIndex(
          cropPlan => cropPlan.planId === data.planId
        );

        if (index !== -1) {

          this.cropPlans[index] = data;

        }

        this.editingCropPlan = null;

      });

  }

  cancelEdit(): void {

    this.editingCropPlan = null;

  }

  deleteCropPlan(id: number): void {

    this.cropPlanService
      .deleteCropPlan(id)
      .subscribe(() => {

        this.cropPlans = this.cropPlans.filter(
          cropPlan => cropPlan.planId !== id
        );

      });

  }

}