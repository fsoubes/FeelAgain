import React from "react";
import Link from "next/link";

interface SearchItemProps {
  title: string;
  image: string;
  price?: number;
  id: string;
}

const SearchItem: React.FC<SearchItemProps> = ({
  title,
  image,
  price = 50,
  id,
}) => {
  return (
    <Link href={`/products/${id}`}>
      <li>
        <div>
          <img src={image} alt=""></img>
        </div>
        <div>
          <h5>{title}</h5>
          <div>{price}€</div>
        </div>
      </li>
    </Link>
  );
};
export default SearchItem;
