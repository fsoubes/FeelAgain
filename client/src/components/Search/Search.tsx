import React, { memo, useState, Fragment } from "react";
import PopUp from "../Modal/modal";
import { useApolloClient } from "@apollo/client";
import SearchBar from "./UI/SearchBar";
import { GetShoesByNameDocument, SearchResults } from "../../generated/graphql";
import SearchList from "./SearchList/SearchList";
import styles from "../../styles/Search.module.scss";
import Link from "next/link";

interface SearchProps {}

const SearchShoes: React.FC<SearchProps> = ({}) => {
  const client = useApolloClient();
  const [data, setData] = useState<SearchResults | null>(null);
  const [currentSearch, setCurrentSearch] = useState<String | null>(null);
  const onEnterSearch = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.code === "Enter") {
      event.preventDefault();
      setCurrentSearch(event.currentTarget.value);
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
        {data && data.edges.length > 0 && (
          <div className={styles.content}>
            <SearchList data={data.edges}></SearchList>
            {data.edges.length >= 10 && (
              <div className={styles.more}>
                <Link href={`/shop?search=${currentSearch}`}>
                  <a>
                    {"</>"}Voir plus de résultats {data.totalCount}.
                  </a>
                </Link>
              </div>
            )}
          </div>
        )}
        {data && data.edges.length === 0 && <h5>Aucun résultat</h5>}
      </Fragment>
    </PopUp>
  );
};
export default memo(SearchShoes);
