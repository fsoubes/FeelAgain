import { Star } from "@material-ui/icons";
import React, { useMemo } from "react";
import styles from "../../styles/Rating.module.scss";

interface StarIconProps {
  fill: string;
}
interface RatingIconProps {
  index: number;
  rating: number;
  hoverRating: number;
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
  onSaveRating: (index: number) => void;
}

const StarIcon: React.FC<StarIconProps> = ({ fill }) => {
  return (
    <Star
      className={styles.icon}
      style={{
        fill: fill,
      }}
    />
  );
};

const RatingIcon: React.FC<RatingIconProps> = ({
  index,
  rating,
  hoverRating,
  onMouseEnter,
  onMouseLeave,
  onSaveRating,
}) => {
  const fill = useMemo(() => {
    if (hoverRating >= index) {
      return "orange";
    } else if (!hoverRating && rating >= index) {
      return "orange";
    }
    return "none";
  }, [rating, hoverRating, index]);

  return (
    <div
      className={styles.container__icon}
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={() => onMouseLeave()}
      onClick={() => onSaveRating(index)}
    >
      <StarIcon fill={fill} />
    </div>
  );
};

export default RatingIcon;
