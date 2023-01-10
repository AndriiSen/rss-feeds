import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import API from "../api/api";
import { PostsList } from "../components/PostsList";
import { useNavigate } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/layout";
import {
  IconButton,
  Button,
  Tag,
  TagLabel,
  TagLeftIcon,
} from "@chakra-ui/react";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  AddIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import { Text, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";

export const PostsView = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState();
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [sortCondition, setSortCondition] = useState(-1);
  const [sortBy, setSortBy] = useState("pubDate");
  const [filterCategory, setFilterCategory] = useState();
  const navigate = useNavigate();

  const fetchFeeds = useCallback(async () => {
    try {
      const result = await API.get("/post", {
        params: { searchQuery, page, sortCondition, sortBy, filterCategory },
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      setItems(result.data.posts);
      setIsLastPage(result.data.isLastPage);
    } catch (e) {
      if (e.response?.status === 401) {
        navigate("/login");
      }
    }
  }, [page, searchQuery, navigate, sortCondition, sortBy, filterCategory]);

  const handleSort = (propertyName, direction) => {
    setSortBy(propertyName);
    setSortCondition(direction);
  };

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
        <Flex
          alignItems='center'
          justifyContent='space-between'
          mt='10px'
          mb='10px'
        >
          <Input
            maxWidth='300px'
            placeholder='Search title'
            type='text'
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Button
            rightIcon={<AddIcon />}
            colorScheme='green'
            onClick={() => navigate("/new")}
          >
            Add new
          </Button>
        </Flex>

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
          {filterCategory && (
            <Tag
              heigth='10px'
              variant='subtle'
              onClick={() => setFilterCategory()}
            >
              <TagLeftIcon boxSize='12px' as={CloseIcon} />
              <TagLabel>{filterCategory}</TagLabel>
            </Tag>
          )}
          <Box>
            <Menu>
              <MenuButton as={Button} rightIcon={<ArrowUpDownIcon />}>
                Sort by
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    handleSort("pubDate", -1);
                  }}
                >
                  Date <ArrowDownIcon />
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleSort("pubDate", 1);
                  }}
                >
                  Date <ArrowUpIcon />
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleSort("creator", -1);
                  }}
                >
                  Creator Z-a
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleSort("creator", 1);
                  }}
                >
                  Creator A-z
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
        {items.length ? (
          <PostsList
            items={items}
            fetchFeeds={fetchFeeds}
            setFilterCategory={setFilterCategory}
          />
        ) : null}
      </Box>
    </Flex>
  );
};
