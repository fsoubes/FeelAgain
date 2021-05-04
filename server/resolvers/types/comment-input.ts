import { InputType, Field } from "type-graphql";
import { prop as Property } from "@typegoose/typegoose";

@InputType()
export class CommentInput {
  @Field({ nullable: true })
  title: String;

  @Field({ nullable: true })
  @Property({ required: true, default: 0, min: 0, max: 5 })
  score: Number;

  @Field({ nullable: true })
  comment: String;
}
