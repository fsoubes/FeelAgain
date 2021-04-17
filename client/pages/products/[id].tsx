import React, { useEffect, useState } from "react";
import { Layout } from "../../src/components/Layout";
import {
  useGetSingleShoesQuery,
  useGetClosestShoesQuery,
  Shoes,
} from "../../src/generated/graphql";
import { withApollo } from "../../src/utils/withApollo";
import { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../../src/styles/Product.module.scss";
import { Button } from "@material-ui/core";
import Outside from "../../src/components/OutsideEvent/Outside";
import ProductListDash from "../../src/components/Dashboard/Product/ProductList";

interface Props {
  id?: string;
}

const getMarkdown = (innerHtml: any) => {
  return { __html: innerHtml };
};

const Article: NextPage<Props> = ({ id }) => {
  const router = useRouter();

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

  const [size, setSize] = useState<number>(36);
  const [index, setIndex] = useState<number>(0);
  const [title, setTitle] = useState<string | undefined>(
    data?.getSingleShoe?.title as string
  );
  const [open, setOpen] = useState<Boolean>(false);
  const [openSize, setOpenSize] = useState<Boolean>(false);
  const [openCard, setOpenCard] = useState<Boolean>(false);

  useEffect(() => {
    if (!id) {
      router.push("/404");
    }
  }, [id]);

  useEffect(() => {
    setTitle(data?.getSingleShoe.title);
  }, [data]);

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

  return (
    <Layout>
      <div
        className={
          openCard ? `${styles.cart} ${styles.open}` : `${styles.cart}`
        }
      ></div>

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

                <div
                  className={styles.size}
                  style={{ zIndex: 50 }}
                  onClick={() => setOpenSize(!openSize)}
                >
                  <Outside open={openSize} setOpen={setOpenSize}>
                    <ul>
                      <div
                        className={styles.current}
                        style={{ padding: "10px" }}
                      >
                        {size}
                      </div>
                      {data?.getSingleShoe?.size.map((item, index) => {
                        return (
                          <li
                            onClick={() => {
                              setSize(item);
                              setIndex(index);
                            }}
                            key={item}
                            className={
                              openSize
                                ? `${styles.item__size} ${
                                    data.getSingleShoe.variants[index]
                                      .quantity === 0
                                      ? styles.notavailable
                                      : styles.show
                                  }`
                                : `${styles.item__size} ${styles.hidden}`
                            }
                          >
                            {item}
                          </li>
                        );
                      })}
                    </ul>
                  </Outside>
                </div>

                {data?.getSingleShoe?.relatives &&
                  data?.getSingleShoe?.relatives?.length > 0 && (
                    <div
                      style={{ zIndex: 49 }}
                      className={styles.size}
                      onClick={() => setOpen(!open)}
                    >
                      <Outside open={open} setOpen={setOpen}>
                        <ul>
                          {[
                            {
                              title: data?.getSingleShoe?.title,
                              _id: data?.getSingleShoe?._id,
                            },
                            ...data?.getSingleShoe?.relatives,
                          ].map((item, index) => {
                            return (
                              <li
                                key={item._id}
                                onClick={(event) =>
                                  handleChange(event, item._id, item.title)
                                }
                                className={
                                  item.title === title || open
                                    ? `${styles.item__relatives} ${
                                        index === 0
                                          ? styles.current
                                          : styles.show
                                      }`
                                    : `${styles.item__relatives} ${styles.hidden}`
                                }
                              >
                                {item.title}
                              </li>
                            );
                          })}
                        </ul>
                      </Outside>
                    </div>
                  )}
                {data?.getSingleShoe.variants &&
                data?.getSingleShoe?.variants[index].quantity === 0 ? (
                  <Button disableRipple className={styles.nocard}>
                    Pointure non disponible
                  </Button>
                ) : (
                  <Button
                    onClick={() => setOpenCard(!openCard)}
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
