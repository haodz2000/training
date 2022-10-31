import { IDistrict } from './district.interface';

export interface IWard {
  id: number;
  districtId: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  district?: Partial<IDistrict>;
}
