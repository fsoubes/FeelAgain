// React
import React, { useRef } from "react";

const SearchBar = ({ searchConfim, urlSearch }: any) => {
  const searchValue = useRef(null);

  return (
    <div className="form-inline md-form form-sm active-cyan-2 mt-2">
      <input
        ref={searchValue}
        onKeyDown={searchConfim}
        defaultValue={urlSearch}
        className="form-control form-control-sm mr-3 w-75"
        tabIndex={0}
        type="text"
        autoFocus
        placeholder="Rechercher un Produit"
        aria-label="Search"
        autoComplete="off"
        style={{ width: "90%" }}
      />
      <i className="fa fa-search" aria-hidden="true"></i>
    </div>
  );
};

export default SearchBar;
