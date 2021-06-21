import {
  prop as Property,
  getModelForClass,
  index,
} from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { Ref } from "../constant/types";
import { CartItem } from "./CartItem";

@index({ year: 1 }, { unique: true })
@ObjectType()
export class SeasonalStats {
  @Field()
  readonly _id: ObjectId;

  @Field((_type) => [CartItem])
  @Property({ ref: CartItem, default: [], nullable: true })
  products: Ref<CartItem>[];

  @Field()
  @Property({ index: true })
  season: String;

  @Field()
  @Property({ unique: true, index: true })
  year: String;

  @Field()
  @Property({ default: 0 })
  revenus: String;

  @Field()
  @Property({ default: 0 })
  sold__count: Number;

  @Field()
  @Property({ default: 0 })
  cancellation__count: Number;
}

export const SeasonalStatsModel = getModelForClass(SeasonalStats, {
  schemaOptions: { timestamps: true },
});
