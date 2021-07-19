import { InputType, Field } from "type-graphql";
import { RangeGift } from "../../resolvers/enum/rangeGift";

@InputType()
export class CardInput {
  @Field({ nullable: true })
  from: string;

  @Field({ nullable: true })
  to: string;

  @Field((_type) => RangeGift, { nullable: true })
  price: RangeGift;

  @Field({ nullable: true })
  message: string;
}
