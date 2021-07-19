import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { RangeGift } from "../resolvers/enum/rangeGift";

@ObjectType()
export class GiftCard {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: false })
  to: String;

  @Field()
  @Property({ required: false })
  from: String;

  @Field()
  @Property({ required: false, default: false })
  used: Boolean;

  @Field({ nullable: true })
  @Property({ required: false })
  message: String;

  @Field((_type) => RangeGift)
  @Property({ required: true })
  price: RangeGift;

  @Property({ required: false })
  code: String;
}

export const GiftCardModel = getModelForClass(GiftCard);
