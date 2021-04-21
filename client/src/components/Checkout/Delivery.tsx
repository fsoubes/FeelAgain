import React from "react";
import styles from "../../styles/Delivery.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, Button } from "@material-ui/core";
import { useRouter } from "next/router";

interface DeliveryProps {
  id: string;
  setStep: React.Dispatch<React.SetStateAction<string>>;
}

const Delivery: React.FC<DeliveryProps> = ({ id, setStep }) => {
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
        Choix d'expédition
      </h2>
      <Formik
        initialValues={{ delivery: false }}
        onSubmit={async (values, { setErrors }) => {
          try {
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
        {({ isSubmitting, errors }) => (
          <Form>
            <Box
              marginBottom={2}
              marginTop={2}
              display="flex"
              flexDirection="column"
            >
              <label
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  cursor: "pointer",
                  justifyContent: "flex-end",
                }}
              >
                <Field
                  style={{ width: "inherit", cursor: "pointer" }}
                  type="checkbox"
                  name="is_published"
                />
                Rendre disponible ?
              </label>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Paiement
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default Delivery;
