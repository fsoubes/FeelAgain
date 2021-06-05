import { Box } from "@material-ui/core";
import { Field, FieldArray } from "formik";
import { memo } from "react";
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
        <div className={styles.grid}>
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
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      position: "relative",
                    }}
                  >
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
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column-reverse",
                          justifyContent: "center",
                          color: "black",
                          paddingLeft: "5px",
                          position: "absolute",
                          right: "15px",
                          height: "100%",
                          cursor: "pointer",
                        }}
                      >
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
                      </div>
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
export default memo(FormArraySelect);
