import React from "react";
import styles from "../../styles/Spinner.module.scss";

const Spinner: React.FC = () => (
  <div className={styles.spinner}>
    <div className={styles.lds_dual_ring} />
  </div>
);
export default React.memo(Spinner);
