import { IProvince } from './province.interface';

export interface IDistrict {
  id: number;
  provinceId: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  province?: Partial<IProvince>;
}
