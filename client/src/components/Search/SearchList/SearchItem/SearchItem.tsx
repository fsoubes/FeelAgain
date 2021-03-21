import React from "react";

interface SearchItemProps {
  title: string;
}

const SearchItem: React.FC<SearchItemProps> = ({ title }) => {
  return <h1>{title}</h1>;
};
export default SearchItem;
