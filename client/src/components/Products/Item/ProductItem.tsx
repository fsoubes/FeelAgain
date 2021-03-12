import React from "react";
import Tilt from "../../Tilt/Tilt";
import { useRouter } from "next/router";

interface ProductItemProps {
  src: string;
  title: string;
  price: string;
  id: string;
}

const ProductItem: React.FC<ProductItemProps> = ({ src, title, price, id }) => {
  const router = useRouter();
  return (
    <div onClick={() => router.push(`products/${id}`)}>
      <Tilt style={{ cursor: "pointer" }}>
        <img alt="Shoes Picture" loading="lazy" src={src}></img>
      </Tilt>
      <div>
        <h3>
          <span>{title}</span>
        </h3>
        <span>{price}€</span>
      </div>
    </div>
  );
};
export default ProductItem;
