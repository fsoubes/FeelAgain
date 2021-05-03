import { Ref } from "../constant/types";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { User } from "./User";

@ObjectType()
export class Comments {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  message: String;

  @Field()
  @Property({ required: true, default: 0, min: 0, max: 5 })
  score: Number;

  @Field((_type) => User)
  @Property({ ref: User, required: true })
  author: Ref<User>;
}

export const CommentsModel = getModelForClass(Comments);
