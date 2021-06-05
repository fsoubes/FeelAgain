import { Button } from "@material-ui/core";
import { useAddRecommendationMutation } from "../../../generated/graphql";
import styles from "../../../styles/Comments.module.scss";
import RatingRes from "../../StarRating/RatingRes";

interface CommentsItemProps {
  nickname: string;
  comment: string;
  title: string;
  rating: number;
  id: string;
  isRecommending: boolean;
  recommandedBy: number;
}

const CommentsItem: React.FC<CommentsItemProps> = ({
  nickname,
  comment,
  title,
  rating,
  id,
  isRecommending,
  recommandedBy,
}) => {
  const [recommendation] = useAddRecommendationMutation();

  const handleClick = async () => {
    try {
      await recommendation({ variables: { commentId: id } });
    } catch (err) {
      throw err;
    }
  };

  return (
    <li className={styles.item}>
      <div className={styles.profile}>
        <div className={styles.avatar}>
          <img
            alt="avatar"
            src="https://www.amazon.fr/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png"
          ></img>
        </div>
        <div className={styles.profile__name}>
          <span>{nickname}</span>
        </div>
      </div>
      <div className={styles.header}>
        <RatingRes rating={rating}></RatingRes>
        <span className={styles.header__title}>{title}</span>
      </div>
      <span className={styles.date}>Commenté le 8 avril 2021</span>
      <div className={styles.comment}>
        <span>{comment}</span>
      </div>
      <div className={styles.review}>
        <div>
          {recommandedBy} personne(s) {isRecommending ? "(vous incluant) " : ""}
          ont trouvé cela utile
        </div>
        <div>
          <Button onClick={handleClick}>Utile</Button>
          <Button>Signaler un abus</Button>
        </div>
      </div>
    </li>
  );
};
export default CommentsItem;
