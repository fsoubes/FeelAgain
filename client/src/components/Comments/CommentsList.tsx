import React from "react";
import CommentsItem from "./CommentsItem/CommentsItem";
import styles from "../../styles/Comments.module.scss";
import { Comments } from "../../generated/graphql";

interface CommentsListProps {
  comments: Comments[];
}

const CommentsList: React.FC<CommentsListProps> = ({ comments }) => {
  const commentList = comments.map((item, index: number) => (
    <CommentsItem
      key={index}
      title={item.title as string}
      comment={item.comment as string}
      rating={item.score as number}
      isRecommending={item.is_recommanding as boolean}
      recommandedBy={item.recommanded_by as number}
      nickname={item.author.nickname}
      id={item._id}
    ></CommentsItem>
  ));

  return <ul className={styles.list}>{commentList}</ul>;
};

export default CommentsList;
