import { generateCard } from "./../helpers/generateGiftCard";
import { MyContext } from "./../type";
import {
  Query,
  Resolver,
  Mutation,
  Ctx,
  Arg,
  UseMiddleware,
} from "type-graphql";
import { GiftCard, GiftCardModel } from "../entities/GiftCard";
import { isAdmin } from "../middlewares/isAdmin";
import { CardInput } from "./types/card-input";
import { isAuth } from "../middlewares/isAuth";
import { cursorPagination } from "../helpers/cursorPagination";

@Resolver((_of) => GiftCard)
export class GiftResolver {
  @Query(() => GiftCard)
  @UseMiddleware(isAdmin)
  async getCards(
    @Arg("limit") limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Ctx() {  }: MyContext
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
  async addCard(@Arg("card") cardInput: CardInput, @Ctx() {  }: MyContext) {
    try {
      const card = new GiftCardModel({ ...cardInput, code: generateCard() });
      await card.save();
      return "Added";
    } catch (err) {
      throw err;
    }
  }
}
