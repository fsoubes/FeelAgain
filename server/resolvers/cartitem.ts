import { CartItemModel } from "./../entities/CartItem";
import { CartItem } from "../entities/CartItem";
import { Variants } from "../entities/Variants";
const ObjectId = require("mongodb").ObjectID;
import { MyContext } from "type";
import { Ctx, FieldResolver, Resolver, Root, Query } from "type-graphql";
import { Comments } from "../entities/Comments";

@Resolver((_of) => CartItem)
export class CartItemResolver {
  @FieldResolver(() => Variants)
  async variant(@Root() item: CartItem, @Ctx() { variantLoader }: MyContext) {
    if (!item.variant) return null;

    if (Object.keys(item.variant).length === 2)
      return variantLoader.load(item.variant as typeof ObjectId);
    else return item.variant;
  }

  @FieldResolver(() => Variants)
  async card(@Root() item: CartItem, @Ctx() { giftCardLoader }: MyContext) {
    if (Object.keys(item.card).length === 2)
      return giftCardLoader.load(item.card as typeof ObjectId);
    else return item.card;
  }

  @FieldResolver(() => Comments)
  async comments(@Root() item: CartItem, @Ctx() { commentLoader }: MyContext) {
    if (!item.comments) {
      return null;
    }
    return commentLoader("").load(item.comments as typeof ObjectId);
  }

  @Query(() => [CartItem])
  async getCartItems(@Ctx() { req }: MyContext): Promise<CartItem[]> {
    try {
      const items = await CartItemModel.find({
        user: req.session.userId,
      })
        .populate("variant")
        .lean();

      const uniqueItems = items.filter(
        (v, i, a) =>
          a.findIndex(
            (t) =>
              ((t.variant as Variants).shoes as typeof ObjectId).toString() ===
              ((v.variant as Variants).shoes as typeof ObjectId).toString()
          ) === i
      );

      return uniqueItems;
    } catch (err) {
      throw err;
    }
  }
}
