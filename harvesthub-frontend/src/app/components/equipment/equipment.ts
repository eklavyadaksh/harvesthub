import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Equipment } from '../../models/equipment';
import { EquipmentService } from '../../services/equipment.service';

@Component({
  selector: 'app-equipment',
  imports: [CommonModule, FormsModule],
  templateUrl: './equipment.html',
  styleUrl: './equipment.css'
})
export class EquipmentComponent implements OnInit {

  equipmentList: Equipment[] = [];

  newEquipment: Equipment = {
    equipmentId: 0,
    name: '',
    type: '',
    purchaseDate: '',
    status: ''
  };

  editingEquipment: Equipment | null = null;

  constructor(
    private equipmentService: EquipmentService
  ) {

  }

  ngOnInit(): void {

    this.getAllEquipment();

  }

  getAllEquipment(): void {

    this.equipmentService
      .getAllEquipment()
      .subscribe(data => {

        this.equipmentList = data;

      });

  }

  addEquipment(): void {

    this.equipmentService
      .createEquipment(this.newEquipment)
      .subscribe(data => {

        this.equipmentList.push(data);

        this.newEquipment = {
          equipmentId: 0,
          name: '',
          type: '',
          purchaseDate: '',
          status: ''
        };

      });

  }

  editEquipment(equipment: Equipment): void {

    this.editingEquipment = {
      ...equipment
    };

  }

  updateEquipment(): void {

    if (this.editingEquipment === null) {
      return;
    }

    this.equipmentService
      .updateEquipment(
        this.editingEquipment.equipmentId,
        this.editingEquipment
      )
      .subscribe(data => {

        const index = this.equipmentList.findIndex(
          equipment =>
            equipment.equipmentId === data.equipmentId
        );

        if (index !== -1) {

          this.equipmentList[index] = data;

        }

        this.editingEquipment = null;

      });

  }

  cancelEdit(): void {

    this.editingEquipment = null;

  }

  deleteEquipment(id: number): void {

    this.equipmentService
      .deleteEquipment(id)
      .subscribe(() => {

        this.equipmentList = this.equipmentList.filter(
          equipment =>
            equipment.equipmentId !== id
        );

      });

  }

}