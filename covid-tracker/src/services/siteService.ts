import { ILocation } from '../interfaces/interface';
import { axioInstance } from '../utils/request/httpRequest';

export const findAll = async (): Promise<ILocation[]> => {
  try {
    const res = await axioInstance.get<ILocation[]>('sites');
    return res.data;
  } catch (error) {
    throw new Error();
  }
};
