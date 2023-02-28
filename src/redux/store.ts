import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import transactionSlice from "./transactionSlice";
import appSlice from "./appSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    transaction: transactionSlice,
    app: appSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
