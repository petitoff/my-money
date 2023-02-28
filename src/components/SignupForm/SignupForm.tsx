import { useState, useEffect } from "react";
import { useSignup } from "../../hooks/useSignup";
import { setTitleTab } from "../../redux/appSlice";
import { useAppDispatch } from "../../hooks/hooks";

import "./SignupForm.css";

const SignupForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");

  const { signup, loading, error } = useSignup();
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signup(displayName, email, password);
  };

  useEffect(() => {
    dispatch(setTitleTab("Signup"));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h2>Signup</h2>

      <label>
        <span>name:</span>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </label>
      <label>
        <span>email:</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      {!loading ? (
        <button className="btn" type="submit">
          Signup
        </button>
      ) : (
        <button className="btn" type="submit" disabled>
          loading
        </button>
      )}

      {error && <p>{error}</p>}
    </form>
  );
};

export default SignupForm;
