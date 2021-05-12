import { MyContext } from "./../type";
import {
  Query,
  Resolver,
  Ctx,
  Arg,
  FieldResolver,
  Root,
  Mutation,
} from "type-graphql";
import { Comments, CommentsModel } from "../entities/Comments";
import { User } from "../entities/User";
import { ObjectId } from "mongodb";
import { mapToString } from "../helpers/updoot";

@Resolver((_of) => Comments)
export class CommentResolver {
  @FieldResolver(() => User)
  async author(@Root() comment: Comments, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(comment.author as ObjectId);
  }

  @Mutation(() => String)
  async addRecommendation(
    @Arg("commentId") commentId: String,
    @Ctx() { req }: MyContext
  ) {
    try {
      const comment = await CommentsModel.findById(commentId);

      if (comment && comment.recommanded) {
        const isRecommanding = mapToString(comment.recommanded).includes(req
          .session.userId as String);
        if (isRecommanding) {
          return "Already recommanded!";
        } else {
          comment.recommanded.push(req.session.userId as any);
          comment.recommanded_by = (comment.recommanded_by as number) + 1;
          await comment.save();
        }
      }
      return "Thanks!";
    } catch (err) {
      throw err;
    }
  }

  @Query(() => Comments)
  async getReview(@Arg("shoesId") shoesId: String, @Ctx() { req }: MyContext) {
    try {
      const review = await CommentsModel.findOne({
        product: shoesId as string,
        author: req.session.userId,
      })
        .lean()
        .select(["title", "score", "comment"]);

      return review;
    } catch (err) {
      throw err;
    }
  }
}
