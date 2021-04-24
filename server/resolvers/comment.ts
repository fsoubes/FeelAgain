import { MyContext } from "./../type";
import { Query, Resolver, Mutation, Ctx, Arg } from "type-graphql";
import { Comments } from "../entities/Comments";

@Resolver((_of) => Comments)
export class CommentResolver {
  @Query(() => Boolean)
  async getArticles(@Arg("isArg") isArg: Boolean, @Ctx() {  }: MyContext) {
    try {
      return isArg;
    } catch (err) {
      throw err;
    }
  }
  @Mutation(() => Boolean)
  async addArticle(@Arg("isArg") isArg: Boolean, @Ctx() {  }: MyContext) {
    try {
      return isArg;
    } catch (err) {
      throw err;
    }
  }
}
