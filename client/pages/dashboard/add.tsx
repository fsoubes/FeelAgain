import { Box, Button } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useAddArticleMutation } from "../../src/generated/graphql";
import styles from "../../src/styles/Dashboard.module.scss";

interface AddProps {}

const AddProduct: React.FC<AddProps> = ({}) => {
  const router = useRouter();
  const [addArticle] = useAddArticleMutation();

  return (
    <div className={styles.dashboard__container}>
      <div>
        <div className={styles.dashboard__header}>
          <h1>Ajouter un article</h1>
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
                Ajouter Article
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default AddProduct;
