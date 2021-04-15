import React from "react";
import { useRouter } from "next/router";
import Tilt from "../../../Tilt/Tilt";
import CancelIcon from "@material-ui/icons/Cancel";
import { Button } from "@material-ui/core";
import LazyLoadWrapper from "../../../LazyLoad/LazyLoadWrapper";

interface ProductItemProps {
  isTilt: Boolean;
  path: string;
  src: string;
  title: string;
  price: number;
  id: string;
  remove?:
    | ((
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        id: string
      ) => Promise<void>)
    | undefined;
}

const ProductItemDash: React.FC<ProductItemProps> = ({
  src,
  title,
  price,
  id,
  remove,
  path,
  isTilt,
}) => {
  const router = useRouter();
  return (
    <div
      onClick={(event) => {
        router.push(`/products/${id}`);
        event.stopPropagation();
      }}
    >
      <Tilt style={{ cursor: "pointer" }} isTilt={isTilt}>
        <LazyLoadWrapper>
          <div style={{ backgroundImage: `url( ${src} )` }}>
            <Button
              disableRipple
              onClick={(event) => (remove ? remove(event, id) : null)}
            >
              {remove && <CancelIcon />}
            </Button>

            <Button
              disableRipple
              onClick={(event) => {
                router.push(path ? `${path}${id}` : `/dashboard/update/${id}`);
                event.stopPropagation();
              }}
            >
              {remove ? "Modifier" : "Aperçu"}
            </Button>
          </div>
        </LazyLoadWrapper>
      </Tilt>
      <div style={{ textAlign: "center" }}>
        <h3>
          <span>{title}</span>
        </h3>
        <span>{price}€</span>
      </div>
    </div>
  );
};
export default ProductItemDash;
