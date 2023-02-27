import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import transactionSlice from "./transactionSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    transaction: transactionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
