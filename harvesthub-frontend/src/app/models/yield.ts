import { Field } from './field';

export interface Yield {

  yieldId: number;

  field: Field;

  cropName: string;

  quantity: number;

  unit: string;

  sellingPrice: number;

  revenue: number;

}