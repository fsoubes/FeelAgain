import { registerEnumType } from "type-graphql";

export enum RangeGift {
  card_25 = "card_25",
  card_50 = "card_50",
  card_75 = "card_75",
  card_100 = "card_100",
  card_125 = "card_125",
  card_150 = "card_150",
  card_175 = "card_175",
  card_200 = "card_200",
}

registerEnumType(RangeGift, {
  name: "RangeGift", // this one is mandatory
  description: "gift card payment", // this one is optional
});
