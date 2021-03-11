import { InputType, Field } from "type-graphql";

@InputType()
export class ShoesInput {
  @Field()
  title: String;

  @Field({ nullable: true })
  body_html?: string;

  @Field({ nullable: true })
  vendor: string;

  @Field({ nullable: true })
  switch?: string;

  @Field({ nullable: true })
  handle: string;

  @Field({ nullable: true })
  product_type: string;

  @Field(() => [String], { nullable: true })
  tags?: [string];
}
