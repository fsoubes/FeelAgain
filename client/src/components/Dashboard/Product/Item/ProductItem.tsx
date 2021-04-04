import React from "react";
import { useRouter } from "next/router";
import Tilt from "../../../Tilt/Tilt";
import CancelIcon from "@material-ui/icons/Cancel";
import { Button } from "@material-ui/core";

interface ProductItemProps {
  src: string;
  title: string;
  price: number;
  id: string;
  remove: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => Promise<void>;
}

const ProductItemDash: React.FC<ProductItemProps> = ({
  src,
  title,
  price,
  id,
  remove,
}) => {
  const router = useRouter();
  return (
    <div>
      <Tilt style={{ cursor: "pointer" }}>
        <div style={{ backgroundImage: `url( ${src} )` }}>
          <Button disableRipple onClick={(event) => remove(event, id)}>
            <CancelIcon />
          </Button>
          <Button
            disableRipple
            onClick={(event) => {
              router.push(`/dashboard/update/${id}`);
              event.stopPropagation();
            }}
          >
            Modifier
          </Button>
        </div>
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
