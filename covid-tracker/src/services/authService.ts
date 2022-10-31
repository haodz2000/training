import { IUser, IUserRegister } from '../interfaces/interface';
import { axioInstance } from '../utils/request/httpRequest';

export const register = async (
  data: IUserRegister
): Promise<Partial<IUser> | unknown> => {
  try {
    const res = await axioInstance.post<Partial<IUser>>('auth/register', data);
    return res.data;
  } catch (error: any) {
    alert(error.response.data.message);
  }
};
