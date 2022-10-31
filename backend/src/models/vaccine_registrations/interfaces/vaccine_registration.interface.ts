import { IGroup } from 'src/models/groups/interfaces/group.interface';
import { ISite } from 'src/models/sites/interfaces/site.interface';
import { IUser } from 'src/models/users/interfaces/user.interface';
import { IVaccine } from 'src/models/vaccines/interfaces/vaccine.interface';

export interface IVaccineRegistration {
  id: number;
  userId: number;
  groupId: number;
  siteId?: number;
  vaccineId?: number;
  code: string;
  insurranceCard: string;
  job: string;
  workPlace: string;
  address: string;
  time: Date;
  shift: number;
  status: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface IVaccineRegistrationResponse extends IVaccineRegistration {
  user?: Partial<IUser>;
  group?: Partial<IGroup>;
  site?: Partial<ISite>;
  vaccine?: Partial<IVaccine>;
}
