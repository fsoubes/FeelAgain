import React, { useEffect } from "react";
import styles from "../../styles/Delivery.module.scss";
import { Formik, Form } from "formik";
import { Box, Button, Checkbox, FormControlLabel } from "@material-ui/core";
import { useRouter } from "next/router";
import Link from "next/link";

interface Shipping {
  free: boolean;
  paid: boolean;
}

interface DeliveryProps {
  id: string;
  setStep: React.Dispatch<React.SetStateAction<string>>;
  adress: string;
  mail: string;
  city: string;
  zip: string;
  country: string;
  shipping: Shipping;
  setShipping: React.Dispatch<React.SetStateAction<Shipping>>;
}

const Delivery: React.FC<DeliveryProps> = ({
  id,
  setStep,
  mail,
  adress,
  zip,
  city,
  country,
  shipping,
  setShipping,
}) => {
  const router = useRouter();

  useEffect(() => {
    if (!adress) {
      router.push(`/checkouts/${id}?step=information`);
    }
  }, [adress]);

  return (
    <div className={styles.container}>
      <div>
        <h2
          style={{
            textAlign: "left",
            borderBottom: "1px solid grey",
            width: "70%",
            paddingLeft: "5px",
          }}
        >
          Coordonnées
        </h2>
        <div>
          <Box
            className={styles.contact}
            marginBottom={2}
            marginTop={2}
            display="flex"
            flexDirection="column"
          >
            <div className={styles.contact__details}>
              <div>Mail: {mail}</div>
              <Link href={`/checkouts/${id}?step=information`}>
                <div style={{ cursor: "pointer" }}>modifier</div>
              </Link>
            </div>
          </Box>
          <Box
            className={styles.contact}
            marginBottom={2}
            marginTop={2}
            display="flex"
            flexDirection="column"
          >
            <div className={styles.contact__details}>
              <div>
                Adresse: {adress},{zip} {city}, {country}
              </div>
              <Link href={`/checkouts/${id}?step=information`}>
                <div style={{ cursor: "pointer" }}>modifier</div>
              </Link>
            </div>
          </Box>
        </div>
      </div>
      <div>
        <h2
          style={{
            textAlign: "left",
            borderBottom: "1px solid grey",
            width: "70%",
            paddingLeft: "5px",
          }}
        >
          Choix d'expédition
        </h2>
        <Formik
          initialValues={{ ...shipping }}
          onSubmit={async (values, { setErrors }) => {
            try {
              if (!values.free && !values.paid) {
                setErrors({ free: "Error" });
                return;
              }

              const updated = "payment";
              router.push(
                {
                  pathname: router.pathname,
                  query: {
                    step: updated,
                    id,
                  },
                },
                `/checkouts/${id}?step=${updated}`,
                { shallow: true }
              );
              setStep("payment");
            } catch (err) {
              throw err;
            }
          }}
        >
          {({ isSubmitting, errors, setFieldValue, values }) => (
            <Form>
              <Box marginBottom={2} marginTop={2} display="flex">
                <FormControlLabel
                  className={styles.formControlLabel}
                  labelPlacement="start"
                  control={
                    <Checkbox
                      className={styles.checkBox}
                      checked={values.free}
                      onChange={(event) => {
                        setFieldValue("free", event.target.checked);
                        setShipping((prevState) => ({
                          ...prevState,
                          free: event.target.checked,
                        }));
                        if (event.target.checked) {
                          setFieldValue("paid", !event.target.checked);
                          setShipping((prevState) => ({
                            ...prevState,
                            paid: !event.target.checked,
                          }));
                        }
                      }}
                      name={"free"}
                    />
                  }
                  label={"Colissimo en point relais"}
                />
                <span>Gratuit</span>
              </Box>
              <Box marginBottom={2} marginTop={2} display="flex">
                <FormControlLabel
                  className={styles.formControlLabel}
                  labelPlacement="start"
                  control={
                    <Checkbox
                      className={styles.checkBox}
                      checked={values.paid}
                      onChange={(event) => {
                        setFieldValue("paid", event.target.checked);
                        setShipping((prevState) => ({
                          ...prevState,
                          paid: event.target.checked,
                        }));
                        if (event.target.checked) {
                          setFieldValue("free", !event.target.checked);
                          setShipping((prevState) => ({
                            ...prevState,
                            free: !event.target.checked,
                          }));
                        }
                      }}
                      name={"paid"}
                    />
                  }
                  label={"Colissimo domicile"}
                />
                <span>6,00&nbsp;€</span>
              </Box>
              {errors.paid || errors.free ? (
                <div
                  style={{
                    color: "red",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Vous devez choisir une méthode de livraison
                </div>
              ) : null}
              <Box marginBottom={2} marginTop={2}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Paiement
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default Delivery;
