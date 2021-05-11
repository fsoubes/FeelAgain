import React from "react";
import CommentsItem from "./CommentsItem/CommentsItem";
import styles from "../../styles/Comments.module.scss";

interface CommentsListProps {
  comments: any;
}

const CommentsList: React.FC<CommentsListProps> = ({ comments }) => {
  const commentList = comments.map((item: any, index: number) => (
    <CommentsItem key={index}></CommentsItem>
  ));

  return <ul className={styles.list}>{commentList}</ul>;
};

export default CommentsList;
