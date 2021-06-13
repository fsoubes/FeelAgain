import { PayPalButton } from "react-paypal-button-v2";
import { useAlert } from "react-alert";
import {
  DeliveryType,
  GetBasketDocument,
  GetBasketQuery,
  MeDocument,
  MeQuery,
  PaymentType,
  useAddPayPalPaymentMutation,
} from "../../generated/graphql";
import { useApolloClient } from "@apollo/client";
import { useState, useEffect } from "react";

interface PaypallProps {
  paymount: string;
  setStripe: React.Dispatch<React.SetStateAction<boolean>>;
  shippingDetails: Shipping;
}

interface Shipping {
  free: boolean;
  paid: boolean;
}

const Paypall: React.FC<PaypallProps> = ({
  paymount,
  setStripe,
  shippingDetails,
}) => {
  const alert = useAlert();
  const client = useApolloClient();

  const [paypalLoaded, setPaypalLoaded] = useState(false);

  const onError = async (err: Function | undefined) => {
    console.log("Error!", err);
  };

  const [payment] = useAddPayPalPaymentMutation();

  useEffect(() => {
    return () => {
      Object.keys(window).forEach((key) => {
        if (/paypal|zoid|post_robot/.test(key)) {
          delete window[key as any];
        }
      });

      document
        .querySelectorAll('script[src*="www.paypal.com/sdk"]')
        .forEach((node) => node.remove());
    };
  }, []);

  return (
    <>
      {!paypalLoaded && (
        <PayPalButton
          onButtonReady={() => {
            setTimeout(() => setPaypalLoaded(true), 1000);
          }}
          onError={onError}
          options={{
            clientId:
              "AS9TRywOaV8Ap8n06RkvKFrJX37SVDQPBkI0vv7da79OKfjrEkTx7WQe8nXLSTK2BXKoQSHgkQupdety",
            currency: "EUR",
            disableFunding: "card", // credit
          }}
        />
      )}
      {paypalLoaded ? (
        <>
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
            onApprove={async (data: any, actions: any) => {
              // Capture the funds from the transaction
              return actions.order.capture().then(async function(details: any) {
                // Show a success message to your buyer

                alert.success(`Nous vous remercions de votre commande. Un e-mail sera envoyé lorsque la
          commande aura été expédié. Vous pouvez suivre l'état de votre commande
          ou l'annuler (48h) en cliquant sur le boutton ci-dessous.`);

                // OPTIONAL: Call your server to save the transaction

                const paymentInfo = details.purchase_units[0];

                await payment({
                  variables: {
                    paypalId: details.id as string,
                    name: paymentInfo.shipping.name.full_name,
                    line1: paymentInfo.shipping.address.address_line_1,
                    city: paymentInfo.shipping.address.admin_area_1,
                    country: paymentInfo.shipping.address.admin_area_2,
                    postal_code: paymentInfo.shipping.address.postal_code,
                    email: paymentInfo.payee.email_address,
                    amount: paymount as string,
                    delivery: shippingDetails.free
                      ? ("Pickup" as DeliveryType)
                      : ("Home" as DeliveryType),
                    payment_method: "PayPal" as PaymentType,
                  },
                  update: (cache) => {
                    const basket = client.readQuery<GetBasketQuery>({
                      query: GetBasketDocument,
                    });

                    const currentUser = client.readQuery<MeQuery>({
                      query: MeDocument,
                    });

                    cache.evict({
                      // Often cache.evict will take an options.id property, but that's not necessary
                      // when evicting from the ROOT_QUERY object, as we're doing here.
                      fieldName: "products",
                      // No need to trigger a broadcast here, since writeQuery will take care of that.
                      broadcast: false,
                    });

                    if (basket?.getBasket && currentUser && currentUser.me) {
                      cache.writeQuery<GetBasketQuery>({
                        query: GetBasketDocument,
                        data: {
                          __typename: "Query",
                          ...basket,
                          getBasket: {
                            ...basket.getBasket,
                            products: [],
                          },
                        },
                      });

                      cache.writeQuery<MeQuery>({
                        query: MeDocument,
                        data: {
                          __typename: "Query",
                          me: {
                            ...currentUser?.me,
                            items: 0,
                          },
                        },
                      });
                    }
                  },
                });

                setStripe(true);

                return fetch("/paypal-transaction-complete", {
                  method: "post",
                  body: JSON.stringify({
                    orderID: data.orderID,
                  }),
                });
              });
            }}
            onError={onError}
            options={{
              clientId:
                "AS9TRywOaV8Ap8n06RkvKFrJX37SVDQPBkI0vv7da79OKfjrEkTx7WQe8nXLSTK2BXKoQSHgkQupdety",
              currency: "EUR",
              disableFunding: "card", // credit
            }}
          />
        </>
      ) : null}
    </>
  );
};
export default Paypall;
