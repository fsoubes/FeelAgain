import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { Ref } from "../constant/types";
import { Shoes } from "./Shoes";
import { User } from "./User";

@ObjectType()
export class Basket {
  @Field()
  readonly _id: ObjectId;

  @Field((_type) => [Shoes])
  @Property({ ref: Shoes, default: [], nullable: false })
  products: Ref<Shoes>[];

  @Field((_type) => User)
  @Property({ ref: User, nullable: true })
  user: Ref<User>;
}

export const BasketModel = getModelForClass(Basket);
