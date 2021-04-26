import { OrdersModel, Orders } from "./../entities/Orders";
import { MyContext } from "./../type";
import {
  Query,
  Resolver,
  Ctx,
  Arg,
  FieldResolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { User } from "../entities/User";
import { CartItem } from "../entities/CartItem";
import { isAdmin } from "../middlewares/isAdmin";
const ObjectId = require("mongodb").ObjectID;

@Resolver((_of) => Orders)
export class OrderResolver {
  @Query(() => [Orders])
  @UseMiddleware(isAdmin)
  async getAllOrders(@Ctx() {  }: MyContext) {
    try {
      const orders = await OrdersModel.find().limit(10);
      return orders;
    } catch (err) {
      throw err;
    }
  }

  @Query(() => [Orders])
  async getOrders(@Ctx() { req }: MyContext) {
    try {
      const orders = await OrdersModel.find({
        user: req.session.userId,
      });
      return orders;
    } catch (err) {
      throw err;
    }
  }

  @FieldResolver(() => User)
  async user(@Root() order: Orders, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(order.user as typeof ObjectId);
  }

  @FieldResolver(() => CartItem)
  async products(@Root() order: Orders, @Ctx() { itemLoader }: MyContext) {
    return itemLoader.loadMany(order.products as typeof ObjectId[]);
  }

  @Query(() => Orders)
  async getOrder(@Arg("orderId") orderId: string, @Ctx() { req }: MyContext) {
    try {
      const orders = await OrdersModel.findOne({
        _id: orderId,
        user: req.session.userId,
      });
      return orders;
    } catch (err) {
      throw err;
    }
  }
}
