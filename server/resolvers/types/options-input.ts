import { InputType, Field } from "type-graphql";

@InputType()
export class OptionsInput {
  @Field()
  name: String;

  @Field({ nullable: true })
  psoition: string;

  @Field(() => [String], { nullable: true })
  values?: [string];
}
