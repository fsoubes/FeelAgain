import { InputType, Field } from "type-graphql";

@InputType()
export class ImageInput {
  @Field()
  position: Number;

  @Field()
  src: String;

  @Field()
  product_id: String;

  @Field({ nullable: true })
  width: Number;

  @Field({ nullable: true })
  height: Number;
}
