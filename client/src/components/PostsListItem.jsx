import parse from "html-react-parser";

export const PostsListItem = ({ item }) => {
  const parsedContent = parse(item.content);
  const date = new Date(item.pubDate);

  return (
    <>
      <h4>{item.title}</h4>
      {parsedContent}
      <p>{item.creator}</p>
      <p>{date.toLocaleDateString()}</p>
    </>
  );
};
