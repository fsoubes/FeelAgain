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

  @Field()
  @Property({ nullable: true, unique: true, index: true })
  nickname?: string;

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
