import { MyContext } from "./../type";
import {
  Query,
  Resolver,
  Mutation,
  Ctx,
  Arg,
  FieldResolver,
  Root,
} from "type-graphql";
import { Shoes, ShoesModel } from "../entities/Shoes";
import { ObjectId } from "mongodb";
import { ImagesModel } from "../entities/Images";
import { VariantsModel } from "../entities/Variants";

@Resolver((_of) => Shoes)
export class ShoesResolver {
  @Query(() => Shoes)
  async getSingleShoe(
    @Arg("articleId") articleId: ObjectId,
    @Ctx() {  }: MyContext
  ): Promise<Shoes> {
    try {
      const shoe = await ShoesModel.findById(articleId);
      if (!shoe) {
        throw new Error("Invalid recipe ID");
      }
      return shoe;
    } catch (err) {
      throw err;
    }
  }

  @FieldResolver()
  async images(@Root() shoes: Shoes, @Ctx() {  }: MyContext) {
    const images = await ImagesModel.find({
      _id: {
        $in: shoes.images,
      },
    });
    return images;
  }

  @FieldResolver()
  async variants(@Root() shoes: Shoes, @Ctx() {  }: MyContext) {
    const variants = await VariantsModel.find({
      _id: {
        $in: shoes.variants,
      },
    });

    return variants;
  }

  @Mutation(() => Boolean)
  async test2(@Arg("isArg") isArg: Boolean, @Ctx() {  }: MyContext) {
    try {
      return isArg;
    } catch (err) {
      throw err;
    }
  }
}
