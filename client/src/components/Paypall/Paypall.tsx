import React from "react";
import { PayPalButton } from "react-paypal-button-v2";

interface PaypallProps {
  paymount: string;
  setStripe: React.Dispatch<React.SetStateAction<boolean>>;
}

const Paypall: React.FC<PaypallProps> = ({ paymount, setStripe }) => {
  const paymentHandler = (details: any, data: any) => {
    console.log(details, data);
    // Api CALL
    setStripe(true);
    alert("Transaction completed by " + details.payer.name.given_name);
  };

  const onError = (err: Function | undefined) => {
    // The main Paypal's script cannot be loaded or somethings block the loading of that script!
    console.log("Error!", err);
    // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
    // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
  };

  return (
    <PayPalButton
      amount={paymount}
      onSuccess={paymentHandler}
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

// sb-zhhwg6209401@business.example.com
