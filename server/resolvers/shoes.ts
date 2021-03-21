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
  Field,
  ObjectType,
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
import { PaginationPage } from "./types/pagination-result";

@ObjectType()
class PaginationShoes {
  @Field()
  pageInfo?: PaginationPage;

  @Field(() => [Shoes])
  edges?: Shoes[];
}

@ObjectType()
class SearchResults {
  @Field()
  totalCount?: number;

  @Field(() => [Shoes])
  edges?: Shoes[];
}

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

  @Query(() => PaginationShoes)
  async getFilterShoes(
    @Arg("limit") limit: number,
    @Arg("page") page: number,
    @Ctx() {  }: MyContext
  ): Promise<PaginationShoes> {
    try {
      const totalDocuments = await ShoesModel.countDocuments({}).exec();
      const options = { limit: limit, skip: limit * (page - 1) };
      const shoes = await ShoesModel.find({}, {}, options).lean<Shoes[]>();

      return {
        edges: shoes,
        pageInfo: { total: Math.ceil(totalDocuments / limit), current: page },
      };
    } catch (err) {
      throw err;
    }
  }

  @Query(() => SearchResults)
  async getShoesByName(
    @Arg("search") search: string,
    @Ctx() {  }: MyContext
  ): Promise<SearchResults> {
    const totalSpace = search.split(" ").length - 1;
    try {
      const shoes = await ShoesModel.aggregate([
        {
          $match: {
            $text: {
              $search: search,
            },
          },
        },
        {
          $addFields: {
            score_filter: {
              $meta: "textScore",
            },
          },
        },
        {
          $match: {
            score_filter: { $gt: totalSpace >= 1 ? 1 : 0.5 },
          },
        },
        { $sort: { score_filter: -1, _id: 1 } },
        {
          $facet: {
            pageInfo: [{ $count: "totalRecords" }],
            resultData: [{ $limit: 10 }],
          },
        },
      ]);

      return {
        totalCount: shoes[0].pageInfo[0]
          ? shoes[0].pageInfo[0].totalRecords
          : 0,
        edges: shoes[0].resultData,
      };
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
