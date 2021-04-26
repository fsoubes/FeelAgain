import { prop as Property } from "@typegoose/typegoose";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Adress {
  @Field({ nullable: true })
  @Property({ required: true })
  name: String;

  @Field({ nullable: true })
  @Property({ required: true })
  line1: string;

  @Field({ nullable: true })
  @Property({ required: true })
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
  @Property({ required: true })
  phone: string;

  @Field({ nullable: true })
  @Property({ required: false })
  delivery: string;
}
