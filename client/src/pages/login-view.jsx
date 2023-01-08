import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleTypeEmail = (email) => {
    setEmail(email);
  };
  const handleTypePassword = (password) => {
    setPassword(password);
  };

  const handleLogin = async () => {
    const result = await axios.post("http://localhost:8000/login",
      {
        email,
        password,
      }
    );
    window.localStorage.setItem("token", result.data.token);
    navigate("/");
  };

  return (
    <>
      <input type='email' onChange={(e) => handleTypeEmail(e.target.value)} />
      <input
        type='password'
        onChange={(e) => handleTypePassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => navigate("/register")}> Register </button>
    </>
  );
};
