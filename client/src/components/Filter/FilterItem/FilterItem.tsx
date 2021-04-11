import React, { useState } from "react";
import styles from "../../../styles/Filter.module.scss";

interface FilterItemProps {
  size?: number;
}

const FilterItem: React.FC<FilterItemProps> = ({ size }) => {
  const [check, setCheck] = useState(false);

  return (
    <div
      onClick={() => setCheck(!check)}
      className={check ? `${styles.checked}` : ""}
    >
      {size}
    </div>
  );
};
export default FilterItem;
