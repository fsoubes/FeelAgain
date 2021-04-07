import { InputType, Field } from "type-graphql";

@InputType()
export class ImageInput {
  @Field({ nullable: true })
  position: Number;

  @Field({ nullable: true })
  src: String;

  @Field({ nullable: true })
  product_id: String;

  @Field({ nullable: true })
  width: Number;

  @Field({ nullable: true })
  height: Number;
}
