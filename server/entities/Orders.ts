import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { Ref } from "../constant/types";
import { User } from "./User";
import { CartItem } from "./CartItem";
import { Adress } from "./Adress";
import { StatusOrder } from "../resolvers/enum/statusOrder";

@ObjectType()
export class Orders {
  @Field()
  readonly _id: ObjectId;

  @Field((_type) => [CartItem])
  @Property({ ref: CartItem, default: [], nullable: true })
  products: Ref<CartItem>[];

  @Field((_type) => StatusOrder)
  @Property({ required: true, default: "UP" })
  test: StatusOrder;

  @Field((_type) => String)
  @Property({ required: true, default: "" })
  status: String;

  @Field((_type) => String)
  @Property({ required: true, default: "" })
  payment_intent: String;

  @Field({ nullable: true })
  @Property({ required: true, default: "" })
  tracking: String;

  @Field()
  @Property({ required: false })
  timeline: number;

  @Field()
  @Property({ required: true })
  total: number;

  @Field((_type) => Adress)
  @Property({ type: () => Adress })
  adress: Adress;

  @Field(() => Date)
  createdAt: Date;

  @Field((_type) => User)
  @Property({ ref: "User", nullable: true })
  user?: Ref<User>;
}

export const OrdersModel = getModelForClass(Orders, {
  schemaOptions: { timestamps: true },
});
