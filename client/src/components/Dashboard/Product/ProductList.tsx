import React from "react";
import {
  ImageFragmentFragment,
  ShoesBrowseFragmentFragment,
} from "../../../generated/graphql";
import ProductItem from "./Item/ProductItem";
import styles from "../../../styles/Shop.module.scss";

interface ProductListProps {
  shoes: Array<
    { __typename?: "Shoes" } & {
      images: Array<{ __typename?: "Images" } & ImageFragmentFragment>;
    } & ShoesBrowseFragmentFragment
  >;
  remove?:
    | ((
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        id: string
      ) => Promise<void>)
    | undefined;
}

const ProductListDash: React.FC<ProductListProps> = ({ shoes, remove }) => {
  const products = shoes.map((item) => {
    return (
      <ProductItem
        key={item._id}
        id={item._id}
        src={item.vendor === "Anaki" ? item.images[1].src : item.images[0].src}
        price={item.price}
        title={item.title}
        remove={remove}
      />
    );
  });

  return <div className={styles.container}>{products}</div>;
};
export default React.memo(ProductListDash);
