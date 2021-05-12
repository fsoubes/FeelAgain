import React from "react";
import styles from "../../styles/ScoreShoes.module.scss";
import RatingRes from "../StarRating/RatingRes";

interface ScoreShoesProps {
  score_1: string;
  score_2: string;
  score_3: string;
  score_4: string;
  score_5: string;
  score: number;
  scored_by: number;
}

const ScoreShoes: React.FC<ScoreShoesProps> = ({
  score_1,
  score_2,
  score_3,
  score_4,
  score_5,
  score,
  scored_by,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Avis global</h2>
      </div>
      <div className={styles.score__container}>
        <div className={styles.score__header}>
          <RatingRes rating={5}></RatingRes>
          <h2>{score} sur 5</h2>
        </div>
        <div className={styles.score__by}>{scored_by} évaluations</div>
        <div className={styles.score__histogram}>
          <table>
            <tbody>
              <tr>
                <td>
                  <span>5 étoiles</span>
                  <span>&nbsp;&nbsp;</span>
                </td>
                <td className={styles.meter__container}>
                  <div className={styles.meter}>
                    <div
                      className={styles.meter__bar}
                      style={{ width: score_5 }}
                    ></div>
                  </div>
                </td>
                <td>
                  <span>&nbsp;&nbsp;</span>
                  <span>{score_5}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>4 étoiles</span>
                  <span>&nbsp;&nbsp;</span>
                </td>
                <td className={styles.meter__container}>
                  <div className={styles.meter}>
                    <div
                      className={styles.meter__bar}
                      style={{ width: score_4 }}
                    ></div>
                  </div>
                </td>
                <td>
                  <span>&nbsp;&nbsp;</span>
                  <span>{score_4}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>3 étoiles</span>
                  <span>&nbsp;&nbsp;</span>
                </td>
                <td className={styles.meter__container}>
                  <div className={styles.meter}>
                    <div
                      className={styles.meter__bar}
                      style={{ width: score_3 }}
                    ></div>
                  </div>
                </td>
                <td>
                  <span>&nbsp;&nbsp;</span>
                  <span>{score_3}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>2 étoiles</span>
                  <span>&nbsp;&nbsp;</span>
                </td>
                <td className={styles.meter__container}>
                  <div className={styles.meter}>
                    <div
                      className={styles.meter__bar}
                      style={{ width: score_2 }}
                    ></div>
                  </div>
                </td>
                <td>
                  <span>&nbsp;&nbsp;</span>
                  <span>{score_2}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>1 étoiles</span>
                  <span>&nbsp;&nbsp;</span>
                </td>
                <td className={styles.meter__container}>
                  <div className={styles.meter}>
                    <div
                      className={styles.meter__bar}
                      style={{ width: score_1 }}
                    ></div>
                  </div>
                </td>
                <td>
                  <span>&nbsp;&nbsp;</span>
                  <span>{score_1}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ScoreShoes;
