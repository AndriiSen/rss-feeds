import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { PostsList } from "../components/PostsList";
import { useNavigate } from "react-router-dom";

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
    <>
      <input type='text' onChange={(e) => handleSearch(e.target.value)} />
      {!isLastPage && <button onClick={handleNext}> Next Page</button>}
      <span>{`Page : ${page + 1}`}</span>
      {page > 0 && <button onClick={handlePrevious}> Previous Page</button>}
      {items.length ? <PostsList items={items} /> : null}
    </>
  );
};
