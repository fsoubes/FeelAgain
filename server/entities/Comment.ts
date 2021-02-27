import { Ref } from "./../constant/types";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { User } from "./User";

@ObjectType()
export class Comment {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  message: String;

  @Field((_type) => User)
  @Property({ ref: User, required: true })
  author: Ref<User>;
}

export const CommentModel = getModelForClass(Comment);
