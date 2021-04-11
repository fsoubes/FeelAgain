import React from "react";
import styles from "../../../styles/Filter.module.scss";
import { UpdateFilterAction } from "../../../types/filter";

interface FilterItemProps {
  size?: number;
  color?: boolean;
  hex?: string;
  update: React.Dispatch<UpdateFilterAction>;
  check: boolean;
}

const FilterItem: React.FC<FilterItemProps> = ({
  size,
  color = false,
  hex,
  update,
  check,
}) => {
  return (
    <div
      onClick={() =>
        update({
          type: "updateList",
          field: color ? "colors" : "sizes",
          value: color ? (hex as string) : (size as number),
        })
      }
      className={check ? `${styles.checked}` : ""}
    >
      {!color && <span> {size}</span>}
      {color && (
        <div className={styles.color} style={{ backgroundColor: hex }}>
          &nbsp;
        </div>
      )}
    </div>
  );
};
export default FilterItem;
