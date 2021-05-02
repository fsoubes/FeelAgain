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
  Mutation,
} from "type-graphql";
import { User } from "../entities/User";
import { CartItem } from "../entities/CartItem";
import { isAdmin } from "../middlewares/isAdmin";
const ObjectId = require("mongodb").ObjectID;
const fetch = require("node-fetch");
const Stripe = require("stripe");

@Resolver((_of) => Orders)
export class OrderResolver {
  @Mutation(() => String)
  async refundOrder(
    @Arg("orderId") orderId: String,
    @Ctx() {  }: MyContext
  ): Promise<String> {
    try {
      let res;
      const order = await OrdersModel.findById({ orderId });
      const stripe = Stripe(process.env.STRIPE_SECRET);
      if (stripe && order) {
        res = await stripe.refunds.create({
          amount: order.total,
          payment_intent: order.payment_intent,
        });
      }
      console.log(res);
      return "Refund";
    } catch (err) {
      throw err;
    }
  }

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
      const data = <any>[];
      const orders = await OrdersModel.find({
        user: req.session.userId,
      })
        .limit(10)
        .lean();

      for (const { tracking } of orders) {
        const res = await fetch(
          `https://api.laposte.fr/suivi/v2/idships/${tracking}FR?lang=fr_FR`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "X-Okapi-Key": process.env.LAPOSTE_KEY_DEV,
            },
          }
        );
        const resBody = await res.json();
        data.push(resBody);
      }

      const updateInfo = data.map((item: any, index: number) => {
        const timeline = item.shipment.timeline.filter(
          (item: any) => item.status
        );
        const status =
          item.shipment.timeline[
            timeline.length === 0 ? 0 : timeline.length - 1
          ].shortLabel;
        return { ...orders[index], timeline: timeline.length, status: status };
      });

      return updateInfo;
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
    return itemLoader(false).loadMany(order.products as typeof ObjectId[]);
  }

  @Query(() => Orders)
  async getOrder(@Arg("orderId") orderId: string, @Ctx() { req }: MyContext) {
    try {
      let res;
      const order = await OrdersModel.findOne({
        _id: orderId,
        user: req.session.userId,
      }).lean();

      if (order) {
        res = await fetch(
          // "https://api.laposte.fr/suivi/v2/idships/CB571480618FR,CB571480619FR?lang=fr_FR",
          // "https://api.laposte.fr/suivi/v2/idships/115111111111111,6W111111111XX?lang=fr_FR",
          `https://api.laposte.fr/suivi/v2/idships/${order.tracking}FR?lang=fr_FR`,

          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "X-Okapi-Key": process.env.LAPOSTE_KEY_DEV,
            },
          }
        );
      }

      /*   const res = await fetch(
        // "https://api.laposte.fr/suivi/v2/idships/CB571480618FR,CB571480619FR?lang=fr_FR",
        // "https://api.laposte.fr/suivi/v2/idships/115111111111111,6W111111111XX?lang=fr_FR",
        `https://api.laposte.fr/suivi/v2/idships/6T11111111110FR?lang=fr_FR`,

        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Okapi-Key": process.env.LAPOSTE_KEY_DEV,
          },
        }
      ); */

      const resBody = await res.json();

      const timeline = resBody.shipment.timeline.filter(
        (item: any) => item.status
      );

      const status = resBody.shipment.timeline[timeline.length - 1].shortLabel;

      return { ...order, timeline: timeline.length, status: status };
    } catch (err) {
      throw err;
    }
  }
}
