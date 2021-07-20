import { memo } from "react";
import { GetBasketQuery } from "../../../generated/graphql";
import SummaryItem from "./SummaryItem/SummaryItem";

interface SummaryListProps {
  data: GetBasketQuery;
}

const SummaryList: React.FC<SummaryListProps> = ({ data }) => {
  const item = data.getBasket.products.map((item) => {
    return (
      <SummaryItem
        key={item._id}
        src={
          item.card
            ? "/gift.jpeg"
            : item.variant?.shoes.vendor === "Anaki"
            ? item.variant?.shoes.images[1].src
            : (item.variant?.shoes.images[0].src as string)
        }
        size={item.variant ? parseFloat(item.variant?.title) : undefined}
        quantity={item.quantity as number}
        title={
          item.variant
            ? (item.variant?.shoes.title as string)
            : `Carte Cadeau de ${item.card?.price}€`
        }
        price={
          item.variant
            ? (item.variant.price as number)
            : (item.card?.price as number)
        }
        contain={item.variant?.shoes.vendor === "Anaki"}
      ></SummaryItem>
    );
  });

  return <ul>{item}</ul>;
};
export default memo(SummaryList);
