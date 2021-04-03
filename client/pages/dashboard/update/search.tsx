import { useApolloClient } from "@apollo/client";
import Link from "next/link";
import React, { useState } from "react";
import SearchBar from "../../../src/components/Search/UI/SearchBar";
import {
  SearchResults,
  GetShoesByNameDocument,
} from "../../../src/generated/graphql";
import styles from "../../../src/styles/Search.module.scss";
import styleDash from "../../../src/styles/DashBoardSearch.module.scss";
import ProductsList from "../../../src/components/Products/ProductsList";

interface SearchProps {}

const Search: React.FC<SearchProps> = ({}) => {
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
    <div className={styleDash.search}>
      <SearchBar searchConfim={onEnterSearch}></SearchBar>
      <div className={styleDash.container}>
        {data && data.edges.length > 0 && <ProductsList shoes={data.edges} />}
        {data && data.edges.length === 0 && <h1>Aucun résultat</h1>}
      </div>
    </div>
  );
};
export default Search;
