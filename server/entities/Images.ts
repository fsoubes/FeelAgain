import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";

@ObjectType()
export class Images {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: false })
  position: Number;

  @Field()
  @Property({ required: false })
  src: String;

  @Field()
  @Property({ required: true })
  product_id: String;

  @Field()
  @Property({ required: false })
  width: Number;

  @Field()
  @Property({ required: false })
  height: Number;
}

export const ImagesModel = getModelForClass(Images);
