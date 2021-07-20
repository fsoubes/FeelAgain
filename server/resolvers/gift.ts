import { generateCard } from "./../helpers/generateGiftCard";
import { MyContext } from "./../type";
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
import { GiftCard, GiftCardModel } from "../entities/GiftCard";
import { isAdmin } from "../middlewares/isAdmin";
import { CardInput } from "./types/card-input";
import { isAuth } from "../middlewares/isAuth";
import { cursorPagination } from "../helpers/cursorPagination";
import { User } from "../entities/User";

@Resolver((_of) => GiftCard)
export class GiftResolver {
  @FieldResolver(() => User)
  buyer(@Root() card: GiftCard, @Ctx() { userLoader }: MyContext) {
    console.log("hel");
    return userLoader.load(card.buyer as ObjectId);
  }

  @Query(() => GiftCard)
  @UseMiddleware(isAdmin)
  async getCards(
    @Arg("limit") limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Ctx() {}: MyContext
  ) {
    try {
      return cursorPagination(
        GiftCardModel,
        limit,
        "",
        cursor as string,
        "_id",
        "",
        true
      );
    } catch (err) {
      throw err;
    }
  }

  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async addCard(@Arg("card") cardInput: CardInput, @Ctx() { req }: MyContext) {
    try {
      const card = new GiftCardModel({
        ...cardInput,
        code: generateCard(),
        user: req.session.userId,
      });
      await card.save();
      return "Added";
    } catch (err) {
      throw err;
    }
  }
}
