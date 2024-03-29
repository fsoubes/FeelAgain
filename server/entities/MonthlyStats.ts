import {
  prop as Property,
  getModelForClass,
  index,
} from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";

@index({ year: 1, month: 1 }, { unique: true })
@ObjectType()
export class MonthlyStats {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ index: true })
  month: String;

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

export const MonthlyStatsModel = getModelForClass(MonthlyStats, {
  schemaOptions: { timestamps: true },
});
