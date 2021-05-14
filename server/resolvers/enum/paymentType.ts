import { registerEnumType } from "type-graphql";

export enum PaymentType {
  PayPal = "PayPal",
  Stripe = "Stripe",
}

registerEnumType(PaymentType, {
  name: "PaymentType", // this one is mandatory
  description: "type of payment", // this one is optional
});
