import React from "react";
import {
  ImageFragmentFragment,
  ShoesBrowseFragmentFragment,
} from "../../../generated/graphql";
import ProductItem from "./Item/ProductItem";
import styles from "../../../styles/Shop.module.scss";

interface ProductListProps {
  isTilt?: Boolean;
  isProduct?: Boolean;
  path?: String;
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

const ProductListDash: React.FC<ProductListProps> = ({
  shoes,
  remove,
  path,
  isProduct = false,
  isTilt = true,
}) => {
  const products = shoes.map((item) => {
    return (
      <ProductItem
        isTilt={isTilt}
        path={path as string}
        key={item._id}
        id={item._id}
        src={item.vendor === "Anaki" ? item.images[1].src : item.images[0].src}
        price={item.price}
        title={item.title}
        remove={remove}
        score={item.score}
        scoredBy={item.scored_by}
      />
    );
  });

  return (
    <div className={isProduct ? styles.container__product : styles.container}>
      {products}
    </div>
  );
};
export default React.memo(ProductListDash);
