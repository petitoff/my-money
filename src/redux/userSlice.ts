import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import firebase from "firebase/app";
import {
  saveToLocalStorage,
  clearLocalStorage,
} from "../hooks/useSaveAndLoadLocalStorage";

export interface UserState {
  user: {
    isLoggedIn: boolean;
    firebaseData?: firebase.User | null;
    firestoreData?: firebase.firestore.DocumentData[] | null;
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

      clearLocalStorage();
    },
    loginUser: (state, action: PayloadAction<firebase.User>) => {
      state.user = {
        isLoggedIn: true,
        firebaseData: action.payload,
      };

      saveToLocalStorage(state);
    },
    addFirestoreData: (
      state,
      action: PayloadAction<firebase.firestore.DocumentData>
    ) => {
      state.user.firestoreData?.push(action.payload);
    },
    deleteFirestoreData: (
      state,
      action: PayloadAction<firebase.firestore.DocumentData>
    ) => {
      // find the index of the item to update
      const index = state.user.firestoreData?.findIndex(
        (item) => item.id === action.payload.id
      );

      // update the item
      state.user.firestoreData?.splice(index!, 1);
    },
    updateFirestoreData: (
      state,
      action: PayloadAction<firebase.firestore.DocumentData>
    ) => {
      // find the index of the item to update
      const index = state.user.firestoreData?.findIndex(
        (item) => item.id === action.payload.id
      );

      // update the item
      state.user.firestoreData?.splice(index!, 1, action.payload);
    },
  },
});

export const {
  signupUser,
  logoutUser,
  loginUser,
  addFirestoreData,
  updateFirestoreData,
  deleteFirestoreData,
} = userSlice.actions;
export default userSlice.reducer;
