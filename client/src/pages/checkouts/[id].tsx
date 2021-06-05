import { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../../styles/Checkout.module.scss";
import { withApollo } from "../../utils/withApollo";
import Summary from "../../components/Checkout/Summary";
import Information from "../../components/Checkout/Information";
import Delivery from "../../components/Checkout/Delivery";
import Payment from "../../components/Checkout/Payment";

interface Props {
  step?: string;
  id?: string;
}
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

const CheckOut: NextPage<Props> = ({ step, id }) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<string>(step as string);
  const [mail, setMail] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [values, setValue] = useState<Info>({
    email: "",
    firstname: "Robert",
    name: "Hue",
    adress: "1 rue d'evry",
    more: "5ème étage",
    zip: "93000",
    city: "Paris",
    country: "France",
    phone: "0559921201",
  });

  /*  const [values, setValue] = useState<Info>({
    email: "",
    firstname: "",
    name: "",
    adress: "",
    more: "",
    zip: "",
    city: "",
    country: "",
    phone: "",
  }); */

  const [shipping, setShipping] = useState<Shipping>({
    free: true,
    paid: false,
  });

  useEffect(() => {
    if (router.query.step !== currentStep) {
      setCurrentStep(router.query.step as string);
    }
  });

  return (
    <div className="container__shop" style={{ marginTop: "1rem" }}>
      <div className={styles.header}>
        <h1>Passer la commande </h1>
        <h3>(2 Articles)</h3>
      </div>
      <div className={styles.content}>
        <Summary
          setMail={setMail}
          delivery={shipping.paid}
          setTotal={setTotal}
        />
        {currentStep === "information" && (
          <Information
            id={id as string}
            setStep={setCurrentStep}
            value={values}
            setValue={setValue}
          ></Information>
        )}
        {currentStep === "delivery" && (
          <Delivery
            setShipping={setShipping}
            shipping={shipping}
            zip={values.zip}
            adress={values.adress}
            city={values.city}
            country={values.country}
            id={id as string}
            setStep={setCurrentStep}
            mail={mail}
          ></Delivery>
        )}
        {currentStep === "payment" && (
          <Payment
            billingDetails={{ ...values, email: mail }}
            shippingDetails={shipping}
            total={
              shipping.paid
                ? (
                    (total as number) +
                    ((total as number) * 1.4) / 100 +
                    0.25
                  ).toFixed(2) + 6
                : ((total as number) + ((total as number) * 1.4) / 100 + 0.25)
                    .toFixed(2)
                    .toString()
            }
          ></Payment>
        )}
      </div>
    </div>
  );
};

CheckOut.getInitialProps = ({ query: { id, step } }) => {
  return { id: id as string, step: step as string };
};

export default withApollo({ ssr: true })(CheckOut);
