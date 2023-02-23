import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

import "./LoginForm.css";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const { login } = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await login(email, password);
    if (response === undefined) {
      setError(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`login-form ${error && "bad-login"}`}
    >
      <h2>Login</h2>
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

      <button className="btn" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
