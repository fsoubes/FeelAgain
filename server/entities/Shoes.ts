import { Ref } from "./../constant/types";
import {
  prop as Property,
  getModelForClass,
  index,
} from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { Variants } from "./Variants";
import { Images } from "./Images";
import { OptionShoes } from "./OptionShoes";

@ObjectType()
@index({ handle: 1 }, { unique: true })
export class Shoes {
  @Field()
  readonly _id: ObjectId;

  @Property({ required: false })
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Property({ required: false, default: [] })
  switchLinks: [String];

  @Property({ required: false })
  switch: String;

  @Field()
  @Property({ required: true })
  title: String;

  @Field()
  @Property({ required: true, default: 0, min: 0, max: 5 })
  score: Number;

  @Field()
  @Property({ required: true, default: 0 })
  scored_by: Number;

  @Field()
  @Property({ required: true, default: 0 })
  visited_by: Number;

  @Field()
  @Property({ required: true, default: 0 })
  bought_by: Number;

  @Field()
  @Property({ required: true, text: true })
  handle: String;

  @Field()
  @Property({ required: true })
  vendor: String;

  @Field()
  @Property({ required: true, default: true })
  is_published: Boolean;

  @Field(() => [String])
  @Property({ type: () => [String], default: [] })
  tags?: string[];

  @Field()
  @Property({ required: true })
  body_html: String;

  @Field()
  @Property({ required: true })
  product_type: String;

  @Field()
  @Property({ required: true })
  price: number;

  @Field(() => [Number])
  @Property({ type: () => [Number], default: [] })
  size: number[];

  @Field((_type) => [Variants])
  @Property({ ref: "Variants", default: [], nullable: false })
  variants: Ref<Variants>[];

  @Field((_type) => [OptionShoes])
  @Property({ type: () => OptionShoes, default: [] })
  options: OptionShoes[];

  @Field((_type) => [Images])
  @Property({ ref: Images, default: [], nullable: false })
  images: Ref<Images>[];

  @Field((_type) => [Shoes])
  @Property({ ref: Shoes, default: [], nullable: true })
  relatives: Ref<Shoes>[];

  @Field(() => [String])
  @Property({ type: () => [String], default: [] })
  switchTitle?: string[];
}

export const ShoesModel = getModelForClass(Shoes, {
  schemaOptions: { timestamps: true },
});
