import React from "react";
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
          item.variant.shoes.vendor === "Anaki"
            ? item.variant.shoes.images[1].src
            : item.variant.shoes.images[0].src
        }
        size={parseFloat(item.variant?.title)}
        quantity={item.quantity as number}
        title={item.variant.shoes.title}
        price={item.variant.price}
        contain={item.variant.shoes.vendor === "Anaki"}
      ></SummaryItem>
    );
  });

  return <ul>{item}</ul>;
};
export default SummaryList;
