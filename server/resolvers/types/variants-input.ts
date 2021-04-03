import { InputType, Field } from "type-graphql";

@InputType()
export class VariantInput {
  @Field()
  title: String;

  @Field()
  product_id: String;

  @Field({ nullable: true })
  sku: String;

  @Field({ nullable: true })
  featured_image: String;

  @Field()
  available: Boolean;

  @Field()
  grams: Number;

  @Field()
  quantity: Number;

  @Field()
  price: Number;

  @Field({ nullable: true })
  compare_at_price: Number;
}
