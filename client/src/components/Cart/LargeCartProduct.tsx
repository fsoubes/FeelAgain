import { Button } from "@material-ui/core";
import { ArrowRightAlt } from "@material-ui/icons";
import Link from "next/link";
import React from "react";
import { GetBasketQuery } from "../../generated/graphql";
import styles from "../../styles/LargeProduct.module.scss";
import ProductList from "./Large/ProductList";

interface LargeCartProductProps {
  data?: GetBasketQuery;
  handleRemove?: (
    itemId: string,
    BasketId: string,
    quantity: number
  ) => Promise<void>;
  handleUpdate?: (itemId: string, quantity: number) => Promise<void>;
}

const LargeCartProduct: React.FC<LargeCartProductProps> = ({
  data,
  handleRemove,
  handleUpdate,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.main__title}>
        <h1>PANIER</h1>
      </div>
      <div className={styles.head__row}>
        <div className={styles.cover}></div>
        <div className={styles.product}>PRODUIT</div>
        <div className={styles.quantity}>QUANTITÉ</div>
        <div className={styles.total}>TOTAL</div>
      </div>
      {data && (
        <ProductList
          data={data}
          remove={
            handleRemove as (
              itemId: string,
              BasketId: string,
              quantity: number
            ) => Promise<void>
          }
          update={
            handleUpdate as (itemId: string, quantity: number) => Promise<void>
          }
        />
      )}
      <div className={styles.payment}>
        <Link href={`/checkouts/${data?.getBasket._id}?step=information`}>
          <Button>PROCEDER AU PAIEMENT</Button>
        </Link>
        {/* <ArrowRightAlt /> */}
      </div>
    </div>
  );
};
export default LargeCartProduct;
