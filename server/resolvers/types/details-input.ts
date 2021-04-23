import { InputType, Field } from "type-graphql";

@InputType()
export class DetailsInput {
  @Field({ nullable: true })
  line1: string;

  @Field({ nullable: true })
  line2?: string;

  @Field({ nullable: true })
  postal_code: string;

  @Field({ nullable: true })
  country: string;

  @Field({ nullable: true })
  city: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  delivery: string;

  @Field({ nullable: true })
  amount: string;
}
