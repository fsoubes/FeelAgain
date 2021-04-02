import { Box } from "@material-ui/core";
import { Field, FieldArray } from "formik";
import React, { Fragment } from "react";
import styles from "../../styles/Dashboard.module.scss";

interface FormArraySelectProps {
  values: (string | number)[];
  param: string;
  title: string;
  options: string[];
}

const FormArraySelect: React.FC<FormArraySelectProps> = ({
  values,
  param,
  title,
  options,
}) => {
  return (
    <FieldArray
      name={param}
      render={(arrayHelpers) => (
        <div className={styles.dashboard__grid}>
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
                  <div style={{ display: "flex", width: "100%" }}>
                    <Field
                      as="select"
                      name={`${param?.toLowerCase()}.${index}`}
                    >
                      {options.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </Field>

                    {index + 1 === values.length && (
                      <Fragment>
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => arrayHelpers.insert(index + 1, "")} // insert an empty string at a position
                        >
                          +
                        </button>
                      </Fragment>
                    )}
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
export default React.memo(FormArraySelect);
