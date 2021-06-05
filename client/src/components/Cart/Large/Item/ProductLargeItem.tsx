import styles from "../../../../styles/LargeProduct.module.scss";
import InputBasket from "../../../Input/InputBasket";

interface ProductLargeItemProps {
  title: string;
  src: string;
  price: number;
  contain: boolean;
  available: boolean;
  quantity: number;
  remove: any;
  update: (itemId: string, quantity: number) => void;
  id: string;
  size: string;
}

const ProductLargeItem: React.FC<ProductLargeItemProps> = ({
  title,
  price,
  src,
  contain,
  available,
  quantity,
  remove,
  size,
  update,
  id,
}) => {
  return (
    <div className={styles.product__row}>
      <div className={styles.cover}>
        <div
          className={styles.image}
          style={{
            backgroundImage: `url( ${src} )`,
            backgroundSize: contain ? "contain" : "cover",
          }}
        ></div>
      </div>
      <div className={styles.product}>
        <div className={styles.product__header}>
          <div className={styles.title}>{title}</div>
          <div className={styles.size}>Taille:&nbsp;{parseInt(size)}</div>
        </div>
        <div className={styles.product__bottom}>
          <div className={styles.status}>
            <span style={{ color: available ? "green" : "red" }}>
              {available ? `En stock` : `Stock insuffisant`}
            </span>
          </div>
          <div className={styles.action}>
            <span onClick={remove}>Supprimer</span>
            <span>|</span>
            <span>Mettre de côté</span>
          </div>
        </div>
      </div>
      <div className={styles.quantity}>
        <InputBasket update={update} id={id} quantity={quantity}></InputBasket>
      </div>
      <div className={styles.total}>{price * quantity},00€</div>
    </div>
  );
};
export default ProductLargeItem;
