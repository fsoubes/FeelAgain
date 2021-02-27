import { Blog } from "../entities/Blog";
import { DocumentType } from "@typegoose/typegoose/lib/types";

const mapToString = (array: any): any => array.map((item: any) => item.toString());

export const isUpdoot = (
  currentUser: String | undefined,
  article: DocumentType<Blog> | Blog | null
): String | null => {
  return mapToString(article?.upRating).includes(currentUser as String)
    ? "UP"
    : mapToString(article?.downRating).includes(currentUser as String)
    ? "DOWN"
    : null;
};

export const votingRes = (
  thumbs: String | null,
  rating: String,
  currentUser: String | undefined
) => {
  const increment = {
    positiveRating:
      (!thumbs && rating === "DOWN") || (thumbs === "DOWN" && rating !== "UP")
        ? 0
        : rating === "UP"
        ? 1
        : -1,
    totalVoting:
      rating === "NULL"
        ? -1
        : (thumbs === "UP" && rating === "DOWN") ||
          (thumbs === "DOWN" && rating === "UP")
        ? 0
        : 1,
  };

  if (rating === "NULL") {
    return {
      $pull: {
        upRating: currentUser,
        downRating: currentUser,
      },
      $inc: {
        ...increment,
      },
    };
  } else if (rating === "UP") {
    return {
      $push: {
        upRating: currentUser,
      },
      $pull: {
        downRating: thumbs === "DOWN" ? currentUser : null,
      },
      $inc: {
        ...increment,
      },
    };
  } else {
    return {
      $push: {
        downRating: currentUser,
      },
      $pull: {
        upRating: thumbs === "UP" ? currentUser : null,
      },
      $inc: {
        ...increment,
      },
    };
  }
};
