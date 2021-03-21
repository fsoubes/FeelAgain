import React, { memo, useState, Fragment } from "react";
import PopUp from "../Modal/modal";
import { useApolloClient } from "@apollo/client";
import SearchBar from "./UI/SearchBar";
import { GetShoesByNameDocument, SearchResults } from "../../generated/graphql";

interface SearchProps {}

const SearchShoes: React.FC<SearchProps> = ({}) => {
  const client = useApolloClient();
  const [data, setData] = useState<SearchResults | null>(null);

  const onEnterSearch = async (event: any) => {
    if (event.keyCode === 13) {
      event.preventDefault();

      const { data } = await client.query({
        query: GetShoesByNameDocument,
        variables: {
          search: event.target.value,
        },
        fetchPolicy: "network-only",
      });

      setData(data.getShoesByName as SearchResults);
    }
  };

  return (
    <PopUp modalTitle={"Search"} isSearch={true} reset={setData}>
      <Fragment>
        <SearchBar searchConfim={onEnterSearch}></SearchBar>
        {data && data.edges.length > 0 && (
          <div>
            {data.edges.map((item) => {
              return <h1 key={item._id}>{item.title}</h1>;
            })}
          </div>
        )}
      </Fragment>
    </PopUp>
  );
};
export default memo(SearchShoes);
