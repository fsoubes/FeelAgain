import DataLoader from "dataloader";
import { Comments, CommentsModel } from "../entities/Comments";
import { ObjectId } from "mongodb";
import { mapToString } from "../helpers/updoot";

export const createCommentLoader = (currentUser: string) =>
  new DataLoader<ObjectId, Comments>(async (commentIds) => {
    try {
      let comment = await CommentsModel.find({
        _id: {
          $in: commentIds as ObjectId[],
        },
      }).lean();
      if (currentUser)
        comment = comment.map((item) => ({
          ...item,
          is_recommanding: item.recommanded
            ? mapToString(item.recommanded).includes(currentUser)
            : false,
        }));

      const commentIdToComments: Record<string, Comments> = {};
      comment.forEach((u) => {
        commentIdToComments[u._id.toString()] = u;
      });

      const sortedComment = commentIds.map(
        (commentId) => commentIdToComments[String(commentId)]
      );
      return sortedComment;
    } catch (err) {
      throw err;
    }
  });
