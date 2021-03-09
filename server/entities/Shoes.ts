import { Ref } from "./../constant/types";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { Variants } from "./Variants";
import { Images } from "./Images";
import { OptionShoes } from "./OptionShoes";

@ObjectType()
export class Shoes {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  title: String;

  @Field()
  @Property({ required: true })
  handle: String;

  @Field()
  @Property({ required: true })
  vendor: String;

  @Field(() => [String])
  @Property({ type: () => [String], default: [] })
  tags?: string[];

  @Field()
  @Property({ required: true })
  body_html: String;

  @Field()
  @Property({ required: true })
  prouct_type: String;

  @Field((_type) => [Variants])
  @Property({ ref: Variants, default: [], nullable: false })
  variants: Ref<Variants>[];

  @Field((_type) => [OptionShoes])
  @Property({ type: () => OptionShoes, default: [] })
  options: OptionShoes[];

  @Field((_type) => [Images])
  @Property({ ref: Images, default: [], nullable: false })
  images: Ref<Images>[];
}

export const ShoesModel = getModelForClass(Shoes);
