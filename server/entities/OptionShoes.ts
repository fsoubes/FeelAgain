import { prop as Property } from "@typegoose/typegoose";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class OptionShoes {
  @Field((_type) => String)
  @Property({ required: true })
  name: String;

  @Field()
  @Property({ required: false })
  position: String;

  @Field(() => [String])
  @Property({ type: () => [String], default: [] })
  values?: string[];

  @Field(() => [String])
  @Property({ type: () => [String], default: [] })
  switchTitle?: string[];
}
