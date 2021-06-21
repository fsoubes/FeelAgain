import { ObjectId } from "mongodb";
import {
  prop as Property,
  getModelForClass,
  index,
} from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { Ref } from "../constant/types";
import { Basket } from "./Basket";

@ObjectType()
@index({ email: 1, nickname: 1 }, { unique: true })
export class User {
  @Field()
  readonly _id: ObjectId;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field((_type) => String)
  @Property({ required: false, default: "" })
  customer_id: String;

  @Field()
  @Property({ nullable: true, unique: true, index: true })
  nickname?: string;

  @Field()
  @Property({ nullable: true, unique: true, index: true })
  twitter_id?: string;

  @Field()
  @Property({ nullable: true, unique: true, index: true })
  facebook_id?: string;

  @Field()
  @Property({ nullable: true, unique: true, index: true })
  google_id?: string;

  @Field({ nullable: true })
  @Property({ default: 0, min: 0 })
  items?: number;

  @Property({ required: true, default: false })
  isAdmin: boolean;

  @Field()
  @Property({ nullable: true, required: true, unique: true, index: true })
  email: string;

  @Property({ required: true })
  password: string;

  @Field((_type) => Basket)
  @Property({ ref: "Basket" })
  basket?: Ref<Basket>;
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
});
