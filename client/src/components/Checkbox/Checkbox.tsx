import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { UpdateFilterAction } from "../../types/filter";
import { NextRouter } from "next/router";
import { Irouter } from "../../types/routing";
import { getUrl } from "../../utils/getUrl";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      marginBottom: " 1rem",
      width: "100%",
    },
    formControl: {
      width: "100%",
    },
    formControlLabel: {
      padding: " 0px 16px",
      margin: "0",
      justifyContent: "space-between",
      width: "100%",
      alignItems: "center",
      "& span": {
        fontSize: "14px",
        "&:hover": {
          color: "black",
          fontWeight: "bold",
        },
      },
    },
    checkBox: {
      padding: "0",
    },
  })
);

interface ValueProps {
  [key: string]: boolean;
}

interface CheckboxFormProps {
  update: React.Dispatch<UpdateFilterAction>;
  state: ValueProps;
  field: string;
  router: NextRouter;
}

const CheckboxForm: React.FC<CheckboxFormProps> = ({
  update,
  state,
  field,
  router,
}) => {
  const classes = useStyles();

  const formControlLabel = Object.keys(state).map((item, index) => {
    return (
      <FormControlLabel
        key={index}
        className={classes.formControlLabel}
        labelPlacement="start"
        control={
          <Checkbox
            checked={state[item]}
            onChange={(event) => {
              update({
                type: "updateBox",
                field: field,
                key: event.target.name,
                checked: event.target.checked as boolean,
              });

              const prevName = Object.keys(state).filter(
                (key) => state[key]
              )[0];

              let updateTags =
                typeof router.query.tags === "object"
                  ? [...(router.query.tags as string[]), event.target.name]
                  : router.query.tags
                  ? [
                      ...(router.query.tags as string).split(","),
                      event.target.name,
                    ]
                  : [event.target.name];

              updateTags = updateTags.map((item) =>
                item === decodeURIComponent(item)
                  ? encodeURIComponent(item)
                  : item
              );

              const currentSegment =
                updateTags.length > 0
                  ? (updateTags as string[]).filter(
                      (item) => item !== encodeURIComponent(prevName)
                    )
                  : encodeURIComponent(event.target.name);

              const currentRouter: Irouter = {
                ...router.query,
                ...(field === "categories" && {
                  ["product"]: !event.target.checked
                    ? undefined
                    : event.target.name,
                }),

                ...(field !== "categories" && {
                  ["tags"]: currentSegment,
                }),
              };

              router.push(
                {
                  pathname: router.pathname,
                  query: { ...currentRouter },
                },
                `/shop${getUrl(currentRouter)}`,
                { shallow: true }
              );
            }}
            name={item}
            className={classes.checkBox}
          />
        }
        label={item}
      />
    );
  });

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup>{formControlLabel}</FormGroup>
      </FormControl>
    </div>
  );
};
export default React.memo(CheckboxForm);
