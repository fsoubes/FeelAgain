import React from "react";
import { useRouter } from "next/router";
import Tilt from "../../../Tilt/Tilt";
import CancelIcon from "@material-ui/icons/Cancel";
import { Button } from "@material-ui/core";
import LazyLoadWrapper from "../../../LazyLoad/LazyLoadWrapper";
import RatingIcon from "../../../StarRating/Rating";
import RatingRes from "../../../StarRating/RatingRes";
import { useIncrementCountViewMutation } from "../../../../generated/graphql";

interface ProductItemProps {
  isTilt: Boolean;
  path: string;
  src: string;
  title: string;
  price: number;
  id: string;
  score?: number;
  scoredBy?: number;
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
  score,
  scoredBy,
}) => {
  const router = useRouter();
  const [incrementCount] = useIncrementCountViewMutation();

  return (
    <div
      onClick={async (event) => {
        router.push(`/products/${id}`);
        if (!remove) await incrementCount({ variables: { shoeId: id } });
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
              onClick={async (event) => {
                router.push(path ? `${path}${id}` : `/dashboard/update/${id}`);
                event.stopPropagation();
              }}
            >
              {remove ? "Modifier" : "Aperçu"}
            </Button>
            {!remove && (
              <div>
                <RatingRes rating={score as number} />
                <span>
                  {score} pour {scoredBy} utilisateurs
                </span>
              </div>
            )}
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
