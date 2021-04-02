import React from "react";
import { Box, Button } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { productType, paletteShoes } from "../../constants/constants";
import FormArray from "../Form/FormArray";
import FormArraySelect from "../Form/FormArraySelect";
import styles from "../../styles/Dashboard.module.scss";
import { useAddArticleMutation } from "../../generated/graphql";
import AddIcon from "@material-ui/icons/Add";

interface ShoesFormProps {
  current: number;
}

const ShoesForm: React.FC<ShoesFormProps> = ({ current }) => {
  const [addArticle] = useAddArticleMutation();

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        image_url: "",
        price: null,
        balance: null,
        source: [],
        social: [],
        article: "",
        isPublished: false,
        size: [35, 36, 37, 38, 39, 40, 41, 42],
        tags: ["cuir", "noir"],
        product: "",
        relation: [],
        colors: ["Blanc"],
        shoes: { size: [35, 36, 37, 38, 39, 40, 41, 42] },
      }}
      onSubmit={async (values, { resetForm }) => {
        try {
          //   await addArticle({ variables: values });
          resetForm({});
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
                <label className={styles.form__register_label}>Titre</label>
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
                <label className={styles.form__register_label}>Vendeur</label>
                <Field
                  type="text"
                  name="image_url"
                  autoCapitalize="none"
                  autoCorrect="off"
                  className={styles.form__register_input}
                ></Field>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
                <label className={styles.form__register_label}>
                  Type de produit
                </label>
                <Field as="select" name="product">
                  {productType.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </Field>
              </Box>

              <Box
                marginBottom={2}
                marginTop={2}
                display="flex"
                flexDirection="column"
              >
                <label className={styles.form__register_label}>Poids (g)</label>
                <Field
                  type="number"
                  name="image_url"
                  autoCapitalize="none"
                  min="1"
                  autoCorrect="off"
                  className={styles.form__register_input}
                ></Field>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
              <h1 style={{ textAlign: "left" }}>Prix</h1>
            </div>
            <div className={styles.dashboard__grid}>
              <Box
                marginBottom={2}
                marginTop={2}
                display="flex"
                flexDirection="column"
              >
                <label className={styles.form__register_label}>
                  Prix (euro)
                </label>
                <Field
                  type="number"
                  name="price"
                  autoCapitalize="none"
                  autoCorrect="off"
                  className={styles.form__register_input}
                  min="1"
                ></Field>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
                <label className={styles.form__register_label}>Solde</label>
                <Field
                  type="number"
                  name="balance"
                  autoCapitalize="none"
                  autoCorrect="off"
                  className={styles.form__register_input}
                  min="1"
                ></Field>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
              <h1 style={{ textAlign: "left" }}>Couleur</h1>
            </div>
            <Box marginBottom={2} marginTop={2} display="flex">
              <FormArraySelect
                options={paletteShoes}
                title="Couleur"
                values={values.colors}
                param="colors"
              ></FormArraySelect>
            </Box>
          </section>
          <section>
            <div className={styles.dashboard__header}>
              <h1 style={{ textAlign: "left" }}>Taille</h1>
            </div>
            <div className={styles.dashboard__grid}>
              <Box marginTop={2} display="flex" flexDirection="column">
                <label className={styles.form__register_label}>
                  Taille du talon (cm)
                </label>
                <Field
                  type="number"
                  min="1"
                  name="image_url"
                  autoCapitalize="none"
                  autoCorrect="off"
                  className={styles.form__register_input}
                ></Field>
              </Box>
            </div>
            <Box marginBottom={2} marginTop={2} display="flex">
              <FormArray
                title="Pointure"
                values={values.shoes.size}
                param="size"
              ></FormArray>
            </Box>
          </section>
          <section>
            <div className={styles.dashboard__header}>
              <h1 style={{ textAlign: "left" }}>Étiquettes</h1>
            </div>
            <Box marginBottom={2} marginTop={2} display="flex">
              <FormArray
                title="Étiquette"
                values={values.tags}
                param="tags"
              ></FormArray>
            </Box>
          </section>
          <section>
            <div className={styles.dashboard__header}>
              <h1 style={{ textAlign: "left" }}>Relations</h1>
              <Button>
                <AddIcon></AddIcon>
              </Button>
            </div>
            <Box marginBottom={2} marginTop={2} display="flex">
              {values.relation.length === 0 && (
                <div>
                  Il n'y a pas de relation pour cette chaussure actuellement
                </div>
              )}
            </Box>
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
              <label className={styles.form__register_label}>
                Description Article
              </label>
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
          <Button type="submit" fullWidth variant="contained" color="primary">
            Ajouter Produit
          </Button>
        </Form>
      )}
    </Formik>
  );
};
export default ShoesForm;
