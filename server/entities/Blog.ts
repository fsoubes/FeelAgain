import { Ref } from "../constant/types";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { User } from "./User";
import { Comment } from "./Comment";

@ObjectType()
export class Blog {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  title: String;

  @Field(() => String)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field({ nullable: true })
  @Property()
  description?: string;

  @Field({ nullable: true })
  @Property()
  image_url?: string;

  @Field(() => [String])
  @Property({ type: () => [String], default: [] })
  tags?: string[];

  @Field(() => [String])
  @Property({ type: () => [String], default: [] })
  source?: string[];

  @Field(() => [String])
  @Property({ type: () => [String], default: [] })
  social?: string[];

  @Field({ nullable: true })
  @Property()
  article?: string;

  @Field({ nullable: true })
  @Property()
  isPublished?: boolean;

  @Field((_type) => Number)
  @Property({ default: 0 })
  positiveRating?: number;

  @Field((_type) => Number)
  @Property({ default: 0 })
  totalVoting?: Number;

  @Field({ nullable: true })
  @Property()
  authRating?: String;

  @Field((_type) => User)
  @Property({ ref: User, required: false })
  author?: Ref<User>;

  @Field((_type) => [User])
  @Property({ ref: User, default: [], nullable: false })
  upRating: Ref<User>[];

  @Field((_type) => [User])
  @Property({ ref: User, default: [], nullable: false })
  downRating: Ref<User>[];

  @Field((_type) => Comment)
  @Property({ ref: Comment, required: false })
  comments?: Ref<Comment>;
}

export const BlogModel = getModelForClass(Blog, {
  schemaOptions: { timestamps: true },
});
