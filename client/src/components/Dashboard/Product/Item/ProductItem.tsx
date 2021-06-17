import { useRouter } from "next/router";
import Tilt from "../../../Tilt/Tilt";
import CancelIcon from "@material-ui/icons/Cancel";
import { Button } from "@material-ui/core";
import LazyLoadWrapper from "../../../LazyLoad/LazyLoadWrapper";
import RatingRes from "../../../StarRating/RatingRes";
import { useIncrementCountViewMutation } from "../../../../generated/graphql";

interface ProductItemProps {
  isTilt: Boolean;
  path: string;
  src?: string;
  title: string;
  price: number;
  id: string;
  score?: number;
  scoredBy?: number;
  contain?: boolean;
  remove?:
    | ((
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        id: string
      ) => boolean)
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
  contain,
}) => {
  const router = useRouter();
  const [incrementCount] = useIncrementCountViewMutation();
  return (
    <div>
      <div
        onClick={async (event) => {
          router.push(`/products/${id}`);
          if (!remove) await incrementCount({ variables: { shoeId: id } });
          event.stopPropagation();
        }}
      >
        <Tilt style={{ cursor: "pointer" }} isTilt={isTilt}>
          <LazyLoadWrapper>
            <div
              style={{
                backgroundImage: `url( ${src} )`,
                backgroundSize: contain ? "contain" : "cover",
                ...(isTilt === false && { boxShadow: "none" }),
              }}
            >
              <Button
                disableRipple
                onClick={(event) => (remove ? remove(event, id) : null)}
              >
                {remove && <CancelIcon />}
              </Button>
              <Button
                disableRipple
                onClick={async (event) => {
                  router.push(
                    path ? `${path}${id}` : `/dashboard/update/${id}`
                  );
                  event.stopPropagation();
                }}
              >
                {remove ? "Modifier" : "Aperçu"}
              </Button>
              {!remove && (scoredBy as number) > 0 && (
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
      </div>
      <div style={{ textAlign: "center" }}>
        <h3
          style={{ cursor: "pointer" }}
          onClick={async (event) => {
            router.push(`/products/${id}`);
            if (!remove) await incrementCount({ variables: { shoeId: id } });
            event.stopPropagation();
          }}
        >
          <span>{title}</span>
        </h3>
        {price && <span>{price}€</span>}
      </div>
    </div>
  );
};
export default ProductItemDash;
