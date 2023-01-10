import { Card, CardBody, CardFooter } from "@chakra-ui/card";
import { Image } from "@chakra-ui/image";
import API from "../api/api";
import { Stack, Text, Heading } from "@chakra-ui/layout";
import { Button, IconButton } from "@chakra-ui/button";
import { Link } from "@chakra-ui/react";
import {
  EditIcon,
  DeleteIcon,
  CheckIcon,
  CloseIcon,
  AddIcon,
} from "@chakra-ui/icons";
import axios from "axios";
import { useState } from "react";
import { Input } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { Tag, TagLabel, TagLeftIcon, Flex } from "@chakra-ui/react";

export const PostsListItem = ({ item, fetchFeeds, setFilterCategory }) => {
  const { categories, imageLink, link, title, content, creator, pubDate, _id } =
    item;
  const [isEditMode, setIsEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);

  const date = new Date(pubDate);

  const handleDelete = async () => {
    await API.delete(`/post/${_id}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    fetchFeeds();
  };

  const handleUpdate = async () => {
    await API.put(
      `/post/${_id}`,
      { title: newTitle, content: newContent },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
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
          <Flex flexDirection='column'>
            <Flex>
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
            </Flex>

            <Flex flexWrap='wrap'>
              {categories.map((category, index) => (
                <Tag
                  mt='3px'
                  mr='3px'
                  heigth='10px'
                  key={category + index}
                  size='sm'
                  variant='subtle'
                  colorScheme='cyan'
                  onClick={() => setFilterCategory(category)}
                >
                  <TagLeftIcon boxSize='12px' as={AddIcon} />
                  <TagLabel>{category}</TagLabel>
                </Tag>
              ))}
            </Flex>
          </Flex>
        </CardFooter>
      </Stack>
    </Card>
  );
};
