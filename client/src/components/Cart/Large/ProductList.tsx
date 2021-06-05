import ProductLargeItem from "./Item/ProductLargeItem";
import { GetBasketQuery } from "../../../generated/graphql";
import styles from "../../../styles/LargeProduct.module.scss";

interface ProductListProps {
  data: GetBasketQuery;
  remove: (itemId: string, BasketId: string, quantity: number) => void;
  update: (itemId: string, quantity: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ data, remove, update }) => {
  const largeItem = data.getBasket.products.map((item) => {
    return (
      <ProductLargeItem
        key={item._id}
        src={
          item.variant.shoes.vendor === "Anaki"
            ? item.variant.shoes.images[1].src
            : item.variant.shoes.images[0].src
        }
        id={item._id}
        size={item.variant.title}
        title={item.variant.shoes.title}
        price={item.variant.price}
        contain={item.variant.shoes.vendor === "Anaki"}
        available={(item.quantity as number) <= item.variant.quantity}
        quantity={item.quantity as number}
        remove={() =>
          remove(item._id, data.getBasket?._id, item.quantity as number)
        }
        update={update}
      />
    );
  });

  return (
    <div>
      {largeItem}
      <div className={styles.head__total}>
        <div className={styles.cover}></div>
        <div className={styles.product}></div>
        <div className={styles.quantity}></div>
        <div className={styles.total}>
          <div>SOUS-TOTAL</div>
          <div>
            (
            {data &&
              data?.getBasket.products.reduce(
                (acc, currentValue) => acc + (currentValue.quantity as number),
                0
              )}
            &nbsp;Articles)
          </div>
        </div>
      </div>
      <div className={styles.head__total}>
        <div className={styles.cover}></div>
        <div className={styles.product}></div>
        <div className={styles.quantity}></div>
        <div className={styles.total}>
          <div>
            {data &&
              data?.getBasket.products.reduce(
                (acc, currentValue) =>
                  acc +
                  currentValue.variant.price *
                    (currentValue.quantity as number),
                0
              )}
            ,00€
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductList;
