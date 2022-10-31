import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app';
import {
  IVaccineRegistration,
  IVaccineRegistrationResponse
} from '../../interfaces/interface';
import { axioInstance } from '../../utils/request/httpRequest';

interface IVaccineRegistrationState {
  data: Partial<IVaccineRegistrationResponse>;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  loading: boolean;
}

export const registrationAsync = createAsyncThunk(
  '/registration-vaccine',
  async (
    payload: IVaccineRegistration
  ): Promise<Partial<IVaccineRegistrationResponse>> => {
    try {
      const token = localStorage.getItem('token') || '';
      const response = await axioInstance.post(
        'vaccine-registrations',
        payload,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`
          }
        }
      );
      return response.data;
    } catch (error: any) {
      alert(error.response.data.message);
      return error.response.data.message;
    }
  }
);

const initialState: IVaccineRegistrationState = {
  data: {
    id: 0,
    userId: 0,
    groupId: 0,
    insurranceCard: '',
    job: '',
    workPlace: '',
    address: '',
    shift: '',
    status: 1
  },
  status: 'idle',
  loading: false
};

export const RegistrationVaccineSlice = createSlice({
  name: 'registrationVaccine',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registrationAsync.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(registrationAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(registrationAsync.rejected, (state, payload) => {
        state.status = 'failed';
        state.loading = false;
      });
  }
});

export const selectRegistration = (state: RootState) =>
  state.registrationVaccine.data;
export default RegistrationVaccineSlice.reducer;
