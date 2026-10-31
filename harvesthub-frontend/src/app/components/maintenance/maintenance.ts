 import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Maintenance } from '../../models/maintenance';
import { Equipment } from '../../models/equipment';

import { MaintenanceService } from '../../services/maintenance.service';
import { EquipmentService } from '../../services/equipment.service';

@Component({
  selector: 'app-maintenance',
  imports: [CommonModule, FormsModule],
  templateUrl: './maintenance.html',
  styleUrl: './maintenance.css'
})
export class MaintenanceComponent implements OnInit {

  maintenanceList: Maintenance[] = [];

  equipmentList: Equipment[] = [];

  newMaintenance: Maintenance = {
    maintenanceId: 0,
    equipment: {
      equipmentId: 0,
      name: '',
      type: '',
      purchaseDate: '',
      status: ''
    },
    maintenanceDate: '',
    nextDate: '',
    cost: 0,
    description: ''
  };

  editingMaintenance: Maintenance | null = null;

  constructor(
    private maintenanceService: MaintenanceService,
    private equipmentService: EquipmentService
  ) {

  }

  ngOnInit(): void {

    this.getAllMaintenance();

    this.getAllEquipment();

  }

  getAllMaintenance(): void {

    this.maintenanceService
      .getAllMaintenance()
      .subscribe(data => {

        this.maintenanceList = data;

      });

  }

  getAllEquipment(): void {

    this.equipmentService
      .getAllEquipment()
      .subscribe(data => {

        this.equipmentList = data;

      });

  }

  addMaintenance(): void {

    this.maintenanceService
      .createMaintenance(this.newMaintenance)
      .subscribe(data => {

        this.maintenanceList.push(data);

        this.newMaintenance = {
          maintenanceId: 0,
          equipment: {
            equipmentId: 0,
            name: '',
            type: '',
            purchaseDate: '',
            status: ''
          },
          maintenanceDate: '',
          nextDate: '',
          cost: 0,
          description: ''
        };

      });

  }

  editMaintenance(maintenance: Maintenance): void {

    this.editingMaintenance = {
      ...maintenance
    };

  }

  updateMaintenance(): void {

    if (this.editingMaintenance === null) {
      return;
    }

    this.maintenanceService
      .updateMaintenance(
        this.editingMaintenance.maintenanceId,
        this.editingMaintenance
      )
      .subscribe(data => {

        const index = this.maintenanceList.findIndex(
          maintenance =>
            maintenance.maintenanceId === data.maintenanceId
        );

        if (index !== -1) {

          this.maintenanceList[index] = data;

        }

        this.editingMaintenance = null;

      });

  }

  cancelEdit(): void {

    this.editingMaintenance = null;

  }

  deleteMaintenance(id: number): void {

    this.maintenanceService
      .deleteMaintenance(id)
      .subscribe(() => {

        this.maintenanceList =
          this.maintenanceList.filter(
            maintenance =>
              maintenance.maintenanceId !== id
          );

      });

  }

}