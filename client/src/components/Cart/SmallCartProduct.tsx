import { Button, Link } from "@material-ui/core";

import { GetBasketQuery } from "../../generated/graphql";
import styles from "../../styles/CartProduct.module.scss";
import SmallProductList from "../Products/SmallProductList";

interface SmallCartProductProps {
  data?: GetBasketQuery;
  handleRemove?: (
    itemId: string,
    BasketId: string,
    quantity: number
  ) => Promise<void>;
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
        {setOpen && (
          <div className={styles.close}>
            Fermer
            <Button
              onClick={() =>
                (setOpen as React.Dispatch<React.SetStateAction<Boolean>>)(
                  false
                )
              }
            >
              X
            </Button>
          </div>
        )}
      </div>
      <div className={styles.content}>
        {data && data.getBasket.products.length > 0 && (
          <>
            <SmallProductList
              data={data}
              remove={
                handleRemove as (
                  itemId: string,
                  BasketId: string,
                  quantity: number
                ) => Promise<void>
              }
              update={
                handleUpdate as (
                  itemId: string,
                  quantity: number
                ) => Promise<void>
              }
            />
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
          </>
        )}
        {data?.getBasket?.products.length === 0 && (
          <h4 style={{ margin: "1rem" }}>Votre panier est vide actuellement</h4>
        )}
        <div className={styles.routing}>
          {setOpen && (
            <Link href={"/panier"}>
              <Button className={styles.action__cart} disableRipple>
                VOIR LE PANIER
              </Button>
            </Link>
          )}
          {data && data?.getBasket?.products?.length > 0 && (
            <Link href={`/checkouts/${data?.getBasket._id}?step=information`}>
              <Button className={styles.action__payment} disableRipple>
                PAIEMENT
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default SmallCartProduct;
