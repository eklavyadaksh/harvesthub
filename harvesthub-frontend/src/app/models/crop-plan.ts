import { Field } from './field';

export interface CropPlan {

  planId: number;

  field: Field;

  cropName: string;

  season: string;

  sowingDate: string;

  harvestDate: string;

}