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
  title: String;

  @Field({ nullable: true })
  @Property({ required: true })
  comment: String;

  @Field({ nullable: true })
  @Property({ required: true, default: 0, min: 0, max: 5 })
  score: Number;

  @Field((_type) => Shoes, { nullable: true })
  @Property({ ref: Shoes, required: true })
  product: Ref<Shoes>;

  @Field(() => Date)
  createdAt: Date;

  @Field({ nullable: true })
  @Property({ required: true, default: 0, min: 0 })
  recommanded_by: Number;

  @Field((_type) => [User])
  @Property({ ref: User, default: [], nullable: false })
  recommanded?: Ref<User>[];

  @Field({ nullable: true })
  @Property({ required: true, default: false })
  is_recommanding: Boolean;

  @Field((_type) => User)
  @Property({ ref: "User", nullable: true })
  author?: Ref<User>;
}

export const CommentsModel = getModelForClass(Comments, {
  schemaOptions: { timestamps: true },
});
