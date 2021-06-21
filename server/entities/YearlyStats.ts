import { MonthlyStats } from "./MonthlyStats";
import {
  prop as Property,
  getModelForClass,
  index,
} from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { Ref } from "../constant/types";
import { SeasonalStats } from "./SeasonalStats";

@index({ year: 1 }, { unique: true })
@ObjectType()
export class YearlyStats {
  @Field()
  readonly _id: ObjectId;

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

  @Field((_type) => [MonthlyStats])
  @Property({ ref: MonthlyStats, default: [], nullable: true })
  months: Ref<MonthlyStats>[];

  @Field((_type) => [SeasonalStats])
  @Property({ ref: SeasonalStats, default: [], nullable: true })
  seasons: Ref<SeasonalStats>[];
}

export const YearlyStatsModel = getModelForClass(YearlyStats, {
  schemaOptions: { timestamps: true },
});
