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
}

export type IUserResponse = Partial<IUser>;
