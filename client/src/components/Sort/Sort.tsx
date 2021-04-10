import React from "react";
import styles from "../../styles/Sort.module.scss";

interface SortProps {
  options: String[];
}

const Sort: React.FC<SortProps> = ({ options }) => {
  const listOptions = options.map((item, index) => (
    <li className={styles.item} key={index}>
      {item}
    </li>
  ));

  return (
    <div className={styles.container}>
      <ul className={styles.list}>{listOptions}</ul>
    </div>
  );
};
export default Sort;
