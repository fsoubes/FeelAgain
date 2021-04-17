import { Button } from "@material-ui/core";
import Link from "next/link";
import React from "react";
import { useGetBasketQuery } from "../../generated/graphql";
import styles from "../../styles/CartProduct.module.scss";

interface CartProductProps {
  isOpen: Boolean;
  setOpen: React.Dispatch<React.SetStateAction<Boolean>>;
}

const CartProduct: React.FC<CartProductProps> = ({ isOpen, setOpen }) => {
  const { data } = useGetBasketQuery({
    skip: !isOpen,
  });

  return (
    <div>
      <div className={styles.header}>
        <h1>Panier</h1>
        <div className={styles.close}>
          Fermer
          <Button onClick={() => setOpen(false)}>X</Button>
        </div>
      </div>
      <div className={styles.content}>
        {data?.getBasket?.products && data?.getBasket?.products?.length > 0 && (
          <ul>
            {data?.getBasket.products.map((item, index) => {
              return (
                <li style={{ padding: "10px" }} key={index}>
                  {item.variant.shoes.title}
                </li>
              );
            })}
          </ul>
        )}
        <p>
          <strong>SOUS-TOTAL:</strong>
          <span>370,00€</span>
        </p>
        <div className={styles.routing}>
          <Link href={"/panier"}>
            <Button disableRipple>VOIR LE PANIER</Button>
          </Link>
          <Link href={"/paiement/id"}>
            <Button disableRipple>PAIEMENT</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default CartProduct;
