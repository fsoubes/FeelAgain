import { CartItem } from "../entities/CartItem";
import { Variants } from "../entities/Variants";
const ObjectId = require("mongodb").ObjectID;
import { MyContext } from "type";
import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";

@Resolver((_of) => CartItem)
export class CartItemResolver {
  @FieldResolver(() => Variants)
  async variant(@Root() item: CartItem, @Ctx() { variantLoader }: MyContext) {
    return variantLoader.load(item.variant as typeof ObjectId);
  }
}
