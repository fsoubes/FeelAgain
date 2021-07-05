import { Box } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import { Layout } from "../components/Layout";
import styles from "../styles/Register.module.scss";
import Button from "@material-ui/core/Button";
import { withApollo } from "../utils/withApollo";
import { useForgotPasswordMutation } from "../generated/graphql";

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
  const [forgetPassword] = useForgotPasswordMutation();
  const [complete, setComplete] = useState(false);

  return (
    <Layout>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="stretch"
        bgcolor={"#f6f8fa"}
        width={"340px"}
        padding={"20px"}
        border={"1px solid #eaecef"}
        borderRadius={"5px"}
        marginTop={"40px"}
        marginBottom={"40px"}
      >
        {!complete && (
          <>
            <div className={styles.form__register_header}>
              <h1>Forgot password</h1>
            </div>
            <Formik
              initialValues={{ email: "" }}
              onSubmit={async (values, { setErrors }) => {
                try {
                  await forgetPassword({ variables: values });
                  setComplete(true);
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              {({}) => (
                <Form>
                  <Box
                    marginBottom={2}
                    marginTop={2}
                    display="flex"
                    flexDirection="column"
                  >
                    <label className={styles.form__register_label}>
                      Your email
                    </label>
                    <Field
                      type="text"
                      name="email"
                      autoCapitalize="none"
                      autoCorrect="off"
                      className={styles.form__register_input}
                    ></Field>
                  </Box>
                  <Button
                    style={{ marginBottom: "1rem" }}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Envoyer un email
                  </Button>
                </Form>
              )}
            </Formik>
          </>
        )}
        {complete && (
          <span>Un courriel a été envoyé pour changer votre mot de passe.</span>
        )}
      </Box>
    </Layout>
  );
};
export default withApollo({ ssr: false })(ForgotPassword);
