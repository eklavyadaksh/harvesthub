import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Farm } from '../../models/farm';
import { FarmService } from '../../services/farm.service';

@Component({
  selector: 'app-farm',
  imports: [CommonModule, FormsModule],
  templateUrl: './farm.html',
  styleUrl: './farm.css'
})
export class FarmComponent implements OnInit {

  farms: Farm[] = [];

  newFarm: Omit<Farm, 'farmId'> = {
    name: '',
    location: '',
    area: 0
  };

  editingFarm: Farm | null = null;

  constructor(
    private farmService: FarmService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAllFarms();
  }

  getAllFarms(): void {
    this.farmService.getAllFarms().subscribe({
      next: (data) => {
        this.farms = [...data];
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Failed to fetch farms:', error);
      }
    });
  }

  addFarm(): void {
    this.farmService.createFarm(this.newFarm).subscribe({
      next: (data) => {
        this.farms = [...this.farms, data];

        this.newFarm = {
          name: '',
          location: '',
          area: 0
        };

        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Failed to add farm:', error);
      }
    });
  }

  editFarm(farm: Farm): void {
    this.editingFarm = { ...farm };
  }

  updateFarm(): void {
    if (this.editingFarm === null) {
      return;
    }

    const farmToUpdate: Farm = { ...this.editingFarm };

    this.farmService
      .updateFarm(farmToUpdate.farmId, farmToUpdate)
      .subscribe({
        next: (updatedFarm) => {
          this.farms = this.farms.map((farm) =>
            farm.farmId === updatedFarm.farmId
              ? { ...updatedFarm }
              : farm
          );

          this.editingFarm = null;
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Failed to update farm:', error);
        }
      });
  }

  cancelEdit(): void {
    this.editingFarm = null;
  }

  deleteFarm(id: number): void {
    this.farmService.deleteFarm(id).subscribe({
      next: () => {
        this.farms = this.farms.filter(
          (farm) => farm.farmId !== id
        );

        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Failed to delete farm:', error);
      }
    });
  }
}
