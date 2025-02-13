import { configureStore } from '@reduxjs/toolkit';
import { mediAppApi } from './features/apis/apiSlice';
import userslice from './features/user/usersSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    user: userslice,
    [mediAppApi.reducerPath] : mediAppApi.reducer
  },
  middleware : getDefaultMiddleware =>
  getDefaultMiddleware().concat([mediAppApi.middleware]),
});

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;




