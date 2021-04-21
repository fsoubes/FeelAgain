import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "../../styles/InfoCart.module.scss";
import { Box, Button } from "@material-ui/core";
import { useRouter } from "next/router";

interface Info {
  firstname: string;
  lastname: string;
  adress: string;
  more: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
}

interface InformationProps {
  id: string;
  setStep: React.Dispatch<React.SetStateAction<string>>;
  value: Info;
  setValue: React.Dispatch<React.SetStateAction<Info>>;
}

const Information: React.FC<InformationProps> = ({
  id,
  setStep,
  value,
  setValue,
}) => {
  const router = useRouter();

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
        Coordonnées
      </h2>
      <Formik
        initialValues={{
          ...value,
        }}
        onSubmit={async (values, { setErrors }) => {
          try {
            setValue(values);
            const updated = "delivery";
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
            setStep("delivery");
          } catch (err) {
            throw err;
          }
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <Box
              marginBottom={2}
              marginTop={2}
              display="flex"
              flexDirection="column"
            >
              <label>Prénom</label>
              <Field
                type="text"
                name="firstname"
                autoCapitalize="none"
                autoCorrect="off"
              ></Field>
              {errors.firstname && (
                <ErrorMessage name="firstname">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              )}
            </Box>
            <Box
              marginBottom={2}
              marginTop={2}
              display="flex"
              flexDirection="column"
            >
              <label>Nom</label>
              <Field
                type="text"
                name="email"
                autoCapitalize="none"
                autoCorrect="off"
              ></Field>
              {errors.lastname && (
                <ErrorMessage name="lastname">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              )}
            </Box>
            <Box
              marginBottom={2}
              marginTop={2}
              display="flex"
              flexDirection="column"
            >
              <label>Adresse</label>
              <Field
                type="text"
                name="adress"
                autoCapitalize="none"
                autoCorrect="off"
              ></Field>
              {errors.lastname && (
                <ErrorMessage name="adress">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              )}
            </Box>
            <Box
              marginBottom={2}
              marginTop={2}
              display="flex"
              flexDirection="column"
            >
              <label>Information Complémentaires</label>
              <Field
                type="text"
                name="more"
                autoCapitalize="none"
                autoCorrect="off"
              ></Field>
              {errors.lastname && (
                <ErrorMessage name="more">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              )}
            </Box>
            <Box
              marginBottom={2}
              marginTop={2}
              display="flex"
              flexDirection="column"
            >
              <label>Code Postale</label>
              <Field
                type="text"
                name="zip"
                autoCapitalize="none"
                autoCorrect="off"
              ></Field>
              {errors.lastname && (
                <ErrorMessage name="lastname">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              )}
            </Box>
            <Box
              marginBottom={2}
              marginTop={2}
              display="flex"
              flexDirection="column"
            >
              <label>Ville</label>
              <Field
                type="text"
                name="city"
                autoCapitalize="none"
                autoCorrect="off"
              ></Field>
              {errors.lastname && (
                <ErrorMessage name="city">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              )}
            </Box>
            <Box
              marginBottom={2}
              marginTop={2}
              display="flex"
              flexDirection="column"
            >
              <label>Pays</label>
              <Field
                type="text"
                name="country"
                autoCapitalize="none"
                autoCorrect="off"
              ></Field>
              {errors.lastname && (
                <ErrorMessage name="country">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              )}
            </Box>
            <Box
              marginBottom={2}
              marginTop={2}
              display="flex"
              flexDirection="column"
            >
              <label>Télephone</label>
              <Field
                type="text"
                name="phone"
                autoCapitalize="none"
                autoCorrect="off"
              ></Field>
              {errors.lastname && (
                <ErrorMessage name="phone">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              )}
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Choix de l'expedition
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default Information;
