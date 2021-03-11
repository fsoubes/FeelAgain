import { InputType, Field } from "type-graphql";

@InputType()
export class VariantInput {
  @Field()
  title: String;

  @Field()
  product_id: String;

  @Field()
  option1: String;

  @Field()
  option2: String;

  @Field()
  option3: String;

  @Field()
  sku: String;

  @Field()
  featured_image: String;

  @Field()
  available: String;

  @Field()
  grams: Number;

  @Field()
  quantity: String;

  @Field()
  price: String;

  @Field()
  compare_at_price: String;
}
