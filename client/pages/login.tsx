import React from "react";
import { Layout } from "../src/components/Layout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import styles from "../src/styles/Register.module.scss";
import NextLink from "next/link";
import { withApollo } from "../src/utils/withApollo";
import {
  useLoginMutation,
  MeQuery,
  MeDocument,
} from "../src/generated/graphql";
import { useRouter } from "next/router";
import { toErrorMap } from "../src/utils/toErrorMap";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const [login] = useLoginMutation();
  const router = useRouter();

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
          <h1>Sign in to FSoWeb</h1>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            try {
              const response = await login({
                variables: values,
                update: (cache, { data }) => {
                  cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      __typename: "Query",
                      me: data?.login.user,
                    },
                  });
                  cache.evict({ fieldName: "posts:{}" });
                },
              });
              if (response.data?.login.errors) {
                setErrors(toErrorMap(response.data.login.errors));
              } else if (response.data?.login.user?._id) {
                if (typeof router.query.next === "string") {
                  router.push(router.query.next);
                } else {
                  router.push("/");
                }
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
                  Email adress
                </label>
                <Field
                  type="text"
                  name="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  className={styles.form__register_input}
                ></Field>
                {errors.email && (
                  <ErrorMessage name="email">
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
                <div className={styles.form__register_password}>
                  <label className={styles.form__register_label}>
                    Password
                  </label>
                  <NextLink href="/forgot-password">Forgot password?</NextLink>
                </div>
                <Field
                  className={styles.form__register_input}
                  type="password"
                  name="password"
                  autoComplete="current-password"
                ></Field>
                {errors.password && (
                  <ErrorMessage name="password">
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
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <p className={styles.form__register_new}>
          New to FSoWeb ?
          <NextLink href="/register"> Create an account</NextLink>
        </p>
      </Box>
    </Layout>
  );
};
export default withApollo({ ssr: false })(Login);
