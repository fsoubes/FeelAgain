import React from "react";
import { Shoes } from "../../../generated/graphql";
import SearchItem from "./SearchItem/SearchItem";

interface SearchListProps {
  data: Shoes[];
}

const SearchList: React.FC<SearchListProps> = ({ data }) => {
  const searchList = data.map((item) => {
    return (
      <SearchItem
        key={item._id}
        title={item.title}
        image={
          item.vendor === "Anaki" ? item.images[2].src : item.images[1].src
        }
        id={item._id}
      ></SearchItem>
    );
  });

  return <ul>{searchList}</ul>;
};
export default SearchList;
