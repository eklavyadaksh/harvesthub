import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Yield } from '../../models/yield';
import { Field } from '../../models/field';

import { YieldService } from '../../services/yield.service';
import { FieldService } from '../../services/field.service';

@Component({
  selector: 'app-yield',
  imports: [CommonModule, FormsModule],
  templateUrl: './yield.html',
  styleUrl: './yield.css'
})
export class YieldComponent implements OnInit {

  yields: Yield[] = [];

  fields: Field[] = [];

  newYield: Yield = {
    yieldId: 0,
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
    quantity: 0,
    unit: '',
    sellingPrice: 0,
    revenue: 0
  };

  editingYield: Yield | null = null;

  constructor(
    private yieldService: YieldService,
    private fieldService: FieldService
  ) {

  }

  ngOnInit(): void {

    this.getAllYields();

    this.getAllFields();

  }

  getAllYields(): void {

    this.yieldService
      .getAllYields()
      .subscribe(data => {

        this.yields = data;

      });

  }

  getAllFields(): void {

    this.fieldService
      .getAllFields()
      .subscribe(data => {

        this.fields = data;

      });

  }

  addYield(): void {

    this.newYield.revenue =
      this.newYield.quantity *
      this.newYield.sellingPrice;

    this.yieldService
      .createYield(this.newYield)
      .subscribe(data => {

        this.yields.push(data);

        this.newYield = {
          yieldId: 0,
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
          quantity: 0,
          unit: '',
          sellingPrice: 0,
          revenue: 0
        };

      });

  }

  editYield(yieldData: Yield): void {

    this.editingYield = {
      ...yieldData
    };

  }

  updateYield(): void {

    if (this.editingYield === null) {
      return;
    }

    this.editingYield.revenue =
      this.editingYield.quantity *
      this.editingYield.sellingPrice;

    this.yieldService
      .updateYield(
        this.editingYield.yieldId,
        this.editingYield
      )
      .subscribe(data => {

        const index = this.yields.findIndex(
          yieldData =>
            yieldData.yieldId === data.yieldId
        );

        if (index !== -1) {

          this.yields[index] = data;

        }

        this.editingYield = null;

      });

  }

  cancelEdit(): void {

    this.editingYield = null;

  }

  deleteYield(id: number): void {

    this.yieldService
      .deleteYield(id)
      .subscribe(() => {

        this.yields = this.yields.filter(
          yieldData =>
            yieldData.yieldId !== id
        );

      });

  }

}