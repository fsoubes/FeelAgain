import React from "react";
import styles from "../../styles/Sort.module.scss";

interface sortoptions {
  id_asc: string;
  id_desc: string;
  price_asc: string;
  price_desc: string;
  title_asc: string;
  title_desc: string;
}

interface SortProps {
  isSort: String | null;
  options: sortoptions;
  setSort: React.Dispatch<React.SetStateAction<String | null>>;
  closing: React.Dispatch<React.SetStateAction<Boolean>>;
}

const Sort: React.FC<SortProps> = ({ options, setSort, closing, isSort }) => {
  const handleClick = (item: any) => {
    setSort(item);
    closing(false);
  };

  const listOptions = Object.keys(options).map((item, index) => (
    <li className={styles.item} key={index} onClick={() => handleClick(item)}>
      {(options as any)[item]}
      {item === isSort ? ` ✓` : ""}
    </li>
  ));

  return (
    <div className={styles.container}>
      <ul className={styles.list}>{listOptions}</ul>
    </div>
  );
};
export default Sort;
