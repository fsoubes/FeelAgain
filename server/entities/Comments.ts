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

  @Field({ nullable: true })
  @Property({ required: true })
  comment: String;

  @Field({ nullable: true })
  @Property({ required: true })
  title: String;

  @Field({ nullable: true })
  @Property({ required: true, default: 0, min: 0, max: 5 })
  score: Number;

  @Field((_type) => Shoes, { nullable: true })
  @Property({ ref: Shoes, required: true })
  product: Ref<Shoes>;

  @Field((_type) => User, { nullable: true })
  @Property({ ref: User, required: true })
  author: Ref<User>;
}

export const CommentsModel = getModelForClass(Comments);
