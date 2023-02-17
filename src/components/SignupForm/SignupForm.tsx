import { useState } from "react";
import "./SignupForm.css";

const SignupForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted");

    console.log("email: ", email);
    console.log("password: ", password);
    console.log("displayName: ", displayName);
  };

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

      <button className="btn" type="submit">
        Signup
      </button>
    </form>
  );
};

export default SignupForm;
