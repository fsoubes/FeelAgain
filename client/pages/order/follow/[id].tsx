import React from "react";
import { Layout } from "../../../src/components/Layout";
import { withApollo } from "../../../src/utils/withApollo";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Timeline from "../../../src/components/Timeline/Timeline";
import { useGetOrderQuery } from "../../../src/generated/graphql";
import styles from "../../../src/styles/Order.module.scss";

interface Props {
  id?: string;
}

const DetailOrder: NextPage<Props> = ({ id }) => {
  const router = useRouter();

  const { data } = useGetOrderQuery({ variables: { orderId: id as string } });

  return (
    <Layout>
      <div className="container__shop">
        <div className={styles.order__header}>
          <h1>Livraison prévue 23 juin</h1>
          {data && (
            <div className={styles.order__images}>
              {data.getOrder.products.map((item) => {
                return (
                  <div
                    className={styles.order__image}
                    style={{
                      backgroundImage: `url(${
                        item.variant.shoes.vendor === "Anaki"
                          ? item.variant.shoes.images[1].src
                          : item.variant.shoes.images[0].src
                      })`,
                      backgroundSize:
                        item.variant.shoes.vendor === "Anaki"
                          ? "contain"
                          : "cover",
                    }}
                  ></div>
                );
              })}
            </div>
          )}
        </div>
        <div className={styles.main}>
          <Timeline></Timeline>
          <div className={styles.main__info}>
            <div className={styles.card__container}>
              <h1>Adress de livraison</h1>
              {data && (
                <div
                  className={styles.card__content}
                  style={{ width: "300px" }}
                >
                  <p>{data.getOrder.adress.name?.toUpperCase()}</p>
                  <p>{data.getOrder.adress.line1}</p>
                  <p>
                    {data.getOrder.adress.city},&nbsp;
                    {data.getOrder.adress.postal_code}
                  </p>
                </div>
              )}
            </div>
            <div className={styles.card__container}>
              <h1>Informations sur la commande</h1>
              <div className={styles.card__content}>
                <a>Modifier cette commande</a>
                <a>Annuler la commande</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

DetailOrder.getInitialProps = ({ query: { id } }) => {
  if (id?.length === 24) {
    return { id: id as string };
  } else {
    return { id: "" };
  }
};

export default withApollo({ ssr: true })(DetailOrder);
