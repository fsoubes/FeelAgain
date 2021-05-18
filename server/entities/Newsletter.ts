import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { Ref } from "../constant/types";
import { User } from "./User";

@ObjectType()
export class Newsletter {
  @Field()
  readonly _id: ObjectId;

  @Field(() => String)
  @Property({ default: "newsletter" })
  type: string;

  @Field(() => [String])
  @Property({ type: () => [String], default: [] })
  email?: string[];

  @Field((_type) => [User])
  @Property({ ref: "User", nullable: true })
  users: Ref<User>[];
}

export const NewsletterModel = getModelForClass(Newsletter);
