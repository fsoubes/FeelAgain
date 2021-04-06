import { InputType, Field } from "type-graphql";

@InputType()
export class ShoesInput {
  @Field({ nullable: true })
  title: String;

  @Field({ nullable: true })
  body_html?: string;

  @Field({ nullable: true })
  vendor: string;

  @Field({ nullable: true })
  handle: string;

  @Field({ nullable: true })
  product_type: string;

  @Field(() => [String], { nullable: true })
  tags?: [string];

  @Field(() => [Number], { nullable: true })
  size: number[];

  @Field({ nullable: true })
  price: Number;

  @Field(() => [String], { nullable: true })
  relatives?: [string];

  @Field({ nullable: true })
  is_published: Boolean;
}
