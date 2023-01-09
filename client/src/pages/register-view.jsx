import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";

export const RegisterView = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const registerNewUser = async () => {
    if (firstName && lastName && email && password) {
      const result = await axios.post("http://localhost:8000/register", {
        firstName,
        lastName,
        email,
        password,
      });
      window.localStorage.setItem("token", result.data.token);
      navigate("/login");
    }
  };
  return (
    <Flex justifyContent='center' alignItems='center' mt='100px'>
      <Card>
        <CardHeader>Registration</CardHeader>
        <CardBody maxWidth='500px'>
          <Input
            onChange={(e) => setFirstName(e.target.value)}
            type='text'
            placeholder='First name'
            required
          />
          <Input
            onChange={(e) => setLastName(e.target.value)}
            type='text'
            mt='10px'
            placeholder='Last name'
            required
          />
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            mt='10px'
            placeholder='Email'
            required
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            mt='10px'
            placeholder='Password'
            required
          />
        </CardBody>
        <CardFooter>
          <Button mr='10px' onClick={registerNewUser}>
            Create new user
          </Button>
        </CardFooter>
      </Card>
    </Flex>
  );
};
