import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { PostsList } from "../components/PostsList";
import { useNavigate } from "react-router-dom";
import { Flex,Box } from "@chakra-ui/layout";
import { IconButton, Button } from "@chakra-ui/react";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ArrowUpDownIcon,
} from "@chakra-ui/icons";
import { Text, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";




export const PostsView = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState();
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const navigate = useNavigate();

  const fetchFeeds = useCallback(async () => {
    try {
      const token = window.localStorage.getItem("token");
      const result = await axios.get("http://localhost:8000/post",
        {
          params: { searchQuery, page },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setItems(result.data.posts);
      setIsLastPage(result.data.isLastPage);
    } catch (e) {
      navigate("/login");
    }
  }, [page, searchQuery, navigate]);

  const handleNext = () => {
    setPage((prev) => (isLastPage ? prev : prev + 1));
  };

  const handlePrevious = () => {
    setPage((prev) => (!prev ? prev : prev - 1));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchFeeds();
  };

  useEffect(() => {
    fetchFeeds();
  }, [fetchFeeds]);
  return (
    <Flex justifyContent='center' alignItems='center'>
      <Box>
        <Input
          mt='5px'
          mb='10px'
          placeholder='Search title'
          type='text'
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Flex alignItems='center' mb='10px' justifyContent='space-between'>
          <Flex alignItems='center'>
            {page > 0 && (
              <IconButton
                onClick={handlePrevious}
                aria-label='Pervious page'
                icon={<ChevronLeftIcon />}
              ></IconButton>
            )}
            <Text mr='10px' ml='10px'>
              {page + 1}
            </Text>
            {!isLastPage && (
              <IconButton
                onClick={handleNext}
                aria-label='Next page'
                icon={<ChevronRightIcon />}
              ></IconButton>
            )}
          </Flex>
          <Box>
            <Menu>
              <MenuButton as={Button} rightIcon={<ArrowUpDownIcon />}>
                Sort by
              </MenuButton>
              <MenuList>
                <MenuItem> Date</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
        {items.length ? (
          <PostsList items={items} fetchFeeds={fetchFeeds} />
        ) : null}
      </Box>
    </Flex>
  );
};
