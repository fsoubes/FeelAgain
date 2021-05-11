import React from "react";
import styles from "../../styles/ScoreShoes.module.scss";
import RatingRes from "../StarRating/RatingRes";

interface ScoreShoesProps {}

const ScoreShoes: React.FC<ScoreShoesProps> = ({}) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Avis global</h2>
      </div>
      <div className={styles.score__container}>
        <div className={styles.score__header}>
          <RatingRes rating={5}></RatingRes>
          <h2>5 sur 5</h2>
        </div>
        <div className={styles.score__by}>155 évaluations</div>
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
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </td>
                <td>
                  <span>&nbsp;&nbsp;</span>
                  <span>85%</span>
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
                      style={{ width: "10%" }}
                    ></div>
                  </div>
                </td>
                <td>
                  <span>&nbsp;&nbsp;</span>
                  <span>10%</span>
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
                      style={{ width: "2%" }}
                    ></div>
                  </div>
                </td>
                <td>
                  <span>&nbsp;&nbsp;</span>
                  <span>2%</span>
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
                      style={{ width: "2%" }}
                    ></div>
                  </div>
                </td>
                <td>
                  <span>&nbsp;&nbsp;</span>
                  <span>2%</span>
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
                      style={{ width: "1%" }}
                    ></div>
                  </div>
                </td>
                <td>
                  <span>&nbsp;&nbsp;</span>
                  <span>1%</span>
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
