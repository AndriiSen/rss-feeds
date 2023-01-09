import { Card, CardBody, CardFooter } from "@chakra-ui/card";
import { Image } from "@chakra-ui/image";
import { Stack, Text, Heading } from "@chakra-ui/layout";
import { Button, IconButton } from "@chakra-ui/button";
import { Link } from "@chakra-ui/react";
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useState } from "react";
import { Input } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";

export const PostsListItem = ({ item, fetchFeeds }) => {
  const { imageLink, link, title, content, creator, pubDate, _id } = item;

  const [isEditMode, setIsEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);

  const date = new Date(pubDate);
  console.log(date.toLocaleString().split(",")[0]);
  console.log();

  const handleDelete = async () => {
    const token = window.localStorage.getItem("token");
    await axios.delete(`http://localhost:8000/post/${_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchFeeds();
  };

  const handleUpdate = async () => {
    const token = window.localStorage.getItem("token");
    await axios.put(
      `http://localhost:8000/post/${_id}`,
      { title: newTitle, content: newContent },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setIsEditMode(false);

    fetchFeeds();
  };

  const renderInputs = () => {
    return (
      <>
        <Input
          value={newTitle}
          size='lg'
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <Textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
      </>
    );
  };
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow='hidden'
      variant='outline'
      width='100%'
      mb='5px'
    >
      <Image
        objectFit='cover'
        maxW={{ base: "100%", sm: "200px" }}
        src={imageLink}
        alt='Caffe Latte'
      />

      <Stack>
        <CardBody>
          {isEditMode ? (
            renderInputs()
          ) : (
            <>
              <Heading size='md'>{title}</Heading>
              <Text py='2'>{content}</Text>
            </>
          )}
          <Text fontWeight='600'>{creator}</Text>
          <Text>
            {date.toLocaleString().split(",")[0] +
              "  " +
              date.getHours() +
              ":" +
              "00"}
          </Text>
        </CardBody>

        <CardFooter>
          <Link href={link}>
            <Button variant='solid' mr='20px'>
              Read more ...
            </Button>
          </Link>
          <IconButton
            variant='solid'
            colorScheme='blue'
            mr='3px'
            onClick={() => setIsEditMode(true)}
            aria-label='Edit'
            icon={<EditIcon />}
          />
          <IconButton
            variant='solid'
            colorScheme='red'
            mr='3px'
            onClick={handleDelete}
            aria-label='Delete'
            icon={<DeleteIcon />}
          />
          {isEditMode && (
            <>
              <IconButton
                variant='solid'
                colorScheme='green'
                mr='3px'
                onClick={handleUpdate}
                aria-label='Submit'
                icon={<CheckIcon />}
              />
              <IconButton
                variant='solid'
                mr='3px'
                onClick={() => setIsEditMode(false)}
                aria-label='Discard'
                icon={<CloseIcon />}
              />
            </>
          )}
        </CardFooter>
      </Stack>
    </Card>
  );
};
