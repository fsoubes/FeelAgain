import { InputType, Field } from "type-graphql";

@InputType()
export class VariantInput {
  @Field({ nullable: true })
  title: String;

  @Field({ nullable: true })
  product_id: String;

  @Field({ nullable: true })
  sku: String;

  @Field({ nullable: true })
  featured_image: String;

  @Field({ nullable: true })
  available: Boolean;

  @Field({ nullable: true })
  grams: Number;

  @Field({ nullable: true })
  quantity: Number;

  @Field({ nullable: true })
  price: Number;

  @Field({ nullable: true })
  compare_at_price: Number;
}
