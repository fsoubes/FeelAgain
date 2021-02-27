import React from "react";
import { Layout } from "../src/components/Layout";
import { withApollo } from "../src/utils/withApollo";
import { Box } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import styles from "../src/styles/Dashboard.module.scss";
import { Button } from "@material-ui/core/";
import { useAddArticleMutation } from "../src/generated/graphql";
import { useRouter } from "next/router";
import { useIsAuth } from "../src/utils/useIsAuth";

const Dashboard: React.FC<{}> = ({}) => {
  useIsAuth();
  const router = useRouter();
  const [addArticle] = useAddArticleMutation();
  return (
    <Layout>
      <div className={styles.dashboard__container}>
        <div className={styles.dashboard__header}>
          <h1>Add Article</h1>
        </div>
        <Formik
          initialValues={{
            title: "",
            description: "",
            image_url: "",
            tags: "",
            source: [],
            social: [],
            article: "",
            isPublished: false,
          }}
          onSubmit={async (values, { resetForm }) => {
            try {
              await addArticle({ variables: values });
              resetForm({});
              router.push("/");
            } catch (err) {
              throw err;
            }
          }}
        >
          {({ isSubmitting, errors, values }) => (
            <Form>
              <section>
                <div className={styles.dashboard__header}>
                  <h1 style={{ textAlign: "left" }}>Informations</h1>
                </div>
                <div className={styles.dashboard__grid}>
                  <Box
                    marginBottom={2}
                    marginTop={2}
                    display="flex"
                    flexDirection="column"
                  >
                    <label className={styles.form__register_label}>Title</label>
                    <Field
                      type="text"
                      name="title"
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
                      Description
                    </label>
                    <Field
                      type="text"
                      name="description"
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
                    <label className={styles.form__register_label}>Image</label>
                    <Field
                      type="text"
                      name="image_url"
                      autoCapitalize="none"
                      autoCorrect="off"
                      className={styles.form__register_input}
                    ></Field>
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <img
                        style={{ maxWidth: "150px" }}
                        src={values.image_url}
                      ></img>
                    </div>
                  </Box>
                </div>
              </section>
              <section>
                <div className={styles.dashboard__header}>
                  <h1 style={{ textAlign: "left" }}>Description</h1>
                </div>
                <Box
                  marginBottom={2}
                  marginTop={2}
                  display="flex"
                  flexDirection="column"
                >
                  <label className={styles.form__register_label}>Article</label>
                  <Field
                    as="textarea"
                    type="text"
                    name="article"
                    autoCapitalize="none"
                    autoCorrect="off"
                    className={styles.form__register_input}
                  ></Field>
                </Box>
              </section>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Add Article
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};
export default withApollo({ ssr: false })(Dashboard);
