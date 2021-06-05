import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import styles from "../../styles/Stripe.module.scss";
import Paypall from "../Paypall/Paypall";
import CheckoutClassic from "../Stripe/CheckoutClassic";
import Validation from "./Validation";

interface Info {
  firstname: string;
  name: string;
  adress: string;
  more: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
  email: string;
}

interface Shipping {
  free: boolean;
  paid: boolean;
}

interface PaymentProps {
  billingDetails: Info;
  shippingDetails: Shipping;
  total: string;
}

const stripePromise = loadStripe(
  "pk_test_51IiryrIpiEztyitUSEcaRiSOfJweI34Emi3nrCKYCbCamLH0JCopcyEFJXk7tg0nFbpvIOMjC9cu2z4fkXb8SWFs00Ll4znH1w"
);

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
  total,
}) => {
  const [hidePaypal, setPaypal] = useState(false);
  const [hideStripe, setStripe] = useState(false);

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
          {!hidePaypal && !hideStripe && (
            <div className={styles.PaypallWrapper}>
              <Paypall
                shippingDetails={shippingDetails}
                setStripe={setStripe}
                paymount={total}
              />
            </div>
          )}
          {hideStripe && !hidePaypal && <Validation></Validation>}
          {!hidePaypal && !hideStripe && <h2>Ou avec Stripe</h2>}
          {!hideStripe && (
            <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
              <CheckoutClassic
                setPaypal={setPaypal}
                total={total}
                billingDetails={billingDetails}
                shippingDetails={shippingDetails}
              ></CheckoutClassic>
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};
export default Payment;
