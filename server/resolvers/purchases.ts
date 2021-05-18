import { Variants } from "../entities/Variants";
const ObjectId = require("mongodb").ObjectID;
import { MyContext } from "type";
import { Ctx, FieldResolver, Resolver, Root, Query } from "type-graphql";
import { Comments } from "../entities/Comments";
import { Purchases, PurchasesModel } from "../entities/Purchases";

@Resolver((_of) => Purchases)
export class PurchasesResolver {
  @FieldResolver(() => Variants)
  async product(@Root() item: Purchases, @Ctx() { variantLoader }: MyContext) {
    return variantLoader.load(item.product as typeof ObjectId);
  }

  @FieldResolver(() => Comments)
  async comment(@Root() item: Purchases, @Ctx() { commentLoader }: MyContext) {
    if (!item.comment) {
      return null;
    }
    return commentLoader("").load(item.comment as typeof ObjectId);
  }

  @Query(() => [Purchases])
  async getPurchases(@Ctx() { req }: MyContext): Promise<Purchases[]> {
    try {
      const items = await PurchasesModel.find({
        owner: req.session.userId,
      }).lean();

      return items;
    } catch (err) {
      throw err;
    }
  }
}
