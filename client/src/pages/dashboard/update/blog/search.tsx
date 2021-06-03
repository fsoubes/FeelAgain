import React, { Fragment, useEffect, useState } from "react";
import SearchBar from "../../../../components/Search/UI/SearchBar";
import { useGetShoesQuery } from "../../../../generated/graphql";
import styleDash from "../../../../styles/DashBoardSearch.module.scss";
import { useRouter } from "next/router";
import { NextPage } from "next";

interface SearchProps {
  page?: number;
  search: string;
}

const Search: NextPage<SearchProps> = ({ page, search }) => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(page as number);

  useEffect(() => {
    setCurrentPage(parseInt(router.query.page as string));
  }, []);

  const [currentSearch, setSearch] = useState<string>(search ? search : "");

  let { data, refetch } = useGetShoesQuery({
    variables: {
      limit: 15,
      page: currentPage ? currentPage : 1,
      search: currentSearch,
    },
    skip: !currentSearch,
  });

  const onEnterSearch = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.code === "Enter") {
      event.preventDefault();
      setSearch(event.currentTarget.value);
      router.push(
        {
          pathname: router.pathname,
          query: {
            page: page,
            search: currentSearch,
          },
        },
        page
          ? `/dashboard/update/search?page=${page}&search=${currentSearch}`
          : `/dashboard/update/search?search=${currentSearch}`,
        { shallow: true }
      );
    }
  };

  return (
    <div className={styleDash.search}>
      <SearchBar searchConfim={onEnterSearch} urlSearch={search}></SearchBar>
      {data && (
        <div className={styleDash.container}>
          {data && data.getFilterShoes?.edges.length > 0 ? (
            <Fragment></Fragment>
          ) : (
            <h1>Aucun résultat</h1>
          )}
        </div>
      )}
    </div>
  );
};

Search.getInitialProps = async ({ query: { page, search } }) => {
  return { page: parseInt(page as string), search: search as string };
};

export default Search;
