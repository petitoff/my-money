import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import firebase from "firebase/app";

export interface UserState {
  user: {
    isLoggedIn: boolean;
    firebaseData?: firebase.User | null;
  };
}

const initialState: UserState = {
  user: {
    isLoggedIn: false,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signupUser: (state, action: PayloadAction<any>) => {
      state.user = {
        isLoggedIn: true,
        firebaseData: action.payload,
      };
    },
    logoutUser: (state) => {
      state.user = {
        isLoggedIn: false,
        firebaseData: null,
      };
    },
    loginUser: (state, action: PayloadAction<any>) => {
      state.user = {
        isLoggedIn: true,
        firebaseData: action.payload,
      };
    },
  },
});

export const { signupUser, logoutUser, loginUser } = userSlice.actions;
export default userSlice.reducer;
