import { CommentsModel } from "./../entities/Comments";
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
import { CartItem, CartItemModel } from "../entities/CartItem";
import { isAdmin } from "../middlewares/isAdmin";
import { Variants } from "../entities/Variants";
import { isAuth } from "../middlewares/isAuth";
import { CommentInput } from "./types/comment-input";
import { ShoesModel } from "../entities/Shoes";
import { PurchasesModel } from "../entities/Purchases";
import { CancelModel } from "../entities/Cancel";
const ObjectId = require("mongodb").ObjectID;
const fetch = require("node-fetch");
const Stripe = require("stripe");

interface ValueProps {
  [key: string]: number;
}

// const currentTimeline = [
//   {
//     id: 1,
//     shortLabel: "Pris en charge par La Poste",
//     longLabel: "",
//     date: "2019-07-17T00:00:00+02:00",
//     country: "",
//     status: true,
//     type: 1,
//   },
//   {
//     id: 2,
//     shortLabel: "En cours d'acheminement",
//     longLabel: "",
//     country: "",
//     status: true,
//     type: 1,
//   },
//   {
//     id: 3,
//     shortLabel: "Arrivé sur le site de distribution",
//     longLabel: "",
//     country: "",
//     status: true,
//     type: 1,
//   },
//   {
//     id: 4,
//     shortLabel: "A disposition en point de retrait",
//     longLabel:
//       "Votre courrier est disponible en point de retrait. Il y sera conservé pendant 15 jours et sera remis au destinataire sur présentation d'une pièce d'identité.",
//     country: "",
//     status: true,
//     type: 1,
//   },
//   {
//     id: 5,
//     shortLabel: "Courrier distribué",
//     longLabel: "",
//     country: "",
//     status: false,
//     type: 1,
//   },
// ];

@Resolver((_of) => Orders)
export class OrderResolver {
  @Mutation(() => String)
  async refundOrder(
    @Arg("orderId") orderId: String,
    @Arg("updated", () => [String]) updated: string[],
    @Arg("total") total: number,
    @Ctx() { req }: MyContext
  ): Promise<String> {
    try {
      const stripe = Stripe(process.env.STRIPE_SECRET);
      const order = await OrdersModel.findById(orderId).populate("products");

      if (stripe && order) {
        await stripe.refunds.create({
          amount: total * 100,
          payment_intent: order.payment_intent,
        });
      }

      const duplicate = updated.reduce(
        (acc, item) => {
          acc[item] = acc[item] ? acc[item] + 1 : 1;
          return acc;
        },
        {} as Record<keyof ValueProps, number>
      );

      if (order) {
        const products = order.products.slice() as CartItem[];

        for (const item of products) {
          const variantId = item.variant as Variants;
          const currentId = item._id;
          if (
            duplicate[variantId._id.toString()] &&
            duplicate[variantId._id.toString()] !== item.quantity
          ) {
            await CartItemModel.findOneAndUpdate(
              { _id: currentId },
              { quantity: duplicate[variantId._id.toString()] },
              { useFindAndModify: false, upsert: true }
            );
          } else if (
            duplicate[variantId._id.toString()] &&
            duplicate[variantId._id.toString()] === item.quantity
          ) {
            continue;
          } else {
            order.products.splice(
              order.products.findIndex(
                (a) => a.toString() === currentId.toString()
              ),
              1
            );

            await CartItemModel.deleteOne({
              _id: currentId,
            });

            const cancelOrder = new CancelModel({
              total: total * 100,
              order: order._id,
              owner: req.session.userId,
              product: item.variant,
            });
            await cancelOrder.save();

            if (order.products.length === 0) {
              await OrdersModel.deleteOne({ _id: order._id });
            }
          }

          await order.save();
        }
      }
      return "Refund !";
    } catch (err) {
      throw err;
    }
  }

  @Mutation(() => String)
  async addReview(
    @Arg("shoesId") shoesId: String,
    @Arg("itemId") itemId: String,
    @Arg("reviewId", { nullable: true }) reviewId: String,
    @Arg("comments") comments: CommentInput,
    @Ctx() { req }: MyContext
  ) {
    try {
      if (comments.score === 0) {
        return "";
      }

      const review = await CommentsModel.findOneAndUpdate(
        {
          product: ObjectId(shoesId),
          author: req.session.userId,
        },
        { ...comments, author: req.session.userId, product: shoesId as string },
        {
          useFindAndModify: false,
          new: reviewId ? false : true,
          upsert: true,
        }
      );

      if (review) {
        await PurchasesModel.findOneAndUpdate(
          { _id: ObjectId(itemId) },
          { comment: review._id },
          { useFindAndModify: false, new: true }
        );

        let shoes = await ShoesModel.findById(shoesId);

        if (shoes) {
          const isContain = shoes.comments.includes(review._id);
          const shoesScore = shoes.score as number;
          const scoredBy = shoes.scored_by as number;
          const currentScore = comments.score as number;

          if (reviewId || isContain) {
            shoes.score =
              shoes.scored_by === 1
                ? currentScore
                : (shoesScore * scoredBy -
                    (review.score as number) +
                    currentScore) /
                  scoredBy;
            shoes.scored_by = scoredBy;
            (shoes as any)[`score_${review.score}`] =
              (shoes as any)[`score_${review.score}`] !== 0
                ? (shoes as any)[`score_${review.score}`] - 1
                : 0;
            (shoes as any)[`score_${comments.score as number}`] =
              (shoes as any)[`score_${comments.score as number}`] + 1;
          } else {
            shoes.score =
              (shoesScore * scoredBy + currentScore) / (scoredBy + 1);
            shoes.scored_by = scoredBy + 1;
            (shoes as any)[`score_${comments.score as number}`] =
              (shoes as any)[`score_${comments.score as number}`] + 1;
            shoes.comments.push(review._id);
          }
          await shoes.save();
        }
      }

      return review ? (review._id.toString() as string) : "Added!";
    } catch (err) {
      throw err;
    }
  }

  @Query(() => [CartItem])
  @UseMiddleware(isAuth)
  async getAllOrderProducts(@Ctx() { req }: MyContext): Promise<CartItem[]> {
    try {
      const orders = await CartItemModel.find({
        user: req.session.userId,
      }).limit(10);
      return orders;
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
        try {
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
        } catch (err) {
          throw err;
        }
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
