import { InputType, Field } from "type-graphql";

@InputType()
export class ShoesInputFilter {
  @Field({ nullable: true })
  product?: String;

  @Field(() => [Number], { nullable: true })
  size?: [number];

  @Field(() => [String], { nullable: true })
  tags?: [string];

  @Field({ nullable: true })
  is_published?: Boolean;
}
