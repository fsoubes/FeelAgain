import { prop as Property } from "@typegoose/typegoose";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Adress {
  @Field((_type) => String)
  @Property({ required: true })
  name: String;

  @Field((_type) => String)
  @Property({ required: false })
  firstname: String;

  @Field({ nullable: true })
  line1: string;

  @Field({ nullable: true })
  line2?: string;

  @Field({ nullable: true })
  postal_code: string;

  @Field({ nullable: true })
  country: string;

  @Field({ nullable: true })
  city: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  delivery: string;

  @Field({ nullable: true })
  amount: string;
}
