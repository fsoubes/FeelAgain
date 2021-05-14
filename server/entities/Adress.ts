import { prop as Property } from "@typegoose/typegoose";
import { DeliveryType } from "../resolvers/enum/deliveryType";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Adress {
  @Field({ nullable: true })
  @Property({ required: true })
  name: string;

  @Field({ nullable: true })
  @Property({ required: true })
  line1: string;

  @Field({ nullable: true })
  @Property({ required: false })
  line2?: string;

  @Field({ nullable: true })
  @Property({ required: true })
  postal_code: string;

  @Field({ nullable: true })
  @Property({ required: true })
  country: string;

  @Field({ nullable: true })
  @Property({ required: true })
  city: string;

  @Field({ nullable: true })
  @Property({ required: true })
  email: string;

  @Field({ nullable: true })
  @Property({ required: false })
  phone: string;

  @Field((_type) => DeliveryType)
  @Property({ required: true })
  delivery: DeliveryType;
}
