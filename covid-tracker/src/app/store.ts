import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {
  userReducer,
  forgotPasswordReducer,
  registrationVaccineReducer
} from '../features/user/';
import { authReducer } from '../features/auth';
import { documentReducer } from '../features/document';
import { locationReducer } from '../features/vaccine';
export const store = configureStore({
  reducer: {
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    registrationVaccine: registrationVaccineReducer,
    document: documentReducer,
    location: locationReducer,
    auth: authReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
