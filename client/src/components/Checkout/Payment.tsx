import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import styles from "../../styles/Stripe.module.scss";
import CheckoutClassic from "../Stripe/CheckoutClassic";

interface Info {
  firstname: string;
  lastname: string;
  adress: string;
  more: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
  mail: string;
}

interface Shipping {
  free: boolean;
  paid: boolean;
}

interface PaymentProps {
  billingDetails: Info;
  shippingDetails: Shipping;
  mailDetail: string;
}

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
    },
  ],
  height: "30px",
};

const Payment: React.FC<PaymentProps> = ({
  billingDetails,
  shippingDetails,
  mailDetail,
}) => {
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
      <div className={styles.card}>
        <div className={styles.AppWrapper}>
          <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
            <CheckoutClassic
              billingDetails={billingDetails}
              shippingDetails={shippingDetails}
              mailDetail={mailDetail}
            ></CheckoutClassic>
          </Elements>
        </div>
      </div>
    </div>
  );
};
export default Payment;
