import React from "react";
import { useRouter } from "next/router";
import VoteRating from "../../Votes/VoteRating";

interface ArticleItemProps {
  title: String;
  styles: {
    readonly [key: string]: string;
  };
  description: String | undefined | null;
  author: String;
  id: string;
  ago?: String;
  totalVoting: number;
  authRating: String | undefined | null;
}

const ArticleItem: React.FC<ArticleItemProps> = ({
  title,
  styles,
  description,
  author,
  id,
  ago,
  totalVoting,
  authRating,
}) => {
  const router = useRouter();

  return (
    <div className={styles.articles__container_item}>
      <div
        onClick={() => router.push(`article/${id}`)}
        style={{ cursor: "pointer", width: "100%" }}
      >
        <div className={styles.articles__container_title}>
          <h3>{title}</h3>
          <div className={styles.articles__author}>
            Posted by {author} - {ago}
          </div>
        </div>
        <div>{description}</div>
      </div>
      <VoteRating total={totalVoting} authRating={authRating} articleId={id} />
    </div>
  );
};
export default ArticleItem;
