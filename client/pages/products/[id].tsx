import React, { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { Layout } from "../../src/components/Layout";
import {
  useGetSingleShoesQuery,
  useGetClosestShoesQuery,
  Shoes,
  useAddCartItemMutation,
  GetBasketDocument,
  GetBasketQuery,
} from "../../src/generated/graphql";
import { withApollo } from "../../src/utils/withApollo";
import { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../../src/styles/Product.module.scss";
import { Button } from "@material-ui/core";
import Outside from "../../src/components/OutsideEvent/Outside";
import ProductListDash from "../../src/components/Dashboard/Product/ProductList";
import CartSideBar from "../../src/components/SideBar/CartSideBar";
import CartProduct from "../../src/components/Cart/CartProduct";
import BackDropShadow from "../../src/components/BackDrop/BackDropShadow";
import SelectSize from "../../src/components/Select/SelectSize";
import SelectRelative from "../../src/components/Select/SelectRelative";

interface Props {
  id?: string;
}

const getMarkdown = (innerHtml: any) => {
  return { __html: innerHtml };
};

const Article: NextPage<Props> = ({ id }) => {
  const router = useRouter();
  const client = useApolloClient();

  const { data } = useGetSingleShoesQuery({
    variables: { shoesId: id },
  });

  const { data: dataClosest } = useGetClosestShoesQuery({
    variables: {
      product: data?.getSingleShoe?.product_type as string,
      title: data?.getSingleShoe?.title as string,
    },
    skip: !data?.getSingleShoe.product_type,
  });

  const [addToCart] = useAddCartItemMutation();

  const [index, setIndex] = useState<number>(0);
  const [title, setTitle] = useState<string | undefined>(
    data?.getSingleShoe?.title as string
  );
  const [open, setOpen] = useState<Boolean>(false);
  const [openCard, setOpenCard] = useState<Boolean>(false);

  const handleChange = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    id: string,
    newTitle: string
  ) => {
    event?.preventDefault();
    router.push(`/products/${id}`);
    setTitle(newTitle);
    setOpen(false);
  };

  useEffect(() => {
    if (!id) {
      router.push("/404");
    }
  }, [id]);

  const handleClick = async () => {
    try {
      setTimeout(async () => {
        await addToCart({
          variables: {
            variantId: data?.getSingleShoe?.variants[index]._id as string,
          },
          update: (cache, { data }) => {
            const basket = client.readQuery<GetBasketQuery>({
              query: GetBasketDocument,
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
        setOpenCard(!openCard);
      }, 350);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    setTitle(data?.getSingleShoe.title);
  }, [data]);

  return (
    <Layout>
      {openCard && <BackDropShadow></BackDropShadow>}
      <Outside open={openCard} setOpen={setOpenCard}>
        <CartSideBar isOpen={openCard}>
          <CartProduct setOpen={setOpenCard} isOpen={openCard} />
        </CartSideBar>
      </Outside>
      <div className="container__shop">
        <div className={styles.main}>
          <div className={styles.images}>
            <img
              src={data?.getSingleShoe.images[0].src}
              alt="product image"
            ></img>
          </div>
          <div className={styles.content__container}>
            <div className={styles.content}>
              <div className={styles.header}>
                <h1>{data?.getSingleShoe.title}</h1>
              </div>
              <div className={styles.form}>
                <div className={styles.price}>
                  <h1 style={{ textAlign: "center", paddingTop: "1rem" }}>
                    {data?.getSingleShoe?.price}€
                  </h1>
                </div>
                {data && (
                  <SelectSize
                    sizes={data?.getSingleShoe?.size as number[]}
                    setIndex={setIndex}
                    variants={data?.getSingleShoe.variants}
                  ></SelectSize>
                )}
                {data?.getSingleShoe?.relatives &&
                  data?.getSingleShoe?.relatives?.length > 0 && (
                    <SelectRelative
                      title={data?.getSingleShoe?.title}
                      data={[
                        {
                          title: data?.getSingleShoe?.title,
                          _id: data?.getSingleShoe?._id,
                        },
                        ...data?.getSingleShoe?.relatives,
                      ]}
                    />
                  )}

                {data?.getSingleShoe.variants &&
                data?.getSingleShoe?.variants[index].quantity === 0 ? (
                  <Button disableRipple className={styles.nocard}>
                    Pointure non disponible
                  </Button>
                ) : (
                  <Button
                    onClick={handleClick}
                    disableRipple
                    className={styles.card}
                  >
                    Ajouter au Panier
                  </Button>
                )}
              </div>
              <div
                className={styles.description}
                dangerouslySetInnerHTML={getMarkdown(
                  data?.getSingleShoe.body_html
                )}
              />
            </div>
          </div>
        </div>
        <br />
        <div className={styles.neighbours}>
          <h1>Chaussures que vous pourriez aimer</h1>
          {dataClosest && dataClosest?.getClosestShoes && (
            <div>
              <ProductListDash
                isTilt={false}
                isProduct={true}
                shoes={dataClosest?.getClosestShoes as Shoes[]}
              ></ProductListDash>
            </div>
          )}
        </div>
      </div>
      <div className={styles.comments}>
        <h1>Commentaires client</h1>
      </div>
    </Layout>
  );
};

Article.getInitialProps = ({ query: { id } }) => {
  if (id?.length === 24) {
    return { id: id as string };
  } else {
    return { id: "" };
  }
};

export default withApollo({ ssr: true })(Article);
