import { OrdersModel } from "./../entities/Orders";
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
import { User, UserModel } from "../entities/User";
const Stripe = require("stripe");
import { DetailsInput } from "./types/details-input";
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
  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async addPayment(
    @Arg("stripeId") stripeId: string,
    @Arg("details") details: DetailsInput,
    @Ctx() { req }: MyContext
  ): Promise<String> {
    try {
      let customerId;
      const user = await UserModel.findById(req.session.userId);

      const email = user ? user.email : "";

      const stripe = Stripe(process.env.STRIPE_SECRET);

      const amount = Math.round(parseFloat(details.amount) * 100);

      const isPresent = await stripe.customers.list({
        email: email,
        limit: 1,
      });

      if (isPresent.data.length === 0) {
        const customer = await stripe.customers.create({
          email: email,
          payment_method: stripeId,
          invoice_settings: {
            default_payment_method: stripeId,
          },
        });
        customerId = customer.id;
      } else {
        customerId = isPresent.data[0].id;
      }

      const paymentIntent = await stripe.paymentIntents.create(
        {
          customer: customerId,
          payment_method_types: ["card"],
          currency: "eur",
          statement_descriptor: "Statement for bank",
          amount: amount,
          confirmation_method: "automatic",
          payment_method: stripeId,
          confirm: true,
          receipt_email: "franck.soubes@gmail.com",
        },
        {
          stripeAccount: process.env.STRIPE_ACCOUNT,
        }
      );

      if (paymentIntent.status === "succeeded") {
        const basket = await BasketModel.findOne({ user: req.session.userId });
        const adress = {
          ...details,
        };

        if (basket) {
           /*  await CartItemModel.deleteMany({
            _id: { $in: basket.products },
          }); */
          const command = new OrdersModel({products: basket?.products, total: amount, user: req.session.userId, adress:adress,status:"waiting"})
          basket.products = [];
          await basket.save();
          await command.save() 
        }
      }
      return "Thanks for the payment!";
    } catch (err) {
      throw err;
    }
  }
}
