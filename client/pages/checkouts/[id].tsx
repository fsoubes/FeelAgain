import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../../src/styles/Checkout.module.scss";
import { withApollo } from "../../src/utils/withApollo";
import Summary from "../../src/components/Checkout/Summary";
import Information from "../../src/components/Checkout/Information";
import Delivery from "../../src/components/Checkout/Delivery";
import Payment from "../../src/components/Checkout/Payment";

interface Props {
  step?: string;
  id?: string;
}
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

const CheckOut: NextPage<Props> = ({ step, id }) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<string>(step as string);
  const [mail, setMail] = useState<string>("");
  const [values, setValue] = useState<Info>({
    mail: "",
    firstname: "",
    lastname: "",
    adress: "",
    more: "",
    zip: "",
    city: "",
    country: "",
    phone: "",
  });

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
        <Summary setMail={setMail} delivery={shipping.paid} />
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
            billingDetails={values}
            shippingDetails={shipping}
            mailDetail={mail}
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
