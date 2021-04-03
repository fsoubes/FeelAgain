import { Box } from "@material-ui/core";
import { Field, FieldArray } from "formik";
import React from "react";
import styles from "../../styles/Dashboard.module.scss";

interface Image {
  src: string;
}

interface ImageFormProps {
  images?: Image[];
}

const ImageForm: React.FC<ImageFormProps> = ({ images }) => {
  return (
    <FieldArray
      name="images"
      render={(arrayHelpers) => (
        <section>
          <div className={styles.dashboard__header}>
            <h1 style={{ textAlign: "left" }}>Images</h1>
          </div>
          <div className={styles.dashboard__grid}>
            {images && images.length > 0 ? (
              images.map((item, index) => (
                <Box
                  key={index}
                  marginBottom={2}
                  marginTop={2}
                  display="flex"
                  flexDirection="column"
                >
                  <label className={styles.form__register_label}>
                    Position {index + 1}
                  </label>
                  <Field
                    type="text"
                    name={`images.[${index}].src`}
                    autoCapitalize="none"
                    autoCorrect="off"
                    className={styles.form__register_input}
                  ></Field>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <img style={{ maxWidth: "150px" }} src={item.src}></img>
                  </div>
                </Box>
              ))
            ) : (
              <button type="button" onClick={() => arrayHelpers.push("")}>
                Ajouter un variant
              </button>
            )}
          </div>
        </section>
      )}
    />
  );
};

export default ImageForm;
