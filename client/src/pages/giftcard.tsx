import { Layout } from "../components/Layout";
import { useRef, useState } from "react";
import { withApollo } from "../utils/withApollo";
import styles from "../styles/Contact.module.scss";
import { Button } from "@material-ui/core";
import Head from "../components/SEO/Head";
import SelectSize from "../components/Select/SelectSize";
import {
  GetBasketDocument,
  GetBasketQuery,
  Maybe,
  MeDocument,
  MeQuery,
  RangeGift,
  useAddGiftCardItemMutation,
  useGetBasketQuery,
} from "../generated/graphql";
import { useApolloClient } from "@apollo/client";

interface GiftcardProps {}

const Giftcard: React.FC<GiftcardProps> = ({}) => {
  const price = [25, 50, 75, 100, 125, 150, 175, 200];

  const [index, setIndex] = useState<number>(0);
  const mailRef = useRef<HTMLInputElement>();
  const nameRef = useRef<HTMLInputElement>();
  const commentRef = useRef<HTMLTextAreaElement>();
  const client = useApolloClient();
  const [addGiftCard] = useAddGiftCardItemMutation();

  useGetBasketQuery();

  return (
    <Layout>
      <Head
        title={"Carte cadeau"}
        description={`Carde cadeau à offrir à vos proches`}
      />
      <section className={styles.section__4}>
        <div className={styles.shape__3} />
        <div className={`${styles.sheet__whyus}`}>
          <div className={styles.container}>
            <div className={styles.content}>
              <h2>Carte cadeau</h2>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();

                  try {
                    if (
                      !nameRef?.current?.value ||
                      !mailRef?.current?.value ||
                      !commentRef?.current?.value
                    ) {
                      return;
                    }

                    await addGiftCard({
                      variables: {
                        from: nameRef?.current?.value as string,
                        to: mailRef?.current?.value as string,
                        message: commentRef?.current?.value as string,
                        price: `card_${price[index]}` as Maybe<RangeGift>,
                      },
                      update: async (cache, { data }) => {
                        const basket = client.readQuery<GetBasketQuery>({
                          query: GetBasketDocument,
                        });

                        const currentUser = client.readQuery<MeQuery>({
                          query: MeDocument,
                        });

                        if (basket?.getBasket && data?.addGiftCardItem) {
                          const isPresent = basket.getBasket.products.filter(
                            (item) => item._id === data?.addGiftCardItem._id
                          );

                          const updateData = basket.getBasket.products.map(
                            (item) =>
                              item._id === data?.addGiftCardItem._id
                                ? {
                                    ...item,
                                    quantity: data.addGiftCardItem?.quantity,
                                  }
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
                                /* products:
                                  isPresent.length > 0
                                    ? [...updateData]
                                    : [data?.addGiftCardItem, ...updateData], */
                              },
                            },
                          });
                        }
                      },
                    });
                    (commentRef.current as HTMLTextAreaElement).value = "";
                    (mailRef.current as HTMLInputElement).value = "";
                    (nameRef.current as HTMLInputElement).value = "";
                    setIndex(0);
                  } catch (err) {
                    throw err;
                  }
                }}
              >
                <label htmlFor="price" style={{ display: "none" }}>
                  Price
                </label>
                <SelectSize
                  gift={true}
                  sizes={price}
                  setIndex={setIndex}
                  variants={[]}
                ></SelectSize>
                <label htmlFor="name" style={{ display: "none" }}>
                  Email
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder={"Nom du bénéficiaire..."}
                  ref={nameRef as React.LegacyRef<HTMLInputElement>}
                ></input>
                <label htmlFor="mail" style={{ display: "none" }}>
                  Nom
                </label>
                <input
                  id="mail"
                  name="mail"
                  type="email"
                  ref={mailRef as React.LegacyRef<HTMLInputElement>}
                  required
                  placeholder={"Votre mail ..."}
                ></input>
                <label htmlFor="comment" style={{ display: "none" }}>
                  Commentaire
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  ref={commentRef as React.LegacyRef<HTMLTextAreaElement>}
                  rows={6}
                  placeholder={"Votre message au bénéficiaire..."}
                  required
                  maxLength={60000}
                ></textarea>
                <Button name="submit" type="submit" disableRipple>
                  Ajouter au panier
                </Button>
              </form>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem
                magni dolorum reprehenderit pariatur et maiores a aperiam
                officiis tempora saepe minus ?
              </p>
            </div>
            <div className={styles.content__50_gift} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Giftcard);
