import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app';
import { ILocation } from '../../interfaces/interface';
import { axioInstance } from '../../utils/request/httpRequest';

interface ILocationState {
  location: Partial<ILocation>;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  loading: boolean;
}

const initialState: ILocationState = {
  location: {
    id: 0,
    name: '',
    address: '',
    wardId: 0,
    leader: '',
    table: 0
  },
  status: 'idle',
  loading: false
};

export const fetchCreateLocation = createAsyncThunk(
  '/create-location',
  async (payload: Partial<ILocation>): Promise<ILocation> => {
    try {
      const token = localStorage.getItem('token') || '';
      const res = await axioInstance.post<ILocation>('sites', payload, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      throw new Error();
    }
  }
);
export const LocationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateLocation.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(fetchCreateLocation.fulfilled, (state, action) => {
        state.location = action.payload;
        state.status = 'succeeded';
        state.loading = false;
      })
      .addCase(fetchCreateLocation.rejected, (state) => {
        state.status = 'failed';
        state.loading = false;
      });
  }
});

export const selectLocation = (state: RootState) => state.location.location;
export default LocationSlice.reducer;
