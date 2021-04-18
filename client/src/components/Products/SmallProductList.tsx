import React from "react";
import SmallProductItem from "./Item/SmallProductItem";
import { GetBasketQuery } from "../../generated/graphql";

interface SmallProductListProps {
  data: GetBasketQuery;
  remove: (itemId: string, BasketId: string) => void;
  update: (itemId: string, quantity: number) => void;
}

const SmallProductList: React.FC<SmallProductListProps> = ({
  data,
  remove,
  update,
}) => {
  const item = data.getBasket?.products.map((item, index) => (
    <SmallProductItem
      key={item._id}
      src={
        item.variant.shoes.vendor === "Anaki"
          ? item.variant.shoes.images[1].src
          : item.variant.shoes.images[0].src
      }
      id={item._id}
      title={item.variant.shoes.title}
      price={item.variant.price}
      contain={item.variant.shoes.vendor === "Anaki"}
      available={(item.quantity as number) < item.variant.quantity}
      quantity={item.quantity as number}
      remove={() => remove(item._id, data.getBasket?._id)}
      update={update}
    ></SmallProductItem>
  ));

  return <ul>{item}</ul>;
};
export default SmallProductList;
