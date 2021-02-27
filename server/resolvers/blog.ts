import { User } from "../entities/User";
import { isAuth } from "../middlewares/isAuth";
import { ObjectId } from "mongodb";
import { BlogInput } from "./types/blog-input";
import { MyContext } from "../type";
import { ObjectType, Field } from "type-graphql";
import { PaginationInfo } from "./types/pagination-result";

import {
  Query,
  Resolver,
  Mutation,
  Ctx,
  Arg,
  UseMiddleware,
  FieldResolver,
  Root,
} from "type-graphql";
import { Blog, BlogModel } from "../entities/Blog";
import { dateToString } from "../helpers/dateToString";
import { getIntervalBetweenDates } from "../helpers/dateFormater";
import { voteRating } from "./enum/voteRating";
import { isUpdoot, votingRes } from "../helpers/updoot";

@ObjectType()
class PaginationResponse {
  @Field()
  pageInfo?: PaginationInfo;

  @Field(() => [Blog])
  edges?: Blog[];
}

@Resolver((_of) => Blog)
export class BlogResolver {
  @Query(() => Blog)
  async getSingleArticle(
    @Arg("articleId") articleId: ObjectId,
    @Ctx() {  }: MyContext
  ): Promise<Blog> {
    try {
      const article = await BlogModel.findById(articleId);
      if (!article) {
        throw new Error("Invalid recipe ID");
      }
      return article;
    } catch (err) {
      throw err;
    }
  }
  @Query(() => PaginationResponse)
  async getArticles(
    @Arg("limit") limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Ctx() {  }: MyContext
  ): Promise<PaginationResponse | []> {
    try {
      limit = limit ? limit : 10;

      let match = {
        ...(cursor && {
          title: {
            $gt: cursor,
          },
        }),
      };

      const cursorOptions = cursor
        ? {
            limit: limit + 1,
            where: match,
          }
        : {
            where: match,
            limit: limit + 1,
          };

      const articles = await BlogModel.find({}, {}, { ...cursorOptions })
        .sort({
          title: 1,
        })
        .lean();

      const hasNextPage = articles.length > limit;

      if (articles.length > 0) {
        const edges = hasNextPage ? articles.slice(0, -1) : articles;

        return {
          edges: [...edges],
          pageInfo: {
            hasNextPage: hasNextPage,
            endCursor: edges[edges.length - 1].title,
          },
        };
      } else {
        return [];
      }
    } catch (err) {
      throw err;
    }
  }

  @Mutation(() => Blog)
  @UseMiddleware(isAuth)
  async addArticle(
    @Arg("blog") blogInput: BlogInput,
    @Ctx() { req }: MyContext
  ): Promise<Blog> {
    try {
      const article = new BlogModel(({
        ...blogInput,
        author: req.session.userId,
      } as unknown) as Blog);
      await article.save();
      return article;
    } catch (err) {
      throw err;
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async ratingReview(
    @Arg("rating") rating: voteRating,
    @Arg("articleId") articleId: String,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    try {
      const currentUser = req.session.userId;
      const article = await BlogModel.findById(articleId);

      let thumbs = isUpdoot(currentUser, article);

      if (rating === thumbs || (!thumbs && rating === "NULL") || !article) {
        return false;
      }

      const voting = votingRes(thumbs, rating, currentUser);

      await BlogModel.findOneAndUpdate(
        {
          _id: articleId as string,
        },
        voting as any,
        {
          new: true,
          useFindAndModify: false,
        }
      );

      return true;
    } catch (err) {
      throw err;
    }
  }

  @FieldResolver(() => User)
  author(@Root() articles: Blog, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(articles.author as ObjectId);
  }

  @FieldResolver(() => String)
  async authRating(@Root() article: Blog, @Ctx() { req }: MyContext) {
    return isUpdoot(req.session.userId, article);
  }

  @FieldResolver()
  createdAt(@Root() articles: Blog, @Ctx() {  }: MyContext) {
    const currentDate = new Date();
    return getIntervalBetweenDates(
      currentDate,
      dateToString(articles.createdAt)
    );
  }
}
