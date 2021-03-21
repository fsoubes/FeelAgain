import React, { memo, useState, Fragment } from "react";
import PopUp from "../Modal/modal";
import { useApolloClient } from "@apollo/client";
import SearchBar from "./UI/SearchBar";
import { GetShoesByNameDocument, SearchResults } from "../../generated/graphql";
import SearchList from "./SearchList/SearchList";

interface SearchProps {}

const SearchShoes: React.FC<SearchProps> = ({}) => {
  const client = useApolloClient();
  const [data, setData] = useState<SearchResults | null>(null);

  const onEnterSearch = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.code === "Enter") {
      event.preventDefault();
      const { data } = await client.query({
        query: GetShoesByNameDocument,
        variables: {
          search: event.currentTarget.value,
        },
      });

      setData(data.getShoesByName as SearchResults);
    }
  };

  return (
    <PopUp modalTitle={"Search"} isSearch={true} reset={setData}>
      <Fragment>
        <SearchBar searchConfim={onEnterSearch}></SearchBar>
        {data && <SearchList data={data.edges}></SearchList>}
      </Fragment>
    </PopUp>
  );
};
export default memo(SearchShoes);
