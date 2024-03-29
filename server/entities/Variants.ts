import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { Shoes } from "./Shoes";
import { Ref } from "constant/types";

@ObjectType()
export class Variants {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: false })
  title: String;

  @Field()
  @Property({ required: false })
  product_id: String;

  @Field()
  @Property({ required: false })
  option1: String;

  @Field()
  @Property({ required: false })
  option2: String;

  @Field()
  @Property({ required: false })
  option3: String;

  @Field()
  @Property({ required: false })
  sku: String;

  @Field({ nullable: true })
  @Property({ required: false })
  featured_image: String;

  @Field()
  @Property({ required: true })
  available: String;

  @Field()
  @Property({ required: false, default: 0 })
  grams: Number;

  @Field()
  @Property({ required: true })
  quantity: Number;

  @Field()
  @Property({ required: true })
  price: Number;

  @Field()
  @Property({ required: false })
  compare_at_price: Number;

  @Field((_type) => Shoes)
  @Property({ ref: "Shoes", nullable: true })
  shoes?: Ref<Shoes>;
}

export const VariantsModel = getModelForClass(Variants);
