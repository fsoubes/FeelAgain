import { User } from "../entities/User";
import { isAuth } from "../middlewares/isAuth";
import { BlogInput } from "./types/blog-input";
import { MyContext } from "../type";
import { ObjectType, Field } from "type-graphql";
import { PaginationInfo } from "./types/pagination-result";
const toObjectId = require("mongodb").ObjectID;
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
import { ObjectId } from "mongodb";
import { Blog, BlogModel } from "../entities/Blog";
import { dateToString } from "../helpers/dateToString";
import { getIntervalBetweenDates } from "../helpers/dateFormater";
import { voteRating } from "./enum/voteRating";
import { isUpdoot, votingRes } from "../helpers/updoot";
import { isAdmin } from "../middlewares/isAdmin";
import { toDot } from "../helpers/toDot";
import { Comments, CommentsModel } from "../entities/Comments";

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
      const article = await BlogModel.findById(articleId).lean();
      if (!article) {
        throw new Error("Invalid recipe ID");
      }
      return article;
    } catch (err) {
      throw err;
    }
  }

  @Query(() => [Blog])
  async getClosestArticles(
    @Arg("tags") tags: string,
    @Arg("title") title: string,
    @Ctx() {  }: MyContext
  ): Promise<Blog[]> {
    try {
      const randomArticles = await BlogModel.aggregate([
        {
          $match: {
            is_published: true,
            tags: tags,
            title: { $ne: title },
          },
        },
        { $project: { _id: 1, title: 1, image_url: 1, createdAt: 1 } },
        { $sample: { size: 4 } },
      ]);

      return randomArticles as Blog[];
    } catch (err) {
      throw err;
    }
  }

  @Query(() => PaginationResponse)
  async getArticles(
    @Arg("limit") limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: MyContext
  ): Promise<PaginationResponse | []> {
    try {
      limit = limit ? limit : 10;
      let match = {
        ...(cursor && {
          title: {
            $gt: cursor,
          },
        }),
        ...(!req.session.isAdmin && { is_published: true }),
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
  @UseMiddleware(isAdmin)
  async addArticle(
    @Arg("blog") blogInput: BlogInput,
    @Ctx() { req }: MyContext
  ): Promise<Blog> {
    try {
      const article = new BlogModel({
        ...blogInput,
        author: req.session.userId,
      });
      await article.save();

      return article;
    } catch (err) {
      throw err;
    }
  }

  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async addComment(
    @Arg("comment") comment: String,
    @Arg("articleId") articleId: String,

    @Ctx() { req }: MyContext
  ): Promise<String> {
    try {
      const commentDoc = new CommentsModel({
        comment: comment,
        author: req.session.userId,
        article: articleId as string,
      });

      await commentDoc.save();

      if (commentDoc) {
        await BlogModel.findOneAndUpdate(
          {
            _id: toObjectId(articleId),
          },
          {
            $push: {
              comments: commentDoc._id,
            },
          },
          { useFindAndModify: false }
        );
      }

      return "Done";
    } catch (err) {
      throw err;
    }
  }

  @Mutation(() => Blog)
  @UseMiddleware(isAdmin)
  async updateArticle(
    @Arg("blog") blogInput: BlogInput,
    @Arg("blogId") blogId: string
  ): Promise<Blog | null> {
    try {
      let dotData = toDot(blogInput);

      const updateBlog = await BlogModel.findOneAndUpdate(
        {
          _id: blogId,
        },
        dotData,
        {
          new: true,
          useFindAndModify: false,
        }
      );

      return updateBlog;
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

  @FieldResolver(() => Comments)
  async comments(@Root() item: Blog, @Ctx() { commentsLoader }: MyContext) {
    if (!item.comments || item.comments.length === 0) {
      return [];
    }
    return commentsLoader.loadMany(item.comments as ObjectId[]);
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
