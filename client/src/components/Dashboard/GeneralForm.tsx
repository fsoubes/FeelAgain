import React, { Fragment } from "react";
import { Box, Button } from "@material-ui/core";
import { Field } from "formik";
import { productType, paletteShoes } from "../../constants/constants";
import FormArray from "../Form/FormArray";
import FormArraySelect from "../Form/FormArraySelect";
import styles from "../../styles/Dashboard.module.scss";
import AddIcon from "@material-ui/icons/Add";

interface ShoesFormProps {
  image_url: string;
  tags: string[];
  colors: string[];
  size: number[];
  relation: string[];
}

const GeneralForm: React.FC<ShoesFormProps> = ({
  image_url,
  tags,
  colors,
  size,
  relation,
}) => {
  console.log(image_url);
  return (
    <Fragment>
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
              <img style={{ maxWidth: "150px" }}></img>
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
              {productType.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
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
              <img style={{ maxWidth: "150px" }} src={image_url}></img>
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
            <label className={styles.form__register_label}>Prix (euro)</label>
            <Field
              type="number"
              name="price"
              autoCapitalize="none"
              autoCorrect="off"
              className={styles.form__register_input}
              min="1"
            ></Field>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <img style={{ maxWidth: "150px" }} src={image_url}></img>
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
              <img style={{ maxWidth: "150px" }} src={image_url}></img>
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
            values={colors}
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
          <FormArray title="Pointure" values={size} param="size"></FormArray>
        </Box>
      </section>
      <section>
        <div className={styles.dashboard__header}>
          <h1 style={{ textAlign: "left" }}>Étiquettes</h1>
        </div>
        <Box marginBottom={2} marginTop={2} display="flex">
          <FormArray title="Étiquette" values={tags} param="tags"></FormArray>
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
          {relation.length === 0 && (
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
    </Fragment>
  );
};
export default GeneralForm;
