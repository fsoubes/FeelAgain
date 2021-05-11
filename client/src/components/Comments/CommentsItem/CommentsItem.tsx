import { Button } from "@material-ui/core";
import React from "react";
import styles from "../../../styles/Comments.module.scss";
import RatingRes from "../../StarRating/RatingRes";

interface CommentsItemProps {}

const CommentsItem: React.FC<CommentsItemProps> = ({}) => {
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
          <span>Bob</span>
        </div>
      </div>
      <div className={styles.header}>
        <RatingRes rating={5}></RatingRes>
        <span className={styles.header__title}>
          Attention lors de la réception
        </span>
      </div>
      <span className={styles.date}>Commenté le 8 avril 2021</span>
      <div className={styles.comment}>
        <span>
          Très déçu de la réception des chaussures.
          <br />
          Comme on peut le voir sur les photos, coin haut arrière droit corné
          plus la couverture pas droite.
        </span>
      </div>
      <div className={styles.review}>
        <div>8 personnes ont trouvé cela utile</div>
        <div>
          <Button>Utile</Button>
          <Button>Signaler un abus</Button>
        </div>
      </div>
    </li>
  );
};
export default CommentsItem;
