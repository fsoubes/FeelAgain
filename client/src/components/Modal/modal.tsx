import React, { Fragment } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { SearchResults } from "../../generated/graphql";

interface ModalProps {
  modalTitle?: string;
  children: JSX.Element;
  isSearch: boolean;
  reset: React.Dispatch<React.SetStateAction<SearchResults | null>>;
}

const getModalStyle = () => {
  const top = 15;

  return {
    top: `${top}%`,
    margin: "auto",
  };
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: "60%",
      backgroundColor: "#fff",
      border: "2px solid #000",
      boxShadow: theme.shadows[10],
      padding: theme.spacing(2, 4, 3),
      borderRadius: "3px",
    },
  })
);

const PopUp: React.FC<ModalProps> = ({
  children,
  modalTitle,
  isSearch,
  reset,
}) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset(null);
  };

  return (
    <Fragment>
      <Button variant="text" color="inherit" onClick={handleOpen}>
        <SearchIcon></SearchIcon>
      </Button>

      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          {!isSearch && <h2 id="simple-modal-title">{modalTitle}</h2>}
          {children}
        </div>
      </Modal>
    </Fragment>
  );
};
export default PopUp;
