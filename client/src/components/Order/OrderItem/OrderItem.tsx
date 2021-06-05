import Link from "next/link";
import styles from "../../../styles/OrderItem.module.scss";

interface OrderItemProps {
  title: string;
  src: string;
  quantity: number;
  size: string;
  contain: boolean;
  id: string;
  detail: boolean;
  vendor?: string;
  price?: number;
}

const OrderItem: React.FC<OrderItemProps> = ({
  title,
  src,
  quantity,
  size,
  contain,
  id,
  detail,
  vendor,
  price,
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
        <div className={styles.size}>
          <strong>Pointure: &nbsp;</strong>
          {size.split("/")[0]}
        </div>
        {detail && (
          <div className={styles.size}>
            <strong>Vendu par: &nbsp;</strong>
            {vendor}
          </div>
        )}
        {detail && (
          <div className={styles.size} style={{ color: "#B12704" }}>
            EUR &nbsp;
            {price}
          </div>
        )}
      </div>
    </li>
  );
};
export default OrderItem;
