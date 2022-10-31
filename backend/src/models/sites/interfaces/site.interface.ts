import { IWard } from 'src/models/areas/interfaces/ward.interface';

export interface ISite {
  id: number;
  wardId: number;
  name: string;
  address: string;
  leader: string;
  table: number;
  createdAt: Date;
  updatedAt: Date;
  ward?: Partial<IWard>;
}
