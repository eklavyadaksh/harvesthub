import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FarmComponent } from './components/farm/farm';
import { FieldComponent } from './components/field/field';
import { CropPlanComponent } from './components/crop-plan/crop-plan';
import { EquipmentComponent } from './components/equipment/equipment';
import { FieldOperationComponent } from './components/field-operation/field-operation';
import { YieldComponent } from './components/yield/yield';
import { MaintenanceComponent } from './components/maintenance/maintenance';

import { FarmService } from './services/farm.service';
import { FieldService } from './services/field.service';
import { CropPlanService } from './services/crop-plan.service';
import { EquipmentService } from './services/equipment.service';
import { FieldOperationService } from './services/field-operation.service';
import { YieldService } from './services/yield.service';
import { MaintenanceService } from './services/maintenance.service';
import { catchError, of } from 'rxjs';

export interface NavSection {
  id: string;
  label: string;
  icon: string;
  color: string;
  desc: string;
}

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule,
    FarmComponent,
    FieldComponent,
    CropPlanComponent,
    EquipmentComponent,
    FieldOperationComponent,
    YieldComponent,
    MaintenanceComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  activeSection = 'overview';
  viewMode: 'all' | 'single' = 'all';
  sidebarCollapsed = false;
  mobileMenuOpen = false;

  currentYear = new Date().getFullYear();
  currentDateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Current Agronomic Season (Northern Hemisphere / India calendar)
  get currentAgronomicSeason(): string {
    const month = new Date().getMonth(); // 0-indexed
    if (month >= 5 && month <= 9) return 'Kharif (Monsoon)';
    if (month >= 9 || month <= 2) return 'Rabi (Winter)';
    return 'Zaid (Summer)';
  }

  // Dashboard KPI statistics loaded dynamically
  stats = {
    farmsCount: 0,
    fieldsCount: 0,
    totalAreaAcres: 0,
    cropsCount: 0,
    equipmentCount: 0,
    availableEquipmentCount: 0,
    operationsCount: 0,
    totalOperationCost: 0,
    yieldsCount: 0,
    totalRevenue: 0,
    maintenanceCount: 0,
    totalMaintenanceCost: 0
  };

  navSections: NavSection[] = [
    { id: 'overview', label: 'Overview', icon: 'bi-grid-1x2-fill', color: '#10b981', desc: 'Summary & KPIs' },
    { id: 'farms', label: 'Farms', icon: 'bi-house-door-fill', color: '#15803d', desc: 'Holdings & Land' },
    { id: 'fields', label: 'Fields', icon: 'bi-grid-3x3-gap-fill', color: '#b45309', desc: 'Parcels & Zones' },
    { id: 'crop-plans', label: 'Crop Plans', icon: 'bi-calendar2-check-fill', color: '#047857', desc: 'Schedules & Seasons' },
    { id: 'equipment', label: 'Equipment', icon: 'bi-tools', color: '#0369a1', desc: 'Fleet & Tools' },
    { id: 'operations', label: 'Operations', icon: 'bi-gear-wide-connected', color: '#6d28d9', desc: 'Field Activities' },
    { id: 'yields', label: 'Yield & Sales', icon: 'bi-graph-up-arrow', color: '#c2410c', desc: 'Harvest & Revenue' },
    { id: 'maintenance', label: 'Maintenance', icon: 'bi-wrench-adjustable', color: '#be123c', desc: 'Service & Repairs' }
  ];

  private observer: IntersectionObserver | null = null;

  constructor(
    private farmService: FarmService,
    private fieldService: FieldService,
    private cropPlanService: CropPlanService,
    private equipmentService: EquipmentService,
    private fieldOperationService: FieldOperationService,
    private yieldService: YieldService,
    private maintenanceService: MaintenanceService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.setupScrollSpy();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  loadDashboardData(): void {
    // 1. Farms
    this.farmService.getAllFarms().pipe(catchError(() => of([]))).subscribe(farms => {
      this.stats.farmsCount = farms.length;
    });

    // 2. Fields
    this.fieldService.getAllFields().pipe(catchError(() => of([]))).subscribe(fields => {
      this.stats.fieldsCount = fields.length;
      this.stats.totalAreaAcres = fields.reduce((sum, f) => sum + (f.area || 0), 0);
    });

    // 3. Crop Plans
    this.cropPlanService.getAllCropPlans().pipe(catchError(() => of([]))).subscribe(crops => {
      this.stats.cropsCount = crops.length;
    });

    // 4. Equipment
    this.equipmentService.getAllEquipment().pipe(catchError(() => of([]))).subscribe(equip => {
      this.stats.equipmentCount = equip.length;
      this.stats.availableEquipmentCount = equip.filter(e => e.status === 'Available').length;
    });

    // 5. Operations
    this.fieldOperationService.getAllFieldOperations().pipe(catchError(() => of([]))).subscribe(ops => {
      this.stats.operationsCount = ops.length;
      this.stats.totalOperationCost = ops.reduce((sum, op) => sum + (op.cost || 0), 0);
    });

    // 6. Yields
    this.yieldService.getAllYields().pipe(catchError(() => of([]))).subscribe(yields => {
      this.stats.yieldsCount = yields.length;
      this.stats.totalRevenue = yields.reduce((sum, y) => sum + (y.revenue || 0), 0);
    });

    // 7. Maintenance
    this.maintenanceService.getAllMaintenance().pipe(catchError(() => of([]))).subscribe(maint => {
      this.stats.maintenanceCount = maint.length;
      this.stats.totalMaintenanceCost = maint.reduce((sum, m) => sum + (m.cost || 0), 0);
    });
  }

  get netOperatingMargin(): number {
    return this.stats.totalRevenue - (this.stats.totalOperationCost + this.stats.totalMaintenanceCost);
  }

  getStatCount(sectionId: string): number | string {
    switch (sectionId) {
      case 'farms': return this.stats.farmsCount;
      case 'fields': return this.stats.fieldsCount;
      case 'crop-plans': return this.stats.cropsCount;
      case 'equipment': return this.stats.equipmentCount;
      case 'operations': return this.stats.operationsCount;
      case 'yields': return '₹' + this.stats.totalRevenue.toLocaleString();
      case 'maintenance': return this.stats.maintenanceCount;
      default: return '';
    }
  }

  selectSection(sectionId: string): void {
    this.activeSection = sectionId;
    this.mobileMenuOpen = false;

    if (this.viewMode === 'all') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  setViewMode(mode: 'all' | 'single'): void {
    this.viewMode = mode;
    if (mode === 'all') {
      setTimeout(() => this.setupScrollSpy(), 100);
    } else {
      this.observer?.disconnect();
    }
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  private setupScrollSpy(): void {
    if (typeof IntersectionObserver === 'undefined') return;

    this.observer?.disconnect();

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '-90px 0px -55% 0px',
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      if (this.viewMode !== 'all') return;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeSection = entry.target.id;
        }
      });
    }, options);

    setTimeout(() => {
      this.navSections.forEach(section => {
        const el = document.getElementById(section.id);
        if (el) this.observer!.observe(el);
      });
    }, 400);
  }
}