import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { Ref } from "../constant/types";
import { User } from "./User";
import { CartItem } from "./CartItem";

@ObjectType()
export class MonthlyStats {
  @Field()
  readonly _id: ObjectId;

  @Field((_type) => [CartItem])
  @Property({ ref: CartItem, default: [], nullable: true })
  products: Ref<CartItem>[];

  @Field()
  @Property()
  month: String;

  @Field((_type) => User)
  @Property({ ref: "User", nullable: true })
  user?: Ref<User>;
}

export const MonthlyStatsModel = getModelForClass(MonthlyStats, {
  schemaOptions: { timestamps: true },
});
