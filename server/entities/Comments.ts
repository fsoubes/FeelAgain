import { Ref } from "../constant/types";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { User } from "./User";
import { Shoes } from "./Shoes";

@ObjectType()
export class Comments {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  comment: String;

  @Field()
  @Property({ required: true })
  title: String;

  @Field()
  @Property({ required: true, default: 0, min: 0, max: 5 })
  score: Number;

  @Field((_type) => Shoes)
  @Property({ ref: Shoes, required: true })
  product: Ref<Shoes>;

  @Field((_type) => User)
  @Property({ ref: User, required: true })
  author: Ref<User>;
}

export const CommentsModel = getModelForClass(Comments);
