import React from "react";
import styles from "../../styles/Payment.module.scss";

interface PaymentProps {}

const Payment: React.FC<PaymentProps> = ({}) => {
  return (
    <div className={styles.container}>
      <h2
        style={{
          textAlign: "left",
          borderBottom: "1px solid grey",
          width: "70%",
          paddingLeft: "5px",
        }}
      >
        Paiement
      </h2>
    </div>
  );
};
export default Payment;
