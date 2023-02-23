import { UserState } from "../redux/userSlice";

export const saveToLocalStorage = (state: UserState) => {
  try {
    const serializedState = JSON.stringify(state.user.firebaseData);
    localStorage.setItem("user", serializedState);
  } catch (e) {
    console.log(e);
  }
};

export const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("user");
    if (serializedState === null) return undefined;

    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

export const clearLocalStorage = () => {
  try {
    localStorage.clear();
  } catch (e) {
    console.log(e);
  }
};
