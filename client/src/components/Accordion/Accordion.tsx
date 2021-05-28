import React, { useReducer, useEffect, useRef } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { Button } from "@material-ui/core";
import CheckboxForm from "../Checkbox/Checkbox";
import { initialValues } from "../../constants/filter";
import { filterReducer } from "../../utils/updateFilter";
import FilterList from "../Filter/FilterList";
import styles from "../../styles/Accordion.module.scss";
import { useRouter } from "next/router";

interface CustomAccordionProps {
  isFiltering?: Boolean;
  refetch?: any;
  sortingBy: String | null;
  isOpen: Boolean;
  setSort: React.Dispatch<React.SetStateAction<String | null>>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "250px",
      fontSize: "14px",
      background: "transparent",
      marginRight: "10px",
      "&:nth-child(2)": {
        borderTop: "1px solid black !important",
      },
    },
    root_display: {
      width: "250px",
      fontSize: "14px",
      background: "transparent",
      marginRight: "10px",
      "&:nth-child(2)": {
        borderTop: "1px solid black !important",
      },
    },
    accordion: {
      boxShadow: "unset",
      background: "transparent",
      borderBottom: "1px solid black",
      borderRadius: "0px",
      "&::before": {
        backgroundColor: "rgb(0,0,0) !important",
        opacity: "1 !important",
      },
    },
    filter_title: {
      fontSize: "14px",
    },
    reset: {
      background: "transparent",
      border: "1px solid black",
      color: "black",
      width: "100%",
      padding: "10px 0px",
      marginBottom: "0.5rem",
      borderBottom: "1px solid black",
      "&:hover": {
        backgroundColor: "black",
        color: "white",
      },
    },
    details: {
      padding: 0,
    },
  })
);

const CustomAccordion: React.FC<CustomAccordionProps> = ({
  refetch,
  sortingBy = null,
  isOpen = false,
  setSort,
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const router = useRouter();

  /* const handleRoute = (param: string, value: string) => {
    const { page, search, type, size, filter, sort } = router.query;
    Object.keys(router.query).map((item) => console.log(item));

    router.push(
      {
        pathname: router.pathname,
        query: {
          page: page,
          search,
        },
      },
      search ? `/shop?page=${page}&search=${search}` : `/shop?page=${page}`,
      { shallow: true }
    );
  }; */

  const firstUpdate = useRef(true);

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [filter, dispatch] = useReducer(filterReducer, initialValues);

  useEffect(() => {
    // Check w router if params
    // setParams

    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    const variables = {
      ...(filter.variables?.product && { product: filter.variables.product }),
      ...((filter?.variables?.size?.length as number) > 0 && {
        size: filter.variables?.size,
      }),
      ...((filter?.variables?.tags?.length as number) > 0 && {
        tags: filter.variables?.tags,
      }),
      ...(sortingBy && {
        sort: sortingBy,
      }),
    };

    if (filter && Object.keys(variables as Request).length > 0) {
      refetch({
        ...variables,
      });
    } else {
      refetch({ product: null, tags: null, size: null, sort: "id_asc" });
    }
  }, [filter, sortingBy, firstUpdate]);

  return (
    <div className={isOpen ? `${styles.container}` : `${styles.hide}`}>
      <Button
        className={classes.reset}
        onClick={() => {
          setSort(null);
          dispatch({ type: "reset", values: initialValues });
          router.push("/shop", undefined, { shallow: true });
        }}
      >
        Réinitialiser
      </Button>
      <Accordion
        className={classes.accordion}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.filter_title}>PAR PRODUIT</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          {filter.categories && (
            <CheckboxForm
              router={router}
              state={filter.categories}
              update={dispatch}
              field={"categories"}
            />
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion
        className={classes.accordion}
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.filter_title}>PAR COULEUR</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <FilterList
            router={router}
            data={filter?.colors}
            isColor={true}
            update={dispatch}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        className={classes.accordion}
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.filter_title}>PAR MATIERE</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          {filter.materials && (
            <CheckboxForm
              router={router}
              state={filter.materials}
              update={dispatch}
              field={"materials"}
            />
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion
        className={classes.accordion}
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.filter_title}>PAR TALON</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          {filter.heels && (
            <CheckboxForm
              router={router}
              state={filter.heels}
              update={dispatch}
              field={"heels"}
            />
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion
        className={classes.accordion}
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5bh-content"
          id="panel5bh-header"
        >
          <Typography className={classes.filter_title}>PAR POINTURE</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <FilterList router={router} data={filter?.sizes} update={dispatch} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default React.memo(CustomAccordion);
