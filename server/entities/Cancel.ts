import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { Ref } from "../constant/types";
import { User } from "./User";
import { Variants } from "./Variants";
import { Orders } from "./Orders";

@ObjectType()
export class Cancel {
  @Field()
  readonly _id: ObjectId;

  @Field((_type) => Number)
  @Property({ default: 0 })
  total: Number;

  @Field((_type) => Variants)
  @Property({ ref: Variants, nullable: true })
  product: Ref<Variants>;

  @Field((_type) => Orders)
  @Property({ ref: Orders, nullable: true })
  order: Ref<Orders>;

  @Field((_type) => User)
  @Property({ ref: "User", nullable: true })
  owner?: Ref<User>;
}

export const CancelModel = getModelForClass(Cancel, {
  schemaOptions: { timestamps: true },
});
