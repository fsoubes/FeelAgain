import { Fragment, useEffect, useState } from "react";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import { SearchResults } from "../../generated/graphql";
import { useRouter } from "next/router";
import styles from "../../styles/Modal.module.scss";

interface ModalProps {
  modalTitle?: string;
  children: JSX.Element;
  isSearch: boolean;
  reset: React.Dispatch<React.SetStateAction<SearchResults | null>>;
  icon: JSX.Element;
}

const PopUp: React.FC<ModalProps> = ({
  children,
  modalTitle,
  isSearch,
  reset,
  icon,
}) => {
  const router = useRouter();

  useEffect(() => {
    return () => {
      if (router) {
        setOpen(false);
        reset(null);
      }
    };
  }, [router]);

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = useState(false);

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
        {icon}
      </Button>

      <Modal
        className={styles.container}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={styles.content}>
          {!isSearch && <h2 id="simple-modal-title">{modalTitle}</h2>}
          {children}
        </div>
      </Modal>
    </Fragment>
  );
};
export default PopUp;
