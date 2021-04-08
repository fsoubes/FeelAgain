import React from "react";
import Link from "next/link";

interface SearchItemProps {
  title: string;
  image: string;
  price?: number;
  id: string;
  handleClick?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  ref?: HTMLLIElement | null;
}

const SearchItem: React.FC<SearchItemProps> = ({
  title,
  image,
  price = 50,
  id,
  handleClick,
  ref,
}) => {
  return (
    <Link href={`/products/${id}`}>
      <li onClick={(e) => console.log("hello")}>
        <div>
          <img src={image} alt=""></img>
        </div>
        <div>
          <div>
            <div>
              <h5>{title}</h5>
            </div>
            <div>{price}€</div>
          </div>
        </div>
      </li>
    </Link>
  );
};
export default SearchItem;
