import { Box } from "@material-ui/core";
import { Field, FieldArray } from "formik";
import { memo } from "react";

import styles from "../../styles/Dashboard.module.scss";

interface Variant {
  featured_image: string;
  title: string;
  quantity: number;
  price: number;
}

interface FormArrayProps {
  values: (string | number)[];
  param: string;
  title: string;
  variants?: Variant[];
}

const FormArray: React.FC<FormArrayProps> = ({
  values,
  param,
  title,
  variants,
}) => {
  return (
    <FieldArray
      name={param}
      render={(arrayHelpers) => (
        <div className={styles.grid_small}>
          {values && values.length > 0 ? (
            values.map((__, index) => (
              <div key={index}>
                <Box
                  marginBottom={2}
                  marginTop={2}
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                >
                  <label className={styles.form__register_label}>{title}</label>
                  <div style={{ display: "flex", position: "relative" }}>
                    <Field
                      type="text"
                      name={`${param?.toLowerCase()}.${index}`}
                      autoCapitalize="none"
                      autoCorrect="off"
                      className={styles.form__register_input}
                      // autoFocus
                    ></Field>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column-reverse",
                        justifyContent: "center",
                        color: "black",
                        paddingLeft: "5px",
                        position: "absolute",
                        right: "0",
                        height: "100%",
                      }}
                    >
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            arrayHelpers.remove(index);
                            if (variants) {
                              variants.splice(index, 1);
                            }
                          } catch (err) {
                            throw err;
                          }
                        }}
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={(): void => {
                          arrayHelpers.insert(
                            index + 1,
                            typeof values[0] === "number"
                              ? (values[index] as number) + 1
                              : ""
                          );

                          if (variants && variants[index]) {
                            const value = parseFloat(variants[index].title) + 1;

                            variants.splice(index + 1, 0, {
                              title: `${value}`.toString(),
                              featured_image: "",
                              quantity: 0,
                              price: 0,
                            });
                          }
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </Box>
              </div>
            ))
          ) : (
            <button type="button" onClick={() => arrayHelpers.push("")}>
              Ajouter une {title}
            </button>
          )}
        </div>
      )}
    />
  );
};
export default memo(FormArray);
