import axios from "axios";
import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/card";
import { IconButton } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const NewPostView = () => {
  const [imageLink, setImageLink] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [creator, setCreator] = useState();
  const navigate = useNavigate();

  const handleAddNew = async () => {
    try {
      const token = window.localStorage.getItem("token");
      await axios.post(
        "http://localhost:8000/post",
        { imageLink, title, content, creator },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/");
    } catch (e) {
      navigate("/login");
    }
  };

  return (
    <Flex justifyContent='center' alignItems='center' mt='100px'>
      <Card maxWidth='500px'>
        <CardHeader>New post</CardHeader>
        <CardBody>
          <Input
            type='text'
            placeholder='Link to image'
            required
            onChange={(e) => setImageLink(e.target.value)}
          />
          <Input
            type='text'
            placeholder='Title'
            required
            mt='5px'
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            type='text'
            placeholder='Content'
            required
            mt='5px'
            onChange={(e) => setContent(e.target.value)}
          />
          <Input
            type='text'
            placeholder='Creator'
            required
            mt='5px'
            onChange={(e) => setCreator(e.target.value)}
          />
        </CardBody>
        <CardFooter>
          <IconButton
            variant='solid'
            colorScheme='green'
            mr='3px'
            onClick={handleAddNew}
            aria-label='Submit'
            icon={<CheckIcon />}
          />
          <IconButton
            variant='solid'
            mr='3px'
            onClick={() => navigate("/")}
            aria-label='Discard'
            icon={<CloseIcon />}
          />
        </CardFooter>
      </Card>
    </Flex>
  );
};
