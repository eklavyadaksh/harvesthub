import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Field } from '../../models/field';
import { Farm } from '../../models/farm';
import { FieldService } from '../../services/field.service';
import { FarmService } from '../../services/farm.service';

@Component({
  selector: 'app-field',
  imports: [CommonModule, FormsModule],
  templateUrl: './field.html',
  styleUrl: './field.css'
})
export class FieldComponent implements OnInit {

  fields: Field[] = [];

  farms: Farm[] = [];

  newField: Field = {
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
  };

  editingField: Field | null = null;

  constructor(
    private fieldService: FieldService,
    private farmService: FarmService
  ) {

  }

  ngOnInit(): void {

    this.getAllFields();

    this.getAllFarms();

  }

  getAllFields(): void {

    this.fieldService.getAllFields().subscribe(data => {

      this.fields = data;

    });

  }

  getAllFarms(): void {

    this.farmService.getAllFarms().subscribe(data => {

      this.farms = data;

    });

  }

  addField(): void {

    this.fieldService.createField(this.newField).subscribe(data => {

      this.fields.push(data);

      this.newField = {
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
      };

    });

  }

  editField(field: Field): void {

    this.editingField = {
      ...field
    };

  }

  updateField(): void {

    if (this.editingField === null) {
      return;
    }

    this.fieldService
      .updateField(
        this.editingField.fieldId,
        this.editingField
      )
      .subscribe(data => {

        const index = this.fields.findIndex(
          field => field.fieldId === data.fieldId
        );

        if (index !== -1) {

          this.fields[index] = data;

        }

        this.editingField = null;

      });

  }

  cancelEdit(): void {

    this.editingField = null;

  }

  deleteField(id: number): void {

    this.fieldService.deleteField(id).subscribe(() => {

      this.fields = this.fields.filter(
        field => field.fieldId !== id
      );

    });

  }

}