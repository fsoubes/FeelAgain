import React from "react";
import { Layout } from "../../../components/Layout";
import { withApollo } from "../../../utils/withApollo";
import { NextPage } from "next";
import Timeline from "../../../components/Timeline/Timeline";
import { useGetOrderQuery } from "../../../generated/graphql";
import styles from "../../../styles/Order.module.scss";
import Spinner from "../../../components/Spinner/Spinner";
import Link from "next/link";

interface Props {
  id?: string;
}

const DetailOrder: NextPage<Props> = ({ id }) => {
  const { data, loading } = useGetOrderQuery({
    variables: { orderId: id as string },
  });

  return (
    <Layout>
      <div className="container__shop">
        <div className={styles.order__header}>
          <h1>{data?.getOrder.status}</h1>
          {data && (
            <div className={styles.order__images}>
              {loading && <Spinner></Spinner>}
              {data.getOrder.products.map((item, index) => {
                return (
                  <Link
                    href={`/products/${item.variant.shoes._id}`}
                    key={index}
                  >
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
                  </Link>
                );
              })}
            </div>
          )}
        </div>
        <div className={styles.main}>
          <Timeline timeline={data?.getOrder.timeline}></Timeline>
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

export default withApollo({ ssr: false })(DetailOrder);
