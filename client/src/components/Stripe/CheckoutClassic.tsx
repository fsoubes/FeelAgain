import React, { useMemo, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import styles from "../../styles/Stripe.module.scss";
import {
  PaymentMethod,
  StripeCardElement,
  StripeCardElementChangeEvent,
  StripeCardElementOptions,
} from "@stripe/stripe-js";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import {
  DeliveryType,
  GetBasketDocument,
  GetBasketQuery,
  MeDocument,
  MeQuery,
  PaymentType,
  useAddPaymentMutation,
} from "../../generated/graphql";
import { Button } from "@material-ui/core";
import Link from "next/link";
import { useApolloClient } from "@apollo/client";

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          fontSmoothing: "antialiased",
          "::placeholder": {
            color: "#aab7c4",
          },
          ":-webkit-autofill": {
            color: "#fce883",
          },
          ":focus": {
            boxShadow: " 0 0 0 3px #4869ee3f",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    [fontSize]
  );

  return options;
};

interface CardFieldProps {
  onChange: any;
}

const CardField: React.FC<CardFieldProps> = ({ onChange }) => {
  const options = useOptions();

  return (
    <div className={styles.FormRow}>
      <CardElement
        className={`${styles.StripeElement} ${styles.StripeElement__webkit_autofill} ${styles.StripeElement__focus}`}
        options={options as StripeCardElementOptions}
        onChange={onChange}
      />
    </div>
  );
};

interface SubmitButtonProps {
  processing: boolean;
  disabled: boolean;
  children: string | string[];
  error:
    | {
        type: "validation_error";
        code: string;
        message: string;
      }
    | null
    | undefined;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  processing,
  disabled,
  error,
  children,
}) => (
  <button
    className={`${styles.SubmitButton} ${
      error ? `${styles.SubmitButton__error}` : ""
    }`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? "Processing..." : children}
  </button>
);

interface ErrorMessageProps {
  children: JSX.Element;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ children }) => (
  <div className={styles.ErrorMessage} role="alert">
    <svg width="16" height="16" viewBox="0 0 17 17">
      <path
        fill="#FFF"
        d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
      />
      <path
        fill="#6772e5"
        d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
      />
    </svg>
    {children}
  </div>
);

const ResetButton = ({ onClick }: any) => (
  <button type="button" className={styles.ResetButton} onClick={onClick}>
    <svg width="32px" height="32px" viewBox="0 0 32 32">
      <path
        fill="#FFF"
        d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
      />
    </svg>
  </button>
);

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

interface CheckoutClassicProps {
  billingDetails: Info;
  shippingDetails: Shipping;
  total: string;
  setPaypal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckoutClassic: React.FC<CheckoutClassicProps> = ({
  billingDetails,
  shippingDetails,
  total,
  setPaypal,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<any>(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null
  );
  const [payment] = useAddPaymentMutation();
  const client = useApolloClient();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    if (error) {
      const elementInfo = elements.getElement("card") as StripeCardElement;
      elementInfo.focus();
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }

    const {
      adress,
      country,
      city,
      zip,
      more,
      firstname,
      ...details
    } = billingDetails;

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement) as StripeCardElement,
      metadata: {
        shipping: shippingDetails.free
          ? "Point retrait"
          : "Colissimo à domicile",
        firstname: firstname,
      },
      billing_details: {
        address: {
          city: city,
          country: country ? "FR" : "FR",
          line1: adress,
          line2: more,
          postal_code: zip,
        },
        ...details,
        name: `${billingDetails.name} ${firstname}`,
      },
      // metadata: { firstname, ...shippingDetails },
    });

    await payment({
      variables: {
        stripeId: payload.paymentMethod?.id as string,
        ...payload.paymentMethod?.billing_details,
        ...payload.paymentMethod?.billing_details.address,
        amount: total as string,
        last_four: payload.paymentMethod?.card?.last4,
        delivery: shippingDetails.free
          ? ("Pickup" as DeliveryType)
          : ("Home" as DeliveryType),
        type: "Stripe" as PaymentType,
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

    setProcessing(false);
    setPaypal(true);

    if (payload.error) {
      setError(payload?.error);
    } else {
      setPaymentMethod(payload.paymentMethod as PaymentMethod);
    }
  };

  const reset = () => {
    setError(null);
    setProcessing(false);
    setPaymentMethod(null);
  };

  return paymentMethod ? (
    <div className={styles.Result}>
      <div className={styles.ResultTitle} role="alert">
        Paiement réussi
      </div>
      <div
        className={styles.ResultMessage}
        style={{ display: "flex", flexDirection: "column" }}
      >
        Nous vous remercions de votre commande. Un e-mail sera envoyé lorsque la
        commande aura été expédié. Vous pouvez suivre l'état de votre commande
        ou l'annuler (48h) en cliquant sur le boutton ci-dessous.
        <Link href="/order">
          <Button
            style={{
              background: "black",
              color: "white",
              padding: "5px",
              marginTop: "1rem",
            }}
          >
            Voir commande
          </Button>
        </Link>
      </div>
      <ResetButton onClick={reset} />
    </div>
  ) : (
    <form className={styles.Form} onSubmit={handleSubmit}>
      <fieldset className={styles.FormGroup}>
        <CardField
          onChange={(e: StripeCardElementChangeEvent) => {
            setError(e.error);
            setCardComplete(e.complete);
          }}
        />
      </fieldset>
      {error && <ErrorMessage>{error.message as any}</ErrorMessage>}
      <SubmitButton processing={processing} error={error} disabled={!stripe}>
        Payer {total}&nbsp;€
      </SubmitButton>
    </form>
  );
};

export default CheckoutClassic;
