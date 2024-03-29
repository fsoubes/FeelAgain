import { ArticleFragmentFragment } from "../../generated/graphql";
import ArticleItem from "./ArticleItem/ArticleItem";
import Masonry from "react-masonry-css";

interface ArticleListProps {
  articles: Array<{ __typename?: "Blog" } & ArticleFragmentFragment>;
  styles: {
    readonly [key: string]: string;
  };
  isBlog?: Boolean;
}

const breakpointColumnsObj = {
  default: 3,
  990: 2,
  500: 1,
};

const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  styles,
  isBlog = true,
}) => {
  const article = articles.map((item, index) => {
    const startArticle = (item.article as string)
      .split(" ")
      .slice(0, 20)
      .join(" ");
    return (
      <ArticleItem
        key={`${item._id}_${index}`}
        title={item.title}
        styles={styles}
        visual={item.image_url as string}
        description={`${startArticle}...`}
        author={item.author.nickname}
        id={item._id}
        ago={item.createdAt}
        isBlog={isBlog}
        tags={item.tags as string}
      />
    );
  });

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles.my__masonry_grid}
      columnClassName={styles.my__masonry_grid_column}
      style={{ marginTop: "2rem" }}
    >
      {article}
    </Masonry>
  );
};
export default ArticleList;
