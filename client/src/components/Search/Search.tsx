import React, { memo, useState } from "react";
import PopUp from "../Modal/modal";
import { useApolloClient } from "@apollo/client";
import SearchBar from "./UI/SearchBar";

interface SearchProps {}

const SearchShoes: React.FC<SearchProps> = ({}) => {
  const client = useApolloClient();
  const [data, setData] = useState(null);

  const onEnterSearch = async (event: any) => {
    if (event.keyCode === 13) {
      event.preventDefault();

      /* const { data } = await client.query({
        query: SEARCH_SERIES,
        variables: {
          name: event.target.value,
        },
        fetchPolicy: "network-only",
      });

      setData(data); */
    }
  };

  return (
    <PopUp modalTitle={"Search"} isSearch={true}>
      <SearchBar searchConfim={onEnterSearch}></SearchBar>
    </PopUp>
  );
};
export default memo(SearchShoes);
