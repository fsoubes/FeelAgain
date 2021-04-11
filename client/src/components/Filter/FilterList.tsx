import React from "react";
import FilterItem from "./FilterItem/FilterItem";
import styles from "../../styles/Filter.module.scss";
import { UpdateFilterAction } from "../../types/filter";

interface FilterListProps {
  data: any;
  color?: boolean;
  update: React.Dispatch<UpdateFilterAction>;
}

const FilterList: React.FC<FilterListProps> = ({
  data,
  color = false,
  update,
}) => {
  const filterOptions = data.map((item: any, index: number) => {
    return (
      <FilterItem
        key={index}
        size={item.size}
        hex={item.hex}
        color={color as boolean}
        update={update}
        check={item.checked}
      />
    );
  });

  return <div className={styles.container}>{filterOptions}</div>;
};
export default FilterList;
