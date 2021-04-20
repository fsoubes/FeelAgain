import React from "react";
import ProductLargeItem from "./Item/ProductLargeItem";
import { GetBasketQuery } from "../../../generated/graphql";
import styles from "../../../styles/LargeProduct.module.scss";
import useResponsive from "../../../utils/useResponsive";
import SmallCartProduct from "../SmallCartProduct";

interface ProductListProps {
  data: GetBasketQuery;
  remove: (itemId: string, BasketId: string) => void;
  update: (itemId: string, quantity: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ data, remove, update }) => {
  const { isTabletorMobile } = useResponsive();

  if (isTabletorMobile) {
    return (
      <SmallCartProduct
        data={data}
        handleUpdate={
          update as (itemId: string, quantity: number) => Promise<void>
        }
        handleRemove={
          remove as (itemId: string, BasketId: string) => Promise<void>
        }
      ></SmallCartProduct>
    );
  }

  const largeItem = data.getBasket.products.map((item) => {
    return (
      <ProductLargeItem
        key={item._id}
        src={
          item.variant.shoes.vendor === "Anaki"
            ? item.variant.shoes.images[1].src
            : item.variant.shoes.images[0].src
        }
        id={item._id}
        size={item.variant.title}
        title={item.variant.shoes.title}
        price={item.variant.price}
        contain={item.variant.shoes.vendor === "Anaki"}
        available={(item.quantity as number) < item.variant.quantity}
        quantity={item.quantity as number}
        remove={() => remove(item._id, data.getBasket?._id)}
        update={update}
      />
    );
  });

  return (
    <div>
      {largeItem}
      <div className={styles.head__total}>
        <div className={styles.cover}></div>
        <div className={styles.product}></div>
        <div className={styles.quantity}></div>
        <div className={styles.total}>
          <div>SOUS-TOTAL</div>
          <div>
            (
            {data &&
              data?.getBasket.products.reduce(
                (acc, currentValue) => acc + (currentValue.quantity as number),
                0
              )}
            &nbsp;Articles)
          </div>
        </div>
      </div>
      <div className={styles.head__total}>
        <div className={styles.cover}></div>
        <div className={styles.product}></div>
        <div className={styles.quantity}></div>
        <div className={styles.total}>
          <div>
            {data &&
              data?.getBasket.products.reduce(
                (acc, currentValue) =>
                  acc +
                  currentValue.variant.price *
                    (currentValue.quantity as number),
                0
              )}
            ,00€
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductList;
