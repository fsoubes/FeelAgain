import Link from "next/link";
import React from "react";
import styles from "../../../styles/OrderItem.module.scss";

interface OrderItemProps {
  title: string;
  src: string;
  quantity: number;
  size: string;
  contain: boolean;
  id: string;
}

const OrderItem: React.FC<OrderItemProps> = ({
  title,
  src,
  quantity,
  size,
  contain,
  id,
}) => {
  return (
    <li className={styles.item}>
      <Link href={`/products/${id}`}>
        <div
          className={styles.item__image}
          style={{
            backgroundImage: `url( ${src} )`,
            backgroundSize: contain ? "contain" : "cover",
          }}
        ></div>
      </Link>
      <div className={styles.item__info}>
        <Link href={`/products/${id}`}>
          <div className={styles.title}>
            {title}&nbsp;(x{quantity})
          </div>
        </Link>
        <div className={styles.size}>{size.split("/")[0]}</div>
      </div>
    </li>
  );
};
export default OrderItem;
