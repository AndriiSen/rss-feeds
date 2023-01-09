import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";


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
    <Flex justifyContent='center' alignItems='center' mt='100px'>
      <Card>
        <CardHeader>Login</CardHeader>
        <CardBody>
          <Input
            type='email'
            placeholder='Email goes here'
            onChange={(e) => handleTypeEmail(e.target.value)}
          />
          <Input
            type='password'
            mt='10px'
            placeholder='Password'
            onChange={(e) => handleTypePassword(e.target.value)}
          />
        </CardBody>
        <CardFooter>
          <Button mr="10px" onClick={handleLogin}>Login</Button>
          <Button onClick={() => navigate("/register")}> Register </Button>
        </CardFooter>
      </Card>
    </Flex>
  );
};
