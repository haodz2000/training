import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app';
import { axioInstance } from '../../utils/request/httpRequest';
export interface ForgotState {
  message: string;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  loading: boolean;
}

const initialState: ForgotState = {
  message: '',
  status: 'idle',
  loading: false
};
interface IPayload {
  email: string;
}
export const forgotPasswordAsync = createAsyncThunk(
  'user/forgotPassword',
  async (
    payload: IPayload,
    { rejectWithValue, fulfillWithValue }
  ): Promise<string | unknown> => {
    try {
      const res = await axioInstance.post<{ message: string }>(
        'forgot-password',
        payload
      );
      return fulfillWithValue(res.data.message);
    } catch (error: any) {
      return rejectWithValue(error.response.data.message[0]);
    }
  }
);

export const ForgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    resetDefault: (state) => {
      state.loading = false;
      state.status = 'idle';
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPasswordAsync.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(forgotPasswordAsync.fulfilled, (state, action) => {
        state.message = action.payload as string;
        state.status = 'succeeded';
        state.loading = false;
      })
      .addCase(forgotPasswordAsync.rejected, (state, action) => {
        state.message = action.payload as string;
        state.status = 'failed';
        state.loading = false;
      });
  }
});

export const { resetDefault } = ForgotPasswordSlice.actions;
export const selectLoading = (state: RootState) => state.forgotPassword.loading;
export const selectState = (state: RootState) => state.forgotPassword;
export default ForgotPasswordSlice.reducer;
