import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { Ref } from "../constant/types";
import { Variants } from "./Variants";

@ObjectType()
export class CartItem {
  @Field()
  readonly _id: ObjectId;

  @Field({ defaultValue: 0 })
  @Property({ required: true, default: 0 })
  quantity: number;

  @Field({ defaultValue: false })
  @Property({ required: true, default: false })
  order: boolean;

  @Field((_type) => Variants)
  @Property({ ref: "Variants" })
  variant: Ref<Variants>;

  @Field((_type) => String)
  @Property({ required: true })
  user: String;
}

export const CartItemModel = getModelForClass(CartItem);
