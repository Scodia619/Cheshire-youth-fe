import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/userContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api";

const Login = () => {
  const navigate = useNavigate();

  const {user, setUser} = useContext(UserContext)

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const notify = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = {
      username,
      password,
    };
    loginUser(loginData)
      .then((user) => {
        setUser(user)
        navigate("/");
      })
      .catch(({ response: { data } }) => {
        notify(data.msg);
      });
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="username" className="form-label">
          Username:
        </label>
          <input
            type="text"
            className="form-input"
            name="username"
            id="username"
            onChange={handleUsername}
          />
        <label htmlFor="password" className="form-label">
          Password:
        </label>
          <input
            type="password"
            className="form-input"
            name="password"
            id="password"
            onChange={handlePassword}
          />
        <button className="submit">Login</button>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Login;
