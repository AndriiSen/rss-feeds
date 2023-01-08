import axios from "axios";
import { useState } from "react";

export const RegisterView = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const registerNewUser = async () => {
    if (firstName && lastName && email && password) {
      const result = await axios.post("http://localhost:8000/register",
        {
          firstName,
          lastName,
          email,
          password,
        }
      );
      window.localStorage.setItem("token", result.data.token);
    }
  };
  return (
    <>
      <input
        onChange={(e) => setFirstName(e.target.value)}
        type='text'
        placeholder='first name'
        required
      />
      <input
        onChange={(e) => setLastName(e.target.value)}
        type='text'
        placeholder='last name'
        required
      />
      <input
        onChange={(e) => setEmail(e.target.value)}
        type='email'
        placeholder='Email'
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type='password'
        placeholder='Password'
        required
      />
      <button onClick={registerNewUser}> Register </button>
    </>
  );
};
