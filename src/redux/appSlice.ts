import { createSlice } from "@reduxjs/toolkit";

export interface AppState {
  isDarkMode: boolean;
  titleTab: string;
}

const initialState: AppState = {
  isDarkMode: false,
  titleTab: "MyMoney | Home",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setTitleTab: (state, action) => {
      state.titleTab = `MyMoney | ${action.payload}`;
    },
  },
});

export const { toggleDarkMode, setTitleTab } = appSlice.actions;
export default appSlice.reducer;
