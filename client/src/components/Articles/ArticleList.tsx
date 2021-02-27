import React from "react";
import { ArticleFragmentFragment } from "../../generated/graphql";
import ArticleItem from "./ArticleItem/ArticleItem";

interface ArticleListProps {
  articles: Array<{ __typename?: "Blog" } & ArticleFragmentFragment>;
  styles: {
    readonly [key: string]: string;
  };
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, styles }) => {
  const article = articles.map((item) => {
    return (
      <ArticleItem
        key={item._id}
        title={item.title}
        styles={styles}
        description={item.description}
        author={item.author.nickname}
        id={item._id}
        ago={item.createdAt}
        authRating={item.authRating}
        totalVoting={item.totalVoting}
      />
    );
  });

  return <div style={{ marginTop: "2rem" }}>{article}</div>;
};
export default ArticleList;
