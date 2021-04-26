import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { Ref } from "../constant/types";
import { User } from "./User";
import { CartItem } from "./CartItem";
import { Adress } from "./Adress";
import { Comments } from "./Comments";

@ObjectType()
export class Orders {
  @Field()
  readonly _id: ObjectId;

  @Field((_type) => [CartItem])
  @Property({ ref: CartItem, default: [], nullable: true })
  products: Ref<CartItem>[];

  @Field()
  @Property({ required: true })
  status: String;

  @Field({ nullable: true })
  @Property({ required: false })
  tracking: String;

  @Field()
  @Property({ required: true })
  total: number;

  @Field((_type) => Adress)
  @Property({ type: () => Adress })
  adress: Adress;

  @Field((_type) => Comments)
  @Property({ ref: Comments, nullable: true })
  comments?: Ref<Comments>;

  @Field(() => Date)
  createdAt: Date;

  @Field((_type) => User)
  @Property({ ref: "User", nullable: true })
  user?: Ref<User>;
}

export const OrdersModel = getModelForClass(Orders, {
  schemaOptions: { timestamps: true },
});
