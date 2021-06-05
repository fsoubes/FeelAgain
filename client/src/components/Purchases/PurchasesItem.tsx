import { Link, Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useAddReviewMutation } from "../../generated/graphql";
import styles from "../../styles/CommentPurchases.module.scss";
import RatingIcon from "../StarRating/Rating";

interface PurchasesItemProps {
  reviewId?: string;
  itemId: string;
  shoesId: string;
  src: string;
  contains: boolean;
  title: string;
  currentRating: number;
}

const PurchasesItem: React.FC<PurchasesItemProps> = ({
  reviewId,
  itemId,
  shoesId,
  src,
  contains,
  title,
  currentRating,
}) => {
  const [addComment] = useAddReviewMutation();
  const [rating, setRating] = useState<number>(currentRating);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const onMouseEnter = (index: number) => {
    setHoverRating(index);
  };
  const onMouseLeave = () => {
    setHoverRating(0);
  };
  const onSaveRating = (index: number) => {
    setRating(index);
  };
  useEffect(() => {
    addComment({
      variables: {
        shoesId: shoesId,
        itemId: itemId,
        score: rating,
        ...(reviewId && { reviewId: reviewId }),
      },
    });
  }, [addComment, rating, itemId, reviewId, shoesId]);

  return (
    <li className={styles.purchases__item}>
      <div className={styles.top__image}>
        <div
          className={styles.image}
          style={{
            backgroundImage: `url( ${src} )`,
            backgroundSize: contains ? "contain" : "cover",
          }}
        ></div>
      </div>
      <div className={styles.title}> {title}</div>
      <div style={{ display: "flex" }}>
        {[1, 2, 3, 4, 5].map((index) => {
          return (
            <RatingIcon
              key={index}
              index={index}
              rating={rating}
              hoverRating={hoverRating}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onSaveRating={onSaveRating}
            />
          );
        })}
      </div>
      {rating > 0 && (
        <Link href={`/order/comment/${shoesId}?item=${itemId}`}>
          <div className={styles.action}>
            <Button>Écrire un commentaire</Button>
          </div>
        </Link>
      )}
    </li>
  );
};
export default PurchasesItem;
