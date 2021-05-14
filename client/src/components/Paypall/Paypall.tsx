import React from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useAlert } from "react-alert";

interface PaypallProps {
  paymount: string;
  setStripe: React.Dispatch<React.SetStateAction<boolean>>;
}

const Paypall: React.FC<PaypallProps> = ({ paymount, setStripe }) => {
  const alert = useAlert();

  const paymentHandler = (details: any, data: any) => {
    console.log(details, data);
    // Api CALL
    setStripe(true);
  };

  const onError = async (err: Function | undefined) => {
    console.log("Error!", err);
  };

  return (
    <PayPalButton
      createOrder={(data: any, actions: any) => {
        return actions.order.create({
          description: "Achat de chaussures FeelAgain",
          purchase_units: [
            {
              amount: {
                currency_code: "EUR",
                value: paymount,
              },
            },
          ],
        });
      }}
      onApprove={(data: any, actions: any) => {
        // Capture the funds from the transaction
        return actions.order.capture().then(function(details: any) {
          // Show a success message to your buyer

          alert.show(`Nous vous remercions de votre commande. Un e-mail sera envoyé lorsque la
          commande aura été expédié. Vous pouvez suivre l'état de votre commande
          ou l'annuler (48h) en cliquant sur le boutton ci-dessous.`);
          console.log(details);
          // OPTIONAL: Call your server to save the transaction
          setStripe(true);
          return fetch("/paypal-transaction-complete", {
            method: "post",
            body: JSON.stringify({
              orderID: data.orderID,
            }),
          });
        });
      }}
      //   onSuccess={paymentHandler}
      amount={paymount}
      onError={onError}
      currency="EUR"
      options={{
        clientId:
          "AS9TRywOaV8Ap8n06RkvKFrJX37SVDQPBkI0vv7da79OKfjrEkTx7WQe8nXLSTK2BXKoQSHgkQupdety",
        currency: "EUR",
      }}
    />
  );
};
export default Paypall;
