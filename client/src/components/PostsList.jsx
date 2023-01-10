import { Flex } from "@chakra-ui/layout";
import { PostsListItem } from "./PostsListItem";

export const PostsList = ({ items, fetchFeeds, setFilterCategory }) => {
  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center" maxWidth="800px">
      {items.map((item) => (
        <PostsListItem item={item} key={item.guid} fetchFeeds={fetchFeeds} setFilterCategory={setFilterCategory}/>
      ))}
    </Flex>
  );
};
