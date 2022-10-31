import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app';
import { IDocument } from '../../interfaces/interface';
import { axioInstance } from '../../utils/request/httpRequest';

interface IDocumentState {
  document: IDocument;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  loading: boolean;
}

const initialState: IDocumentState = {
  document: {
    id: 0,
    name: '',
    hashName: '',
    link: ''
  },
  status: 'idle',
  loading: false
};

export const fetchCreateDocument = createAsyncThunk(
  '/create-document',
  async (payload: Partial<IDocument>) => {
    try {
      const token = localStorage.getItem('token') || '';
      const res = await axioInstance.post<IDocument>('documents', payload, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      });
      return res.data;
    } catch (error) {
      throw new Error();
    }
  }
);
export const DocumentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateDocument.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(fetchCreateDocument.fulfilled, (state, action) => {
        state.document = action.payload;
        state.status = 'succeeded';
        state.loading = false;
      })
      .addCase(fetchCreateDocument.rejected, (state) => {
        state.status = 'failed';
        state.loading = false;
      });
  }
});

export const selectDocument = (state: RootState) => state.document.document;
export default DocumentSlice.reducer;
