import { Button, Link } from "@material-ui/core";
import React from "react";
import { GetBasketQuery } from "../../generated/graphql";
import styles from "../../styles/CartProduct.module.scss";
import SmallProductList from "../Products/SmallProductList";

interface SmallCartProductProps {
  data?: GetBasketQuery;
  handleRemove?: (itemId: string, BasketId: string) => Promise<void>;
  handleUpdate?: (itemId: string, quantity: number) => Promise<void>;
  setOpen?: React.Dispatch<React.SetStateAction<Boolean>>;
}

const SmallCartProduct: React.FC<SmallCartProductProps> = ({
  data,
  handleRemove,
  handleUpdate,
  setOpen,
}) => {
  return (
    <div>
      <div className={styles.header}>
        <h1>Panier</h1>
        <div className={styles.close}>
          Fermer
          <Button
            onClick={() =>
              (setOpen as React.Dispatch<React.SetStateAction<Boolean>>)(false)
            }
          >
            X
          </Button>
        </div>
      </div>
      <div className={styles.content}>
        {data && (
          <SmallProductList
            data={data}
            remove={
              handleRemove as (
                itemId: string,
                BasketId: string
              ) => Promise<void>
            }
            update={
              handleUpdate as (
                itemId: string,
                quantity: number
              ) => Promise<void>
            }
          />
        )}
        <p className={styles.total}>
          <strong>SOUS-TOTAL:</strong>
          <span style={{ color: "black", fontWeight: "bold" }}>
            {data &&
              data?.getBasket.products.reduce(
                (acc, currentValue) =>
                  acc +
                  currentValue.variant.price *
                    (currentValue.quantity as number),
                0
              )}
            ,00€
          </span>
        </p>
        <div className={styles.routing}>
          <Link href={"/panier"}>
            <Button className={styles.action__cart} disableRipple>
              VOIR LE PANIER
            </Button>
          </Link>
          <Link href={"/paiement/id"}>
            <Button className={styles.action__payment} disableRipple>
              PAIEMENT
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SmallCartProduct;
