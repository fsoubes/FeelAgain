import React from "react";
import FilterItem from "./FilterItem/FilterItem";
import styles from "../../styles/Filter.module.scss";

interface FilterListProps {
  data: any;
}

const FilterList: React.FC<FilterListProps> = ({ data }) => {
  const filterOptions = data.map((item: any) => {
    return <FilterItem size={item.size} />;
  });

  return <div className={styles.container}>{filterOptions}</div>;
};
export default FilterList;
