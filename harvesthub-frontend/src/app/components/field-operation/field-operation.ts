import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FieldOperation } from '../../models/field-operation';
import { Field } from '../../models/field';
import { Equipment } from '../../models/equipment';

import { FieldOperationService } from '../../services/field-operation.service';
import { FieldService } from '../../services/field.service';
import { EquipmentService } from '../../services/equipment.service';

@Component({
  selector: 'app-field-operation',
  imports: [CommonModule, FormsModule],
  templateUrl: './field-operation.html',
  styleUrl: './field-operation.css'
})
export class FieldOperationComponent implements OnInit {

  fieldOperations: FieldOperation[] = [];

  fields: Field[] = [];

  equipmentList: Equipment[] = [];

  newOperation: FieldOperation = {
    operationId: 0,
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
    equipment: null,
    operationType: '',
    operationDate: '',
    cost: 0,
    description: ''
  };

  editingOperation: FieldOperation | null = null;

  constructor(
    private fieldOperationService: FieldOperationService,
    private fieldService: FieldService,
    private equipmentService: EquipmentService
  ) {

  }

  ngOnInit(): void {

    this.getAllFieldOperations();

    this.getAllFields();

    this.getAllEquipment();

  }

  getAllFieldOperations(): void {

    this.fieldOperationService
      .getAllFieldOperations()
      .subscribe(data => {

        this.fieldOperations = data;

      });

  }

  getAllFields(): void {

    this.fieldService
      .getAllFields()
      .subscribe(data => {

        this.fields = data;

      });

  }

  getAllEquipment(): void {

    this.equipmentService
      .getAllEquipment()
      .subscribe(data => {

        this.equipmentList = data;

      });

  }

  addFieldOperation(): void {

    this.fieldOperationService
      .createFieldOperation(this.newOperation)
      .subscribe(data => {

        this.fieldOperations.push(data);

        this.newOperation = {
          operationId: 0,
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
          equipment: null,
          operationType: '',
          operationDate: '',
          cost: 0,
          description: ''
        };

      });

  }

  editFieldOperation(operation: FieldOperation): void {

    this.editingOperation = {
      ...operation
    };

  }

  updateFieldOperation(): void {

    if (this.editingOperation === null) {
      return;
    }

    this.fieldOperationService
      .updateFieldOperation(
        this.editingOperation.operationId,
        this.editingOperation
      )
      .subscribe(data => {

        const index = this.fieldOperations.findIndex(
          operation =>
            operation.operationId === data.operationId
        );

        if (index !== -1) {

          this.fieldOperations[index] = data;

        }

        this.editingOperation = null;

      });

  }

  cancelEdit(): void {

    this.editingOperation = null;

  }

  deleteFieldOperation(id: number): void {

    this.fieldOperationService
      .deleteFieldOperation(id)
      .subscribe(() => {

        this.fieldOperations = this.fieldOperations.filter(
          operation =>
            operation.operationId !== id
        );

      });

  }

}