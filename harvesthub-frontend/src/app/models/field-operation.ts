import { Field } from './field';
import { Equipment } from './equipment';

export interface FieldOperation {

  operationId: number;

  field: Field;

  equipment: Equipment | null;

  operationType: string;

  operationDate: string;

  cost: number;

  description: string;

}