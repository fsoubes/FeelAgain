import React from "react";
import { Layout } from "../../../components/Layout";
import { withApollo } from "../../../utils/withApollo";
import { NextPage } from "next";
import styles from "../../../styles/OrderList.module.scss";
import { useGetOrderQuery } from "../../../generated/graphql";
import { Button } from "@material-ui/core";
import { useRouter } from "next/router";
import OrderItem from "../../../components/Order/OrderItem/OrderItem";
import Link from "next/link";

interface Props {
  id?: string;
}

const DetailOrder: NextPage<Props> = ({ id }) => {
  const router = useRouter();
  const { data } = useGetOrderQuery({
    variables: { orderId: id as string },
    skip: !id,
  });

  const total = data?.getOrder.products.reduce(
    (acc, currentValue) =>
      acc + currentValue.variant.price * (currentValue.quantity as number),
    0
  );

  const comission = ((total as number) * (1.4 / 100) + 0.25).toFixed(2);

  const products = data?.getOrder.products.map((item, index) => {
    return (
      <OrderItem
        key={index}
        src={
          item.variant.shoes.vendor === "Anaki"
            ? item.variant.shoes.images[1].src
            : item.variant.shoes.images[0].src
        }
        size={item.variant.title}
        title={item.variant.shoes.title}
        contain={item.variant.shoes.vendor === "Anaki"}
        quantity={item.quantity as number}
        id={item.variant.shoes._id}
        price={item.variant.price}
        vendor={item.variant.shoes.vendor}
        detail={true}
      ></OrderItem>
    );
  });

  return (
    <Layout>
      <div className="container__order">
        <h1 style={{ marginBottom: "1rem" }}>Détails de la commande</h1>
        <div
          style={{
            padding: "5px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <span style={{ paddingRight: "0.5rem" }}>
              Commandé le&nbsp;
              {data?.getOrder.createdAt
                .split("T")[0]
                .split("-")
                .reverse()
                .join(" ")}
            </span>
            <span>|</span>
            <span style={{ paddingLeft: "0.5rem" }}>
              N° de commande :&nbsp;
            </span>
            <span>{data?.getOrder._id}</span>
          </div>
          <span style={{ color: "#0066c0" }}>Facture</span>
        </div>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.header__container}>
              <div className={styles.header__info}>
                <div className={styles.header__content}>
                  <span style={{ fontWeight: "bold" }}>
                    Adresse de livraison
                  </span>
                  <span>{data?.getOrder.adress.name?.toUpperCase()}</span>
                  <span>{data?.getOrder.adress.line1}</span>
                  {data?.getOrder.adress.line2 && (
                    <span>{data?.getOrder.adress.line2}</span>
                  )}
                  <span>
                    {data?.getOrder.adress.city},&nbsp;
                    {data?.getOrder.adress.postal_code}
                  </span>
                  <span>{data?.getOrder.adress.country?.toUpperCase()}</span>
                </div>
                <div className={styles.header__content}>
                  <span style={{ fontWeight: "bold" }}>Mode de paiement</span>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      height="24"
                      width="28"
                      src="https://www.amazon.fr/images/G/08/checkout/payselect/card-logos-small/visa._CB658924195_.gif"
                    ></img>
                    <span>
                      {data?.getOrder.payment_method === "Stripe"
                        ? `**** ${data?.getOrder.last_four}`
                        : "Paypal"}
                    </span>
                  </div>
                </div>
                <div className={styles.header__content}>
                  <span style={{ fontWeight: "bold" }}>Mode de livraison</span>
                  <span>
                    Colissimo/
                    {data?.getOrder.adress.delivery === "Pickup"
                      ? "Point relais"
                      : "Livraison avec signature"}
                  </span>
                </div>
              </div>
              <div className={styles.header__command_recap}>
                <div className={styles.header__content}>
                  <span style={{ fontWeight: "bold" }}>
                    Récapitulatif de commande
                  </span>
                  <div className={styles.header__command_recap}>
                    <span>Articles:</span>
                    <span>EUR&nbsp;{total},00</span>
                  </div>
                  <div className={styles.header__command_recap}>
                    <span>Livraison:</span>
                    <span>EUR&nbsp;0.00</span>
                  </div>
                  <div className={styles.header__command_recap}>
                    <span>Montant HT:</span>
                    <span>EUR&nbsp;{total},00</span>
                  </div>
                  <div className={styles.header__command_recap}>
                    <span>Comission (1.4% + 0,25 €):</span>
                    <span>
                      EUR&nbsp;{comission.toString().replace(".", ",")}
                    </span>
                  </div>
                  <div className={styles.header__command_recap}>
                    <span>Total:</span>
                    <span>
                      EUR&nbsp;
                      {`${((data?.getOrder.total as number) / 100)
                        .toString()
                        .replace(".", ",")}`}
                    </span>
                  </div>
                  <div className={styles.header__command_recap}>
                    <span style={{ fontWeight: "bold" }}>
                      Montant total TTC:
                    </span>
                    <span>
                      EUR&nbsp;
                      {`${((data?.getOrder.total as number) / 100)
                        .toString()
                        .replace(".", ",")}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.left__content}>
              <h2>{data?.getOrder.status}</h2>
              {data && <ul>{products}</ul>}
            </div>
            <div className={styles.action}>
              <Link href={`/order/follow/${data?.getOrder._id}`}>
                <Button>Suivre votre colis</Button>
              </Link>
              <Link href={`/order/follow/${data?.getOrder._id}`}>
                <Button>Changer le mode de paiement</Button>
              </Link>
              {data?.getOrder.status !== "Votre colis a été retiré" && (
                <Link href={`/order/cancel/${data?.getOrder._id}`}>
                  <Button>Annulation</Button>
                </Link>
              )}
              {data?.getOrder.status !== "Votre colis a été retiré" && (
                <Button
                  onClick={() => {
                    if (data?.getOrder.products.length === 1) {
                      router.push({
                        pathname: `/order/comment/${data?.getOrder.products[0].variant.shoes._id}`,
                        query: { item: data?.getOrder.products[0]._id },
                      });
                    } else {
                      router.push("/order/comments");
                    }
                  }}
                >
                  Poster un avis
                </Button>
              )}
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
