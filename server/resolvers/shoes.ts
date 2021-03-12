import { MyContext } from "./../type";
import {
  Query,
  Resolver,
  Mutation,
  Ctx,
  Arg,
  FieldResolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { Shoes, ShoesModel } from "../entities/Shoes";
import { ObjectId } from "mongodb";
import { ImagesModel } from "../entities/Images";
import { VariantsModel } from "../entities/Variants";
import { toDot } from "../helpers/toDot";
import { ShoesInput } from "./types/shoes-input";
import { ImageInput } from "./types/images-input";
import { VariantInput } from "./types/variants-input";
import { isAuth } from "../middlewares/isAuth";
import { isAdmin } from "../middlewares/isAdmin";

@Resolver((_of) => Shoes)
export class ShoesResolver {
  @Query(() => Shoes)
  async getSingleShoe(
    @Arg("shoesId") shoesId: ObjectId,
    @Ctx() {  }: MyContext
  ): Promise<Shoes> {
    try {
      const shoe = await ShoesModel.findById(shoesId);
      if (!shoe) {
        throw new Error("Invalid recipe ID");
      }
      return shoe;
    } catch (err) {
      throw err;
    }
  }

  @Query(() => [Shoes])
  async getFilterShoes(
    @Arg("limit") limit: number,
    @Ctx() {  }: MyContext
  ): Promise<Shoes[]> {
    try {
      const shoes = await ShoesModel.find().limit(limit);
      return shoes;
    } catch (err) {
      throw err;
    }
  }

  @FieldResolver()
  async images(@Root() shoes: Shoes, @Ctx() { imageLoader }: MyContext) {
    return imageLoader.loadMany(shoes.images as ObjectId[]);
  }

  @FieldResolver()
  async variants(@Root() shoes: Shoes, @Ctx() { variantLoader }: MyContext) {
    return variantLoader.loadMany(shoes.variants as ObjectId[]);
  }

  @FieldResolver()
  async relatives(@Root() shoes: Shoes, @Ctx() {  }: MyContext) {
    const relatives = await ShoesModel.find({
      _id: {
        $in: shoes.relatives,
      },
    });

    return relatives;
  }

  @Mutation(() => ObjectId)
  @UseMiddleware(isAdmin)
  async addShoe(
    @Arg("Shoe") shoeInput: ShoesInput,
    @Ctx() {  }: MyContext
  ): Promise<ObjectId> {
    try {
      const addedShoe = new ShoesModel({ ...shoeInput });
      await addedShoe.save();
      return addedShoe._id;
    } catch (err) {
      throw err;
    }
  }

  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async removeShoe(
    @Arg("ShoeId") shoeId: String,
    @Ctx() {  }: MyContext
  ): Promise<String> {
    try {
      const removedShoes = await ShoesModel.findById(shoeId);
      if (removedShoes) {
        await VariantsModel.deleteMany({ _id: { $in: removedShoes.variants } });
        await ImagesModel.deleteMany({ _id: { $in: removedShoes.images } });
        await ShoesModel.deleteOne(shoeId);
        return "Removed";
      } else {
        return "This Shoe is not in the DB!";
      }
    } catch (err) {
      throw err;
    }
  }

  @Mutation(() => Shoes)
  @UseMiddleware(isAuth)
  async updateShoe(
    @Arg("Shoes") updateShoe: String,
    @Arg("shoeId") shoeId: string,
    @Ctx() {  }: MyContext
  ): Promise<Shoes | null> {
    try {
      let dotData = toDot(updateShoe);
      const updateShoes = await ShoesModel.findOneAndUpdate(
        {
          _id: shoeId,
        },
        dotData,
        {
          new: true,
          useFindAndModify: false,
        }
      );

      return updateShoes;
    } catch (err) {
      throw err;
    }
  }

  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async addImage(
    @Arg("Image") imageInput: ImageInput,
    @Arg("ParentId") parentId: string,
    @Ctx() {  }: MyContext
  ): Promise<String> {
    try {
      const newImage = new ImagesModel({ ...imageInput });
      await newImage.save();

      await ShoesModel.findByIdAndUpdate(
        { _id: parentId },
        {
          $push: {
            images: newImage._id,
          },
        },
        { useFindAndModify: false }
      );

      return `Image added to ${parentId}`;
    } catch (err) {
      throw err;
    }
  }

  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async addVariant(
    @Arg("Variant") variantInput: VariantInput,
    @Arg("parentId") parentId: string,
    @Ctx() {  }: MyContext
  ): Promise<String> {
    try {
      const newVariant = new VariantsModel({ ...variantInput });
      await newVariant.save();

      await ShoesModel.findByIdAndUpdate(
        { _id: parentId },
        {
          $push: {
            variants: newVariant._id,
          },
        },
        { useFindAndModify: false }
      );

      return `Variant added to ${parentId}`;
    } catch (err) {
      throw err;
    }
  }
}
