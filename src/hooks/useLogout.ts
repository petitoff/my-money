import { useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAppDispatch } from "./hooks";
import { logoutUser } from "../redux/userSlice";

export const useLogout = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await projectAuth.signOut();
      dispatch(logoutUser());
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { error, loading, logout };
};
