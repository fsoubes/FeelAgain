import React, { Fragment } from "react";
import { Box, Button } from "@material-ui/core";
import { Field } from "formik";
import { productType, paletteShoes } from "../../constants/constants";
import FormArray from "../Form/FormArray";
import FormArraySelect from "../Form/FormArraySelect";
import styles from "../../styles/Dashboard.module.scss";
import AddIcon from "@material-ui/icons/Add";
import SearchShoes from "../Search/Search";
import { GeneralFormProps } from "../../types/dashboard";

const GeneralForm: React.FC<GeneralFormProps> = ({
  tags,
  colors,
  size,
  relatives,
  variants,
  setRelation,
  children,
}) => {
  return (
    <Fragment>
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
            <label>Titre</label>
            <Field
              type="text"
              name="title"
              autoCapitalize="none"
              autoCorrect="off"
            ></Field>
          </Box>
          <Box
            marginBottom={2}
            marginTop={2}
            display="flex"
            flexDirection="column"
          >
            <label>Vendeur</label>
            <Field
              type="text"
              name="vendor"
              autoCapitalize="none"
              autoCorrect="off"
            ></Field>
          </Box>
          <Box
            marginBottom={2}
            marginTop={2}
            display="flex"
            flexDirection="column"
          >
            <label>Type de produit</label>
            <Field as="select" name="product_type">
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
            <label>Poids (g)</label>
            <Field
              type="number"
              name="grams"
              autoCapitalize="none"
              min="1"
              autoCorrect="off"
            ></Field>
          </Box>
          <Box
            marginBottom={2}
            marginTop={2}
            display="flex"
            flexDirection="column"
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
        </div>
      </section>
      <section>
        <div className={styles.header}>
          <h1 style={{ textAlign: "left" }}>Prix</h1>
        </div>
        <div className={styles.grid}>
          <Box
            marginBottom={2}
            marginTop={2}
            display="flex"
            flexDirection="column"
          >
            <label>Prix (euro)</label>
            <Field
              type="number"
              name="price"
              step="0.01"
              autoCapitalize="none"
              autoCorrect="off"
              min="1"
            ></Field>
          </Box>
          <Box
            marginBottom={2}
            marginTop={2}
            display="flex"
            flexDirection="column"
          >
            <label>Solde</label>
            <Field
              type="number"
              name="compare_at_price"
              autoCapitalize="none"
              autoCorrect="off"
              min="1"
            ></Field>
          </Box>
        </div>
      </section>
      <section>
        <div className={styles.header}>
          <h1 style={{ textAlign: "left" }}>Couleurs</h1>
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
        <div className={styles.header}>
          <h1 style={{ textAlign: "left" }}>Taille</h1>
        </div>
        <div className={styles.grid}>
          <Box marginTop={2} display="flex" flexDirection="column">
            <label className={styles.form__register_label}>
              Taille du talon (cm)
            </label>
            <Field
              type="number"
              min="0"
              step="0.5"
              name="heel"
              autoCapitalize="none"
              autoCorrect="off"
            ></Field>
          </Box>
        </div>
        <Box marginBottom={2} marginTop={2} display="flex">
          <FormArray
            title="Pointure"
            values={size}
            param="size"
            variants={variants}
          ></FormArray>
        </Box>
      </section>
      <section>
        <div className={styles.header}>
          <h1 style={{ textAlign: "left" }}>Materiaux</h1>
        </div>
        <Box marginBottom={2} marginTop={2} display="flex">
          <FormArray title="Matériaux" values={tags} param="tags"></FormArray>
        </Box>
      </section>
      <section>
        <div className={styles.header}>
          <h1 style={{ textAlign: "left" }}>Description</h1>
        </div>
        <Box
          marginBottom={2}
          marginTop={2}
          display="flex"
          flexDirection="column"
        >
          <Field
            style={{ minHeight: "160px" }}
            as="textarea"
            name="body_html"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
          ></Field>
        </Box>
      </section>
      <section>
        <div className={styles.header}>
          <h1 style={{ textAlign: "left" }}>Relations</h1>
          <SearchShoes isAdding={true} setRelation={setRelation}>
            <AddIcon />
          </SearchShoes>
        </div>
        <Box marginBottom={2} marginTop={2} display="flex">
          {children}
        </Box>
      </section>
    </Fragment>
  );
};
export default React.memo(GeneralForm);
