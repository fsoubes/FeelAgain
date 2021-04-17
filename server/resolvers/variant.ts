import { Variants } from "../entities/Variants";
const ObjectId = require("mongodb").ObjectID;
import { MyContext } from "type";
import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";
import { Shoes } from "../entities/Shoes";

@Resolver((_of) => Variants)
export class VariantResolver {
  @FieldResolver(() => Shoes)
  async shoes(@Root() variants: Variants, @Ctx() { shoesLoader }: MyContext) {
    return shoesLoader.load(variants.shoes as typeof ObjectId);
  }
}
