import { OrdersModel, Orders } from "./../entities/Orders";
import { MyContext } from "./../type";
import { Query, Resolver, Ctx, Arg, FieldResolver, Root } from "type-graphql";
import { User } from "../entities/User";
import { CartItem } from "../entities/CartItem";
const ObjectId = require("mongodb").ObjectID;

@Resolver((_of) => Orders)
export class OrderResolver {
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

  async getOrder(@Arg("orderId") orderId: string, @Ctx() {  }: MyContext) {
    try {
      const orders = await OrdersModel.findById(orderId);
      return orders;
    } catch (err) {
      throw err;
    }
  }
}
