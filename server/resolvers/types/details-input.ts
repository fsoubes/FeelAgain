import { DeliveryType } from "../../resolvers/enum/deliveryType";
import { InputType, Field } from "type-graphql";
import { PaymentType } from "../../resolvers/enum/paymentType";

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
  last_four: string;

  @Field((_type) => DeliveryType, { nullable: true })
  delivery: DeliveryType;

  @Field((_type) => PaymentType, { nullable: true })
  type: PaymentType;

  @Field({ nullable: true })
  amount: string;
}
