import React from "react";
import { useGetBasketQuery } from "../../generated/graphql";
import SummaryList from "./SummaryList/SummaryList";
import styles from "../../styles/Summary.module.scss";
import Spinner from "../Spinner/Spinner";

interface SummaryProps {}

const Summary: React.FC<SummaryProps> = ({}) => {
  const { data, loading } = useGetBasketQuery();

  return (
    <div className={styles.container}>
      {loading && <Spinner></Spinner>}
      <h2
        style={{
          textAlign: "left",
          borderBottom: "1px solid grey",
          width: "70%",
          paddingLeft: "5px",
        }}
      >
        Recapitulatif de la commande
      </h2>
      {data && <SummaryList data={data}></SummaryList>}
      <div className={styles.summary__price}>
        <div className={styles.subtotal}>
          <div>
            <div>Sous-Total</div>
            <div>
              {data?.getBasket.products.reduce(
                (acc, currentValue) =>
                  acc +
                  currentValue.variant.price *
                    (currentValue.quantity as number),
                0
              )}
              &nbsp;€
            </div>
          </div>
          <div>
            <div>Livraison</div>
            <div>Gratuit</div>
          </div>
        </div>
        <div className={styles.total}>
          <div>Total</div>
          <div>
            {data?.getBasket.products.reduce(
              (acc, currentValue) =>
                acc +
                currentValue.variant.price * (currentValue.quantity as number),
              0
            )}
            &nbsp;€
          </div>
        </div>
      </div>
    </div>
  );
};
export default React.memo(Summary);
