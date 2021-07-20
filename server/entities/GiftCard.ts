import { prop as Property, getModelForClass, Ref } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { User } from "./User";

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

  @Field((_type) => User)
  @Property({ ref: "User", nullable: true })
  buyer?: Ref<User>;

  @Field({ nullable: true })
  @Property({ required: false })
  message: String;

  @Field()
  @Property({ required: true })
  price: Number;

  @Property({ required: false, unique: true })
  code: String;
}

export const GiftCardModel = getModelForClass(GiftCard);
