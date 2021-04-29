import React from "react";
import styles from "../../styles/Timeline.module.scss";

interface TimelineProps {}

const Timeline: React.FC<TimelineProps> = ({}) => {
  return (
    <div className={styles.container}>
      <div className={styles.trackfield}>
        <div className={styles.trackfield__inner}>
          <div className={styles.trackfield__left}>
            <span className={styles.milestone__bar}>
              <span className={styles.bar_background}></span>
              <span className={styles.bar_foreground_final}></span>
            </span>
            <span className={styles.milestone__maker_reached}></span>
          </div>
          <div className={styles.trackfield__right}>
            <div className={styles.trackfield__right_inner}>
              <div className={styles.content}>
                <span className={styles.text__reached}>
                  Commandé le 11 mars
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.trackfield}>
        <div className={styles.trackfield__inner}>
          <div className={styles.trackfield__left}>
            <span className={styles.milestone__bar}>
              <span className={styles.bar_background}></span>
              <span className={styles.bar_foreground_reached}></span>
            </span>
            <span className={styles.milestone__maker_reached}></span>
          </div>
          <div className={styles.trackfield__right}>
            <div className={styles.trackfield__right_inner}>
              <div className={styles.content}>
                <span className={styles.text__reached}>Expédié</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.trackfield}>
        <div className={styles.trackfield__inner}>
          <div className={styles.trackfield__left}>
            <span className={styles.milestone__bar}>
              <span className={styles.bar_background}></span>
              <span className={styles.bar_foreground}></span>
            </span>
            <span className={styles.milestone__maker}></span>
          </div>
          <div className={styles.trackfield__right}>
            <div className={styles.trackfield__right_inner}>
              <div className={styles.content}>
                <span className={styles.text}>En cours de Livraison</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.trackfield}>
        <div className={styles.trackfield__inner}>
          <div className={styles.trackfield__left}>
            <span className={styles.milestone__maker}></span>
          </div>
          <div className={styles.trackfield__right}>
            <div className={styles.trackfield__right_inner}>
              <div className={styles.content}>
                <span className={styles.text}>
                  Livraison prévue 14 mai - 23 juin
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Timeline;
