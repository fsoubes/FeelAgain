import { registerEnumType } from "type-graphql";

export enum StatusOrder {
  Attente = "En attente",
  Envoye = "Envoyé",
  Livre = "Livré",
  Annule = "Annulé",
}

registerEnumType(StatusOrder, {
  name: "StatusOrder", // this one is mandatory
  description: "status of order", // this one is optional
});
