import SmallProductItem from "./Item/SmallProductItem";
import { GetBasketQuery } from "../../generated/graphql";

interface SmallProductListProps {
  data: GetBasketQuery;
  remove: (itemId: string, BasketId: string, quantity: number) => void;
  update: (itemId: string, quantity: number) => void;
}

const SmallProductList: React.FC<SmallProductListProps> = ({
  data,
  remove,
  update,
}) => {
  const item = data.getBasket?.products.map((item) => (
    <SmallProductItem
      key={item._id}
      src={
        item.card
          ? "/gift.jpeg"
          : item.variant?.shoes.vendor === "Anaki"
          ? item.variant?.shoes.images[1].src
          : (item.variant?.shoes.images[0].src as string)
      }
      id={item._id}
      size={item.variant ? (item.variant.title as string) : undefined}
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
      available={
        (item.quantity as number) <= (item.variant?.quantity as number)
      }
      quantity={item.quantity as number}
      remove={() =>
        remove(item._id, data.getBasket?._id, item.quantity as number)
      }
      update={update}
    ></SmallProductItem>
  ));

  return <ul>{item}</ul>;
};
export default SmallProductList;
