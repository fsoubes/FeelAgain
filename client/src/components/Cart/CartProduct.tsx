import { Button } from "@material-ui/core";
import Link from "next/link";
import React, { useCallback } from "react";
import {
  GetBasketDocument,
  GetBasketQuery,
  useGetBasketQuery,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} from "../../generated/graphql";
import styles from "../../styles/CartProduct.module.scss";
import SmallProductList from "../Products/SmallProductList";
import { useApolloClient } from "@apollo/client";

interface CartProductProps {
  isOpen: Boolean;
  setOpen: React.Dispatch<React.SetStateAction<Boolean>>;
}

const CartProduct: React.FC<CartProductProps> = ({ isOpen, setOpen }) => {
  const client = useApolloClient();
  const { data } = useGetBasketQuery({
    skip: !isOpen,
  });

  const [removeFromCart] = useRemoveCartItemMutation();
  const [updateCartItem] = useUpdateCartItemMutation();

  const handleRemove = useCallback(
    async (itemId: string, BasketId: string) => {
      try {
        setTimeout(async () => {
          await removeFromCart({
            variables: {
              itemId: itemId,
              basketId: BasketId,
            },
            update: (cache) => {
              const basket = client.readQuery<GetBasketQuery>({
                query: GetBasketDocument,
              });

              if (basket?.getBasket) {
                const filterProducts = basket.getBasket.products.filter(
                  (item) => item._id !== itemId
                );

                cache.writeQuery<GetBasketQuery>({
                  query: GetBasketDocument,
                  data: {
                    __typename: "Query",
                    ...basket,
                    getBasket: {
                      ...basket.getBasket,
                      products: [...filterProducts],
                    },
                  },
                });
              }
            },
          });
        }, 350);
      } catch (err) {
        throw err;
      }
    },
    [removeFromCart]
  );

  const handleUpdate = useCallback(
    async (itemId: string, quantity: number) => {
      try {
        setTimeout(async () => {
          await updateCartItem({
            variables: {
              itemId: itemId,
              quantity: quantity,
            },
            update: (cache) => {
              const basket = client.readQuery<GetBasketQuery>({
                query: GetBasketDocument,
              });

              if (basket?.getBasket) {
                const updateProducts = basket.getBasket.products.map((item) =>
                  item._id === itemId ? { ...item, quantity: quantity } : item
                );

                cache.writeQuery<GetBasketQuery>({
                  query: GetBasketDocument,
                  data: {
                    __typename: "Query",
                    ...basket,
                    getBasket: {
                      ...basket.getBasket,
                      products: [...updateProducts],
                    },
                  },
                });
              }
            },
          });
        }, 1000);
      } catch (err) {
        throw err;
      }
    },
    [updateCartItem]
  );

  return (
    <div>
      <div className={styles.header}>
        <h1>Panier</h1>
        <div className={styles.close}>
          Fermer
          <Button onClick={() => setOpen(false)}>X</Button>
        </div>
      </div>
      <div className={styles.content}>
        {data && (
          <SmallProductList
            data={data}
            remove={handleRemove}
            update={handleUpdate}
          />
        )}
        <p>
          <strong>SOUS-TOTAL:</strong>
          <span style={{ color: "red", fontWeight: "bold" }}>
            {data?.getBasket.products.reduce(
              (acc, currentValue) =>
                acc +
                currentValue.variant.price * (currentValue.quantity as number),
              0
            )}
            ,00€
          </span>
        </p>
        <div className={styles.routing}>
          <Link href={"/panier"}>
            <Button disableRipple>VOIR LE PANIER</Button>
          </Link>
          <Link href={"/paiement/id"}>
            <Button disableRipple>PAIEMENT</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default CartProduct;
