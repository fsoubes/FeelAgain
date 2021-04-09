import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { Shoes } from "../../../generated/graphql";
import SearchItem from "./SearchItem/SearchItem";

interface SearchListProps {
  data: Shoes[];
  setSelectedId?:
    | React.Dispatch<React.SetStateAction<string[] | null>>
    | undefined;
}

const SearchList: React.FC<SearchListProps> = ({ data, setSelectedId }) => {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  useEffect(() => {
    refs.current = refs.current.slice(0, data.length);
  }, [data]);

  const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault();

    if (setSelectedId) {
      const selectedId = e.currentTarget.id;
      const CurrentselectedRef = refs.current.filter(
        (item) => item?.id.toString() === selectedId
      );

      if (CurrentselectedRef[0]?.classList.length !== 1) {
        CurrentselectedRef[0]?.classList.add("selected");
      } else {
        CurrentselectedRef[0].classList.remove("selected");
      }

      const selected = refs.current
        .filter((item) => item?.className === "selected")
        .map((item) => item?.id);
      setSelectedId(selected as string[]);
    }
  };

  const newSearch = data.map((item, index) => {
    return (
      <Link href={`/products/${item._id}`} key={item._id}>
        <li
          tabIndex={1}
          id={item._id}
          ref={(el: any) => {
            refs.current[index] = el;
          }}
          onClick={handleClick}
        >
          <div>
            <img
              src={
                item.vendor === "Anaki"
                  ? item.images[2].src
                  : item.images[1].src
              }
              alt=""
            ></img>
          </div>
          <div>
            <div>
              <div>
                <h5>{item.title}</h5>
              </div>
              <div>{item.price}€</div>
            </div>
          </div>
        </li>
      </Link>
    );
  });

  /* const searchList = data.map((item, index) => {
    return (
      <SearchItem
        key={item._id}
        title={item.title}
        image={
          item.vendor === "Anaki" ? item.images[2].src : item.images[1].src
        }
        id={item._id}
        ref={(el: any) => {
          refs.current[index] = el;
        }}
      ></SearchItem>
    );
  }); */

  return <ul>{newSearch}</ul>;
};
export default SearchList;
