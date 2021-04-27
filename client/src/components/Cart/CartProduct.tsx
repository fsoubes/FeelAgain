import React, { useCallback, Fragment } from "react";
import {
  GetBasketDocument,
  GetBasketQuery,
  MeDocument,
  MeQuery,
  useGetBasketQuery,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} from "../../generated/graphql";
import { useApolloClient } from "@apollo/client";
import Spinner from "../Spinner/Spinner";

interface CartProductProps {
  isOpen: Boolean;
  children: JSX.Element;
  setOpen?: React.Dispatch<React.SetStateAction<Boolean>>;
}

const CartProduct: React.FC<CartProductProps> = ({
  isOpen,
  children,
  setOpen,
}) => {
  const client = useApolloClient();
  const { data, loading } = useGetBasketQuery({
    skip: !isOpen,
  });

  const [removeFromCart] = useRemoveCartItemMutation();
  const [updateCartItem] = useUpdateCartItemMutation();

  const handleRemove = useCallback(
    async (itemId: string, BasketId: string, quantity: number) => {
      try {
        setTimeout(async () => {
          await removeFromCart({
            variables: {
              itemId: itemId,
              basketId: BasketId,
              quantity: quantity,
            },
            update: (cache) => {
              const basket = client.readQuery<GetBasketQuery>({
                query: GetBasketDocument,
              });

              const currentUser = client.readQuery<MeQuery>({
                query: MeDocument,
              });

              if (basket?.getBasket) {
                const filterProducts = basket.getBasket.products.filter(
                  (item) => item._id !== itemId
                );

                cache.evict({
                  // Often cache.evict will take an options.id property, but that's not necessary
                  // when evicting from the ROOT_QUERY object, as we're doing here.
                  fieldName: "products",
                  // No need to trigger a broadcast here, since writeQuery will take care of that.
                  broadcast: false,
                });

                if (currentUser && currentUser.me) {
                  cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      __typename: "Query",
                      me: {
                        ...currentUser?.me,
                        items: (currentUser?.me.items as number) - quantity,
                      },
                    },
                  });
                }
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

              const currentUser = client.readQuery<MeQuery>({
                query: MeDocument,
              });

              if (basket?.getBasket) {
                const updateProducts = basket.getBasket.products.map((item) =>
                  item._id === itemId ? { ...item, quantity: quantity } : item
                );

                if (currentUser && currentUser.me) {
                  const prevQuantity = updateProducts.reduce((acc, value) => {
                    acc = acc + (value.quantity as number);
                    return acc;
                  }, 0);

                  const updateQuantity =
                    prevQuantity - (currentUser.me.items as number);

                  cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      __typename: "Query",
                      me: {
                        ...currentUser?.me,
                        items:
                          updateQuantity > 0
                            ? (currentUser?.me.items as number) +
                              Math.abs(updateQuantity)
                            : (currentUser?.me.items as number) -
                              Math.abs(updateQuantity),
                      },
                    },
                  });
                }

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

  const params = {
    data: data,
    handleUpdate: handleUpdate,
    handleRemove: handleRemove,
    ...(setOpen && { setOpen: setOpen }),
  };

  if (loading) {
    return (
      <div>
        <Spinner></Spinner>
      </div>
    );
  }

  return <Fragment>{React.cloneElement(children, { ...params })}</Fragment>;
};
export default CartProduct;
