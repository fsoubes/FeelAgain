import { StarIcon } from "./Rating";
import StarHalfIcon from "@material-ui/icons/StarHalf";

interface RatingResProps {
  rating: number;
  isLanding?: boolean;
}

const roundHalf = (num: number) => Math.round(num * 2) / 2;

const StarHalf: React.FC = ({}) => {
  return (
    <StarHalfIcon
      style={{
        fill: "orange",
        stroke: "orange",
      }}
    />
  );
};

const RatingRes: React.FC<RatingResProps> = ({ rating, isLanding = false }) => {
  return (
    <div style={{ display: "flex" }}>
      {[0, 1, 2, 3, 4].map((item) => {
        return item + 0.5 === roundHalf(rating) ? (
          <StarHalf key={item}></StarHalf>
        ) : (
          <StarIcon
            key={item}
            fill={item < roundHalf(rating) ? "orange" : "none"}
            isLanding={isLanding}
          ></StarIcon>
        );
      })}
    </div>
  );
};
export default RatingRes;
