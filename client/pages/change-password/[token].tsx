import React, { useState } from "react";
import { NextPage } from "next";
import { Layout } from "../../src/components/Layout";
import { withApollo } from "../../src/utils/withApollo";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import styles from "../../src/styles/Register.module.scss";
import { useRouter } from "next/router";
import {
  useChangePasswordMutation,
  MeDocument,
  MeQuery,
} from "../../src/generated/graphql";
import { toErrorMap } from "../../src/utils/toErrorMap";

const ChangePassword: NextPage = () => {
  const router = useRouter();
  const [changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");

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
        <div className={styles.form__register_header}>
          <h1>Change password</h1>
        </div>
        <Formik
          initialValues={{ newPassword: "", confirmPassword: "" }}
          onSubmit={async (values, { setErrors }) => {
            try {
              if (values.newPassword !== values.confirmPassword) {
                console.log("Not the same password");
              }
              const response = await changePassword({
                variables: {
                  newPassword: values.newPassword,
                  token:
                    typeof router.query.token === "string"
                      ? router.query.token
                      : "",
                },
                update: (cache, { data }) => {
                  cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      __typename: "Query",
                      me: data?.changePassword.user,
                    },
                  });
                },
              });
              if (response.data?.changePassword.errors) {
                const errorMap = toErrorMap(
                  response.data.changePassword.errors
                );
                if ("token" in errorMap) {
                  setTokenError(errorMap.token);
                }
                setErrors(errorMap);
              } else if (response.data?.changePassword.user) {
                // worked
                router.push("/");
              }
            } catch (err) {
              console.log(err);
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
                <label className={styles.form__register_label}>
                  New password
                </label>
                <Field
                  type="password"
                  name="newPassword"
                  autoCapitalize="none"
                  autoCorrect="off"
                  className={styles.form__register_input}
                ></Field>
              </Box>
              <Box
                marginBottom={2}
                marginTop={2}
                display="flex"
                flexDirection="column"
              >
                <label className={styles.form__register_label}>
                  Confirm password
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  autoCapitalize="none"
                  autoCorrect="off"
                  className={styles.form__register_input}
                ></Field>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Confirm
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Layout>
  );
};

export default withApollo({ ssr: false })(ChangePassword);
