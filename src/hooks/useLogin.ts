import { useState } from "react";
import { useAppDispatch } from "./hooks";
import { projectAuth } from "../firebase/config";
import { loginUser } from "../redux/userSlice";
// import { useNavigate } from "react-router";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      if (res.user === null) throw new Error("User is null");
      dispatch(loginUser(res.user));

      setLoading(false);
      // navigate("/");

      return res.user;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { error, loading, login };
};
