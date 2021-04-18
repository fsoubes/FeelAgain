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
import { Basket, BasketModel } from "../entities/Basket";
import { isAuth } from "../middlewares/isAuth";
import { CartItemModel, CartItem } from "../entities/CartItem";
import { User } from "../entities/User";
const ObjectId = require("mongodb").ObjectID;

@Resolver((_of) => Basket)
export class BasketResolver {
  @Query(() => Basket)
  @UseMiddleware(isAuth)
  async getBasket(@Ctx() { req }: MyContext) {
    try {
      const basket = await BasketModel.findOne({ user: req.session.userId });
      return basket;
    } catch (err) {
      throw err;
    }
  }

  @Query(() => [Basket])
  async getAllBasket(@Ctx() {  }: MyContext): Promise<Basket[]> {
    try {
      const basket = await BasketModel.find();
      return basket;
    } catch (err) {
      throw err;
    }
  }

  @FieldResolver(() => User)
  async user(@Root() basket: Basket, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(basket.user as typeof ObjectId);
  }

  @FieldResolver(() => CartItem)
  async products(@Root() baskets: Basket, @Ctx() { itemLoader }: MyContext) {
    return itemLoader.loadMany(baskets.products as typeof ObjectId[]);
  }

  @Mutation(() => Boolean)
  async addGuestCart(@Arg("isArg") isArg: Boolean, @Ctx() {  }: MyContext) {
    try {
      return isArg;
    } catch (err) {
      throw err;
    }
  }
  @Mutation(() => Boolean)
  async mergeGuestCart(@Arg("isArg") isArg: Boolean, @Ctx() {  }: MyContext) {
    try {
      return isArg;
    } catch (err) {
      throw err;
    }
  }
  @Mutation(() => CartItem)
  @UseMiddleware(isAuth)
  async addCartItem(
    @Arg("variantId") variantId: String,
    @Ctx() { req }: MyContext
  ): Promise<CartItem> {
    try {
      const item = await CartItemModel.findOneAndUpdate(
        { variant: ObjectId(variantId) },
        {
          $inc: { quantity: 1 },
          variant: ObjectId(variantId),
        },
        { new: true, upsert: true }
      );

      if (item.quantity === 1) {
        await BasketModel.findOneAndUpdate(
          {
            user: req.session.userId,
          },
          {
            $push: { products: item._id },
          },
          { new: true }
        );
      }

      return item;
    } catch (err) {
      throw err;
    }
  }
  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async updateCartItem(
    @Arg("itemId") itemId: string,
    @Arg("quantity") quantity: number,
    @Ctx() {  }: MyContext
  ): Promise<String> {
    try {
      await CartItemModel.findOneAndUpdate(
        {
          _id: itemId,
        },
        {
          quantity: quantity,
        },
        { new: true }
      );
      return `Updated!`;
    } catch (err) {
      throw err;
    }
  }
  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async removeCartItem(
    @Arg("itemId") itemId: string,
    @Arg("basketId") basketId: string,
    @Ctx() {  }: MyContext
  ): Promise<String> {
    try {
      await BasketModel.findByIdAndUpdate(
        { _id: basketId },
        { $pull: { products: ObjectId(itemId) } },
        { useFindAndModify: false, new: true }
      );

      await CartItemModel.deleteOne({ _id: itemId });
      return "Item Removed!";
    } catch (err) {
      throw err;
    }
  }
}
