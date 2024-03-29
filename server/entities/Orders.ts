import { Purchases } from "./Purchases";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { Ref } from "../constant/types";
import { User } from "./User";
import { CartItem } from "./CartItem";
import { Adress } from "./Adress";
// import { StatusOrder } from "../resolvers/enum/statusOrder";
import { PaymentType } from "../resolvers/enum/paymentType";

@ObjectType()
export class Orders {
  @Field()
  readonly _id: ObjectId;

  @Field((_type) => [CartItem])
  @Property({ ref: CartItem, default: [], nullable: true })
  products: Ref<CartItem>[];

  /* @Field((_type) => StatusOrder)
  @Property({ required: true })
  status: StatusOrder; */

  @Field((_type) => PaymentType)
  @Property({ required: true })
  payment_method: PaymentType;

  @Field((_type) => String)
  @Property({ required: true, default: "" })
  status: String;

  @Field((_type) => String)
  @Property({ required: true, default: "" })
  payment_intent: String;

  @Field({ nullable: true })
  @Property({ required: true, default: "" })
  tracking: String;

  @Field({ nullable: true })
  @Property({ required: false, default: "" })
  last_four: String;

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

  @Field((_type) => [Purchases])
  @Property({ ref: Purchases, default: [], nullable: true })
  purchases: Ref<Purchases>[];
}

export const OrdersModel = getModelForClass(Orders, {
  schemaOptions: { timestamps: true },
});
