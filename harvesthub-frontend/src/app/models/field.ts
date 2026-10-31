import { Farm } from './farm';

export interface Field {

  fieldId: number;

  farm: Farm;

  name: string;

  location: string;

  area: number;

}