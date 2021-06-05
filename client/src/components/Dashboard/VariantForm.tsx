import { Box } from "@material-ui/core";
import { FieldArray, Field } from "formik";
import { memo } from "react";

import styles from "../../styles/Dashboard.module.scss";

interface Variant {
  featured_image?: string | undefined;
  title: string;
}

interface VariantFormProps {
  size: number[];
  variants?: Variant[];
}

const VariantForm: React.FC<VariantFormProps> = ({ size, variants }) => {
  const initial = size.map((item, index) => {
    return { title: item };
  });
  return (
    <FieldArray
      name="variants"
      render={(arrayHelpers) => (
        <div>
          {initial && initial.length > 0 ? (
            initial.map((item, index) => (
              <section key={index}>
                <div className={styles.header}>
                  <h1 style={{ textAlign: "left" }}>Variant {item.title}</h1>
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
                      name={`variants.[${index}].title`}
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
                      Quantity
                    </label>
                    <Field
                      type="number"
                      name={`variants.[${index}].quantity`}
                      autoCapitalize="none"
                      autoCorrect="off"
                      className={styles.form__register_input}
                      min="0"
                    ></Field>
                  </Box>
                  <Box
                    marginBottom={2}
                    marginTop={2}
                    display="flex"
                    flexDirection="column"
                  >
                    <label className={styles.form__register_label}>Price</label>
                    <Field
                      type="number"
                      min="0"
                      name={`variants.[${index}].price`}
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
                      featured_image
                    </label>
                    <Field
                      type="text"
                      name={`variants.[${index}].featured_image`}
                      autoCapitalize="none"
                      autoCorrect="off"
                      className={styles.form__register_input}
                    ></Field>
                    {variants &&
                      variants[index] &&
                      variants[index].featured_image && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <img
                            style={{ maxWidth: "150px" }}
                            src={variants[index].featured_image}
                          ></img>
                        </div>
                      )}
                  </Box>
                </div>
              </section>
            ))
          ) : (
            <button type="button" onClick={() => arrayHelpers.push("")}>
              Ajouter un variant
            </button>
          )}
        </div>
      )}
    />
  );
};
export default memo(VariantForm);
