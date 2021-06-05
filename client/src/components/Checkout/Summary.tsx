import { useEffect } from "react";
import { useGetBasketQuery } from "../../generated/graphql";
import SummaryList from "./SummaryList/SummaryList";
import styles from "../../styles/Summary.module.scss";
import Spinner from "../Spinner/Spinner";

interface SummaryProps {
  setMail: React.Dispatch<React.SetStateAction<string>>;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  delivery: boolean;
}

const Summary: React.FC<SummaryProps> = ({ setMail, delivery, setTotal }) => {
  const { data, loading } = useGetBasketQuery();

  const total = data?.getBasket.products.reduce(
    (acc, currentValue) =>
      acc + currentValue.variant.price * (currentValue.quantity as number),
    0
  );

  useEffect(() => {
    if (data && total) {
      setMail(data.getBasket.user.email);
      setTotal(total as number);
    }
  }, [data, total]);

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
              {total}
              &nbsp;€
            </div>
          </div>
          <div>
            <div>Livraison</div>
            {!delivery ? <div>Gratuit</div> : <div>6&nbsp;€</div>}
          </div>
          <div>
            <a
              href={"https://stripe.com/fr/pricing#pricing-details"}
              target="_blank"
              style={{ color: "#0066c0" }}
            >
              <div>Comission (1.4% + 0,25 €)</div>
            </a>
            {(((total as number) * 1.4) / 100 + 0.25).toFixed(2)}&nbsp;€
          </div>
        </div>
        <div className={styles.total}>
          <div>Total</div>
          <div>
            {delivery
              ? (
                  (total as number) +
                  6 +
                  ((total as number) * 1.4) / 100 +
                  0.25
                ).toFixed(2)
              : (
                  (total as number) +
                  ((total as number) * 1.4) / 100 +
                  0.25
                ).toFixed(2)}
            &nbsp;€
          </div>
        </div>
      </div>
    </div>
  );
};
export default Summary;
