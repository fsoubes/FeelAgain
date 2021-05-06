import { MyContext } from "./../type";
import { Query, Resolver, Ctx, Arg } from "type-graphql";
import { Comments, CommentsModel } from "../entities/Comments";

@Resolver((_of) => Comments)
export class CommentResolver {
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
