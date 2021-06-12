import dynamic from "next/dynamic";
import { memo, useState, Fragment } from "react";
import { useApolloClient } from "@apollo/client";
import SearchBar from "./UI/SearchBar";
import { GetShoesByNameDocument, SearchResults } from "../../generated/graphql";
import SearchList from "./SearchList/SearchList";
import styles from "../../styles/Search.module.scss";
import Link from "next/link";
import { Button } from "@material-ui/core";
import { SearchProps, Relation } from "../../types/dashboard";

const PopUp = dynamic(() => import("../Modal/modal")); // Good for Modal

const SearchShoes: React.FC<SearchProps> = ({
  children,
  isAdding = false,
  setRelation,
}) => {
  const client = useApolloClient();
  const [data, setData] = useState<SearchResults | null>(null);
  let [selectedId, setSelectedId] = useState<string[] | null>(null);
  const [currentSearch, setCurrentSearch] = useState<String | null>(null);
  const onEnterSearch = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.code === "Enter" || event.keyCode === 13) {
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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const relations = data?.edges.filter(
      (item) => selectedId?.indexOf(item._id) !== -1
    );
    if (setRelation)
      setRelation((prevState) => {
        const updateRelations = [
          ...prevState,
          ...(relations as Relation[]),
        ].filter((v, i, a) => a.findIndex((t) => t._id === v._id) === i);

        return updateRelations;
      });
  };

  return (
    <PopUp
      modalTitle={"Search"}
      isSearch={true}
      reset={setData}
      icon={children}
    >
      <Fragment>
        <SearchBar searchConfim={onEnterSearch}></SearchBar>
        {data && data.edges.length > 0 && (
          <div className={styles.content}>
            <SearchList
              data={data.edges}
              setSelectedId={isAdding ? setSelectedId : undefined}
            ></SearchList>
            {data.edges.length >= 10 && !isAdding && (
              <div className={styles.more}>
                <Link href={`/shop?page=1&search=${currentSearch}`}>
                  <a>
                    {"</>"}Voir plus de résultats {data.totalCount}.
                  </a>
                </Link>
              </div>
            )}
            {isAdding && (
              <div style={{ width: "100%", textAlign: "center" }}>
                <Button
                  disableRipple
                  type="submit"
                  onClick={(event) => handleClick(event)}
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  Confirm
                </Button>
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
