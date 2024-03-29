import { Formik, Form, Field, ErrorMessage } from "formik";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import styles from "../styles/Register.module.scss";
import { withApollo } from "../utils/withApollo";
import { useRouter } from "next/router";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { Layout } from "../components/Layout";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const [register] = useRegisterMutation();
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
        marginBottom={5}
      >
        <div className={styles.form__register_header}>
          <h1>Inscription à Feel Again</h1>
        </div>
        <Formik
          initialValues={{ email: "", nickname: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            try {
              const response = await register({ variables: values });
              if (response.data?.register.errors) {
                setErrors(toErrorMap(response.data.register.errors));
              } else if (response.data?.register.user) {
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
                  ADRESSE EMAIL
                </label>
                <Field
                  type="email"
                  name="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  className={styles.form__register_input}
                />
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
                <label className={styles.form__register_label}>
                  NOM D'UTILISATEUR
                </label>
                <Field
                  type="text"
                  name="nickname"
                  autoCapitalize="none"
                  autoCorrect="off"
                  className={styles.form__register_input}
                />
                {errors.nickname && (
                  <ErrorMessage name="nickname">
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
                    MOT DE PASSE
                  </label>
                </div>
                <Field
                  className={styles.form__register_input}
                  type="password"
                  name="password"
                  autoComplete="current-password"
                />
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
              >
                S'inscrire
              </Button>
              <p>
                Vos données personnelles (email et nom d'utilisateur) ne sont
                utilisées qu'à des fins d'authentification et ne sont pas
                partagées avec des tiers
              </p>
            </Form>
          )}
        </Formik>
      </Box>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Register);
