import { registerEnumType } from "type-graphql";

export enum DeliveryType {
  Pickup,
  Home,
}

registerEnumType(DeliveryType, {
  name: "DeliveryType", // this one is mandatory
  description: "type of payment", // this one is optional
});
