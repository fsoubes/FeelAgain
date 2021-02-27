import { Box } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
import { Layout } from "../src/components/Layout";
import styles from "../src/styles/Register.module.scss";
import Button from "@material-ui/core/Button";
import { withApollo } from "../src/utils/withApollo";
import { useForgotPasswordMutation } from "../src/generated/graphql";

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
        marginTop={5}
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
            {({ errors }) => (
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
                  Send email
                </Button>
              </Form>
            )}
          </Formik>
          </>
        )}
        {complete && (
          <span>An email has been sent to change your password.</span>
        )}
      </Box>
    </Layout>
  );
};
export default withApollo({ ssr: false })(ForgotPassword);
