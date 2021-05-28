import { NextRouter } from "next/router";
import React from "react";
import styles from "../../../styles/Filter.module.scss";
import { UpdateFilterAction } from "../../../types/filter";
import { cleanRoute } from "../../../utils/getUrl";

interface FilterItemProps {
  size?: number;
  isColor?: boolean;
  hex?: string;
  update: React.Dispatch<UpdateFilterAction>;
  check: boolean;
  router: NextRouter;
  color: string;
}

interface Irouter {
  page?: string;
  search?: string;
  type?: string;
  tags?: string[];
  sort?: string;
  size?: string | string[];
}

const FilterItem: React.FC<FilterItemProps> = ({
  size,
  color,
  isColor = false,
  hex,
  update,
  check,
  router,
}) => {
  return (
    <div
      onClick={() => {
        update({
          type: "updateList",
          field: isColor ? "colors" : "sizes",
          value: isColor ? (hex as string) : (size as number),
        });

        return cleanRoute(
          isColor ? router.query.tags : router.query.size,
          isColor ? color : (size as number).toString(),
          router,
          isColor ? "tags" : "size"
        );
      }}
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
