import { Equipment } from './equipment';

export interface Maintenance {

  maintenanceId: number;

  equipment: Equipment;

  maintenanceDate: string;

  nextDate: string;

  cost: number;

  description: string;

}