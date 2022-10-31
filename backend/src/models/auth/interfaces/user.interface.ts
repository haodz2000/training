export interface IUser {
  id: number;
  indentifyCard: string;
  password: string;
  email: string;
  name: string;
  birthday: Date;
  wardId: number;
  gender: number;
  type: number;
  tokenResetPassword: string;
  createdAt: Date;
  updatedAt: Date;
}
