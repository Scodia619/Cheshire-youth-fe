import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            id="username"
            onChange={handleUsername}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            id="password"
            onChange={handlePassword}
          />
        </label>
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
