import React from "react";
import { Orders } from "../../generated/graphql";
import OrderItem from "./OrderItem/OrderItem";
import styles from "../../styles/OrderList.module.scss";
import { Button } from "@material-ui/core";
import Link from "next/link";

interface OrderListProps {
  data: Orders;
}

const OrderList: React.FC<OrderListProps> = ({ data }) => {
  console.log(data.status);

  const products = data.products.map((item) => {
    return (
      <OrderItem
        key={item._id}
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
      ></OrderItem>
    );
  });
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header__container}>
          <div className={styles.header__info}>
            <div className={styles.header__content}>
              <span style={{ fontWeight: "bold" }}>COMMANDE EFFECTUÉE LE</span>
              <span>
                {data.createdAt
                  .split("T")[0]
                  .split("-")
                  .reverse()
                  .join(" ")}
              </span>
            </div>
            <div className={styles.header__content}>
              <span style={{ fontWeight: "bold" }}>TOTAL</span>
              <span>EUR {data.total / 100}</span>
            </div>
            <div className={styles.header__content}>
              <span style={{ fontWeight: "bold" }}>LIVRAISON À</span>
              <span>
                {data.adress.line1} - {data.adress.city}
              </span>
            </div>
          </div>
          <div className={styles.header__command}>
            <div className={styles.header__content}>
              <span style={{ fontWeight: "bold" }}>N° DE COMMANDE</span>
              <span>{data._id}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.left__content}>
          <h2>{data.status}</h2>
          <ul>{products}</ul>
        </div>
        <div className={styles.action}>
          <Link href={`/order/follow/${data._id}`}>
            <Button>Suivre votre colis</Button>
          </Link>
          <Link href={`/order/cancel/${data._id}`}>
            <Button>Annulation</Button>
          </Link>
          <Link href={`/order/follow/${data._id}`}>
            <Button>Détails de la commande</Button>
          </Link>
          <Link href={`/order/comment/${data._id}`}>
            <Button>Poster un avis</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default OrderList;
