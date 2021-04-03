import { Box } from "@material-ui/core";
import { Field, FieldArray } from "formik";
import React from "react";
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
        <div className={styles.dashboard__grid_small}>
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
                  <div style={{ display: "flex" }}>
                    <Field
                      type="text"
                      name={`${param?.toLowerCase()}.${index}`}
                      autoCapitalize="none"
                      autoCorrect="off"
                      className={styles.form__register_input}
                      // autoFocus
                    ></Field>

                    <button
                      type="button"
                      onClick={() => {
                        arrayHelpers.remove(index);
                        if (variants) {
                          variants.splice(index, 1);
                        }
                      }} // remove a friend from the list
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
                          variants.push({
                            title: "43",
                            featured_image: "",
                            quantity: 0,
                            price: 0,
                          });
                        }
                      }} // insert an empty string at a position
                    >
                      +
                    </button>
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
export default React.memo(FormArray);
