export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  identifyCard: string;
  birthday: Date;
  gender: number;
  wardId: number;
  type: number;
  tokenResetPassword: string;
  createdAt: Date;
  updatedAt: Date;
  ward?: IWard;
}

export interface IUserRegister {
  name: string;
  email: string;
  password: string;
  identifyCard: string;
  birthday: Date;
  gender: number;
  wardId: number;
}

export interface IResponseLogin {
  token: string;
}

export interface IProvince {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IDistrict {
  id: number;
  provinceId: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  province?: IProvince;
}
export interface IWard {
  id: number;
  districtId: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  district?: IDistrict;
}
export interface ILocation {
  id: number;
  name: string;
  address: string;
  wardId: number;
  leader: string;
  table: number;
  ward?: IWard;
}
export interface IGroup {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface Shift {
  id: number;
  name: string;
}

export interface IVaccineRegistrationResponse {
  id: number;
  code: string;
  userId: number;
  groupId: number;
  insurranceCard: string;
  job: string;
  workPlace: string;
  address: string;
  time: Date;
  shift: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  vaccineId: number;
  siteId: number;
  user?: Partial<IUser>;
}
export interface IVaccineRegistration {
  userId: number;
  groupId: number;
  insurranceCard: string;
  job: string;
  workPlace: string;
  address: string;
  time: Date;
  shift: string;
  status: number;
}

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
export interface IVaccine {
  id: number;
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IDocument {
  id: number;
  name: string;
  hashName: string;
  description?: string;
  link: string;
  createdAt?: Date;
  updatedAt?: Date;
}
