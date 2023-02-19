import { useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAppDispatch } from "./hooks";
import { signupUser } from "../redux/userSlice";

export const useSignup = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const signup = async (
    displayName: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(res);

      if (!res.user) {
        throw new Error("Could not complete the signup");
      }

      await res.user.updateProfile({ displayName });

      // dispatch signupUser action
      dispatch(signupUser(res.user));

      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { error, loading, signup };
};
