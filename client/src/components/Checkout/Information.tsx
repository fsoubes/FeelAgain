import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "../../styles/InfoCart.module.scss";
import { Box, Button } from "@material-ui/core";
import { useRouter } from "next/router";
import * as Yup from "yup";

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

interface InformationProps {
  id: string;
  setStep: React.Dispatch<React.SetStateAction<string>>;
  value: Info;
  setValue: React.Dispatch<React.SetStateAction<Info>>;
}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

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
        validationSchema={Yup.object({
          firstname: Yup.string()
            .max(15, "Doit être de 20 caractères ou moins")
            .required("Vous devez remplir les champs requis"),
          name: Yup.string()
            .max(20, "Doit être de 20 caractères ou moins")
            .required("Vous devez remplir les champs requis"),
          zip: Yup.string()
            .max(5, "Le code postale n'est pas valide")
            .min(5, "Le code postale n'est pas valide")
            .required("Vous devez remplir les champs requis"),
          phone: Yup.string()
            .max(10, "Le numéro de téléphone n'est pas valide")
            .min(10, "Le numéro de téléphone n'est pas valide")
            .matches(phoneRegExp, "Le numéro de téléphone n'est pas valide")
            .required("Vous devez remplir les champs requis"),
        })}
        onSubmit={async (values) => {
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
                autoFocus
                type="text"
                name="firstname"
                autoCapitalize="none"
                autoCorrect="off"
                placeholder="Robert"
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
                name="name"
                autoCapitalize="none"
                autoCorrect="off"
                placeholder="Dupont"
              ></Field>
              {errors.name && (
                <ErrorMessage name="name">
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
                placeholder="1 rue d'evry"
              ></Field>
              {errors.adress && (
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
              <label>Information Complémentaires (facultatif)</label>
              <Field
                type="text"
                name="more"
                autoCapitalize="none"
                autoCorrect="off"
                placeholder="5ème étage ..."
              ></Field>
            </Box>
            <Box
              marginBottom={2}
              marginTop={2}
              display="flex"
              flexDirection="column"
            >
              <label>Code Postal</label>
              <Field
                type="text"
                name="zip"
                autoCapitalize="none"
                autoCorrect="off"
                placeholder="91000"
              ></Field>
              {errors.zip && (
                <ErrorMessage name="zip">
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
                placeholder="Evry"
              ></Field>
              {errors.city && (
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
                placeholder="France"
              ></Field>
              {errors.country && (
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
                placeholder="0122284866"
              ></Field>
              {errors.phone && (
                <ErrorMessage name="phone">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              )}
            </Box>
            <Box marginBottom={2} marginTop={2}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Choix de l'expedition
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default Information;
