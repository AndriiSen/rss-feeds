import { PostsListItem } from "./PostsListItem";

export const PostsList = ({ items }) => {
  return (
    <>
      {items.map((item) => (
        <PostsListItem item={item} key={item.guid} />
      ))}
    </>
  );
};
