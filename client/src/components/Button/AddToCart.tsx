import styles from "../../styles/Product.module.scss";
import { Button } from "@material-ui/core";
import {
  useAddCartItemMutation,
  GetBasketQuery,
  GetBasketDocument,
  MeDocument,
  MeQuery,
  useGetBasketQuery,
} from "../../generated/graphql";
import { useApolloClient } from "@apollo/client";

interface AddToCartProps {
  setOpenCard: any;
  id: string;
}

const AddToCart: React.FC<AddToCartProps> = ({ setOpenCard, id }) => {
  const client = useApolloClient();
  const [addToCart] = useAddCartItemMutation();

  const { data } = useGetBasketQuery();

  const handleClick = async () => {
    try {
      await addToCart({
        variables: {
          variantId: id,
        },
        update: async (cache, { data }) => {
          const basket = client.readQuery<GetBasketQuery>({
            query: GetBasketDocument,
          });

          const currentUser = client.readQuery<MeQuery>({
            query: MeDocument,
          });

          if (basket?.getBasket && data?.addCartItem) {
            const isPresent = basket.getBasket.products.filter(
              (item) => item._id === data?.addCartItem._id
            );

            const updateData = basket.getBasket.products.map((item) =>
              item._id === data?.addCartItem._id
                ? { ...item, quantity: data.addCartItem?.quantity }
                : item
            );
            if (currentUser && currentUser.me)
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: {
                    ...currentUser?.me,
                    items: (currentUser?.me.items as number) + 1,
                  },
                },
              });

            cache.writeQuery<GetBasketQuery>({
              query: GetBasketDocument,
              data: {
                __typename: "Query",
                ...basket,
                getBasket: {
                  ...basket.getBasket,
                  products:
                    isPresent.length > 0
                      ? [...updateData]
                      : [data?.addCartItem, ...updateData],
                },
              },
            });
          }
        },
      });
      setOpenCard(true);
    } catch (err) {
      throw err;
    }
  };

  return (
    <Button className={styles.card} disableRipple onClick={() => handleClick()}>
      Ajouter au Panier
    </Button>
  );
};
export default AddToCart;
