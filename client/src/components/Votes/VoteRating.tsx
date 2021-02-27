import React from "react";
import { Button } from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import styles from "../../styles/Vote.module.scss";
import { ApolloCache } from "@apollo/client";
import {
  useRatingReviewMutation,
  RatingReviewMutation,
} from "../../generated/graphql";
import gql from "graphql-tag";

interface VoteRatingProps {
  total?: number;
  authRating: String | undefined | null;
  articleId: string;
}

const updateAfterRating = (
  cache: ApolloCache<RatingReviewMutation>,
  articleId: string,
  value: string | null,
  total: number
) => {
  const data = cache.readFragment<{
    _id: String;
    totalVoting: number;
    authRating: number | null;
  }>({
    id: "Blog:" + articleId,
    fragment: gql`
      fragment _ on Blog {
        _id
        totalVoting
        authRating
      }
    `,
  });

  if (data) {
    const newPoints =
      data.authRating && value
        ? total
        : !data.authRating
        ? total + 1
        : total - 1;
    cache.writeFragment({
      id: "Blog:" + articleId,
      fragment: gql`
        fragment __ on Blog {
          _id
          totalVoting
          authRating
        }
      `,
      data: {
        totalVoting: newPoints,
        authRating: data.authRating === value ? null : value,
      },
    });
  }
};

const VoteRating: React.FC<VoteRatingProps> = ({
  total,
  authRating,
  articleId,
}) => {
  const [rating] = useRatingReviewMutation();
  return (
    <div className={styles.articles__votes}>
      <Button
        style={{ color: authRating === "UP" ? "green" : undefined }}
        onClick={async () => {
          await rating({
            variables: {
              articleId: articleId,
              rating: authRating === "UP" ? "NULL" : "UP",
            },
            update: (cache) =>
              updateAfterRating(
                cache,
                articleId,
                authRating === "UP" ? null : "UP",
                total as number
              ),
          });
        }}
      >
        <KeyboardArrowUpIcon />
      </Button>
      <span className={styles.articles__total}>{total}</span>
      <Button
        style={{ color: authRating === "DOWN" ? "red" : undefined }}
        onClick={async () => {
          await rating({
            variables: {
              articleId: articleId,
              rating: authRating === "DOWN" ? "NULL" : "DOWN",
            },
            update: (cache) =>
              updateAfterRating(
                cache,
                articleId,
                authRating === "DOWN" ? null : "DOWN",
                total as number
              ),
          });
        }}
      >
        <KeyboardArrowDownIcon />
      </Button>
    </div>
  );
};

export default VoteRating;
