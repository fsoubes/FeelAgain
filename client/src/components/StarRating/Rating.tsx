import { Star } from "@material-ui/icons";
import { useMemo } from "react";
import styles from "../../styles/Rating.module.scss";

interface StarIconProps {
  fill: string;
  isLanding?: boolean;
}
interface RatingIconProps {
  index: number;
  rating: number;
  hoverRating?: number;
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
  onSaveRating: (index: number) => void;
}

export const StarIcon: React.FC<StarIconProps> = ({
  fill,
  isLanding = false,
}) => {
  return (
    <Star
      className={styles.icon}
      style={{
        fill: fill,
        stroke: "orange",
        ...(isLanding && {
          marginRight: "1rem",
        }),
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
    if ((hoverRating as number) >= index) {
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
