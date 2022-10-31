import { IDistrict, IProvince, IWard } from '../interfaces/interface';
import { axioInstance } from '../utils/request/httpRequest';

export const findAllProvinces = async (): Promise<IProvince[]> => {
  try {
    const res = await axioInstance.get<IProvince[]>('provinces');
    return res.data;
  } catch (error) {
    throw new Error();
  }
};

export const findDistricts = async (id: number): Promise<IDistrict[]> => {
  try {
    const res = await axioInstance.get<IDistrict[]>(`provinces/${id}`);
    return res.data;
  } catch (error) {
    throw new Error();
  }
};

export const findWards = async (id: number): Promise<IWard[]> => {
  try {
    const res = await axioInstance.get<IWard[]>(`districts/${id}`);
    return res.data;
  } catch (error) {
    throw new Error();
  }
};
