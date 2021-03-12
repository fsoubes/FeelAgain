import React from "react";
import {
  ImageFragmentFragment,
  Shoes,
  ShoesBrowseFragmentFragment,
} from "../../generated/graphql";
import ProductItem from "./Item/ProductItem";
import styles from "../../styles/Shop.module.scss";

interface ProductsListProps {
  shoes: Array<
    { __typename?: "Shoes" } & {
      images: Array<{ __typename?: "Images" } & ImageFragmentFragment>;
    } & ShoesBrowseFragmentFragment
  >;
}

const ProductsList: React.FC<ProductsListProps> = ({ shoes }) => {
  const products = shoes.map((item) => {
    return (
      <ProductItem
        key={item._id}
        id={item._id}
        src={item.images[2].src}
        price={"200,00"}
        title={item.title}
      />
    );
  });

  return (
    <div className={`${styles.container} container__shop`}>{products}</div>
  );
};
export default ProductsList;
