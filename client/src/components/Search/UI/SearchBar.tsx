// React
import React, { useRef } from "react";
import styles from "../../../styles/SearchBar.module.scss";

const SearchBar = ({ searchConfim, urlSearch }: any) => {
  const searchValue = useRef(null);

  return (
    <div className={styles.search__container}>
      <p className={styles.search__title}>Recherche un produit</p>
      <input
        ref={searchValue}
        onKeyDown={searchConfim}
        defaultValue={urlSearch}
        tabIndex={0}
        type="text"
        autoFocus
        placeholder="Rechercher"
        aria-label="Search"
        autoComplete="off"
        style={{ width: "90%" }}
        className={styles.search__input}
      />
    </div>
  );
};

export default SearchBar;
