import React from "react";
import { Shoes } from "../../../generated/graphql";
import SearchItem from "./SearchItem/SearchItem";

interface SearchListProps {
  data: Shoes[];
}

const SearchList: React.FC<SearchListProps> = ({ data }) => {
  const searchList = data.map((item) => {
    return <SearchItem key={item._id} title={item.title}></SearchItem>;
  });

  return <div>{searchList}</div>;
};
export default SearchList;
