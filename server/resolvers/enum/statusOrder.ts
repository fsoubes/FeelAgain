import { registerEnumType } from "type-graphql";

export enum StatusOrder {
  Attente = "Attente",
  Envoye = "Envoye",
  Livre = "Livre",
  Annule = "Annule",
}

registerEnumType(StatusOrder, {
  name: "StatusOrder", // this one is mandatory
  description: "status of order", // this one is optional
});
