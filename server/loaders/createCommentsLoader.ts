import DataLoader from "dataloader";
import { Comments, CommentsModel } from "../entities/Comments";
import { ObjectId } from "mongodb";

export const createCommentsLoader = () =>
  new DataLoader<ObjectId, Comments>(async (commentIds) => {
    try {
      const comment = await CommentsModel.find({
        _id: {
          $in: commentIds as ObjectId[],
        },
      });

      const commentIdToComments: Record<string, Comments> = {};

      comment.forEach((u) => {
        commentIdToComments[u.id] = u;
      });

      const sortedComment = commentIds.map(
        (commentId) => commentIdToComments[String(commentId)]
      );

      return sortedComment;
    } catch (err) {
      throw err;
    }
  });
