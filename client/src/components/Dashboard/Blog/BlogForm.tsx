import { useState, useEffect } from "react";
import {
  useAddArticleMutation,
  useUpdateArticleMutation,
} from "../../../generated/graphql";
import { Box } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import styles from "../../../styles/Dashboard.module.scss";
import { Button } from "@material-ui/core/";
import EditAndPreview from "../../Markdown/EditAndPreview";
import { themes } from "../../../constants/constants";
import { initialValuesBlog } from "../../../constants/dashboard";
import { BlogFormProps, IBlog } from "../../../types/dashboard";

const BlogForm: React.FC<BlogFormProps> = ({ title, fetchValues }) => {
  const [update] = fetchValues
    ? useUpdateArticleMutation()
    : useAddArticleMutation();

  const [article, setArticle] = useState<string>("");

  useEffect(() => {
    if (fetchValues) {
      setArticle(fetchValues.article);
    }
  }, []);

  return (
    <div className={styles.dashboard__container}>
      <div className={styles.dashboard__header}>
        <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>{title}</h1>
      </div>
      <Formik
        initialValues={fetchValues ? fetchValues : initialValuesBlog}
        onSubmit={async (values, { resetForm }) => {
          try {
            if (!article) {
              return;
            }

            const isValid = Object.keys(values).filter((item) => {
              return values[item as keyof IBlog];
            });

            if (isValid.length !== Object.keys(values).length && !fetchValues) {
              return;
            }

            const blogVariable = {
              ...(fetchValues && {
                ...values,
                blogId: fetchValues?._id as string,
                article: article,
              }),
              ...(!fetchValues && {
                ...values,
                article: article,
              }),
            };

            await update({
              variables: { ...(blogVariable as any) },
            });

            resetForm({});
            setArticle("");
          } catch (err) {
            throw err;
          }
        }}
      >
        {({ values }) => (
          <Form>
            <section>
              <div className={styles.header}>
                <h1 style={{ textAlign: "left" }}>Informations</h1>
              </div>
              <div className={styles.grid}>
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
                  <label>Categorie</label>
                  <Field as="select" name="tags">
                    {themes.map((item: string, index: number) => (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    ))}
                  </Field>
                </Box>
              </div>
            </section>
            <section>
              <div className={styles.header}>
                <h1 style={{ textAlign: "left" }}>Images</h1>
              </div>
              <div className={styles.flex_image}>
                <Box
                  marginBottom={2}
                  marginTop={2}
                  display="flex"
                  flexDirection="column"
                >
                  <label className={styles.form__register_label}>
                    Image d'en-tête
                  </label>
                  <Field
                    type="text"
                    name="image_url"
                    autoCapitalize="none"
                    autoCorrect="off"
                    className={styles.form__register_input}
                  ></Field>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <img src={values.image_url}></img>
                  </div>
                </Box>
                <Box
                  marginBottom={2}
                  marginTop={2}
                  display="flex"
                  flexDirection="column"
                >
                  <label className={styles.form__register_label}>
                    Image d'arrière plan
                  </label>
                  <Field
                    type="text"
                    name="image_back"
                    autoCapitalize="none"
                    autoCorrect="off"
                    className={styles.form__register_input}
                  ></Field>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <img src={values.image_back}></img>
                  </div>
                </Box>
              </div>
            </section>
            <section>
              <div className={styles.dashboard__header}>
                <h1 style={{ textAlign: "left" }}>Article</h1>
              </div>
              <Box
                marginBottom={2}
                marginTop={2}
                display="flex"
                flexDirection="column"
              >
                <EditAndPreview
                  setValue={setArticle}
                  article={article}
                  isPreview={true}
                />
              </Box>
            </section>
            <section>
              <Box
                marginBottom={2}
                marginTop={2}
                display="flex"
                flexDirection="column"
                style={{ maxWidth: "167px" }}
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
            </section>
            <Button type="submit" fullWidth variant="contained" color="primary">
              {title}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default BlogForm;
