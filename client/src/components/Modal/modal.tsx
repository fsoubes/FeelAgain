import React, { Fragment } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

interface ModalProps {
  modalTitle?: string;
  children: JSX.Element;
  isSearch: boolean;
}

const getModalStyle = () => {
  const top = 15;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${50}%, -${left}%)`,
  };
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: "#fff",
      border: "2px solid #000",
      boxShadow: theme.shadows[10],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

const PopUp: React.FC<ModalProps> = ({ children, modalTitle, isSearch }) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Button variant="text" color="inherit" onClick={handleOpen}>
        <SearchIcon></SearchIcon>
      </Button>

      <Modal
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
