import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { Ref } from "../constant/types";
import { User } from "./User";
import { CartItem } from "./CartItem";

@ObjectType()
export class Basket {
  @Field()
  readonly _id: ObjectId;

  @Field((_type) => [CartItem])
  @Property({ ref: CartItem, default: [], nullable: true })
  products: Ref<CartItem>[];

  @Field({ nullable: true })
  @Property({ default: 0, min: 0 })
  total: number;

  @Field((_type) => User)
  @Property({ ref: "User", nullable: true })
  user?: Ref<User>;
}

export const BasketModel = getModelForClass(Basket);
