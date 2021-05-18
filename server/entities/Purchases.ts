import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { Ref } from "../constant/types";
import { User } from "./User";
import { Variants } from "./Variants";
import { Comments } from "./Comments";

@ObjectType()
export class Purchases {
  @Field()
  readonly _id: ObjectId;

  @Field((_type) => Variants)
  @Property({ ref: Variants, nullable: true })
  product: Ref<Variants>;

  @Field((_type) => Comments, { defaultValue: null })
  @Property({ ref: "Comments", nullable: true })
  comment: Ref<Comments>;

  @Field((_type) => User)
  @Property({ ref: "User", nullable: true })
  owner?: Ref<User>;
}

export const PurchasesModel = getModelForClass(Purchases);
