import React from "react";
import styles from "../../styles/Timeline.module.scss";

interface TimelineProps {
  timeline?: number;
  signature?: boolean;
}

const Timeline: React.FC<TimelineProps> = ({
  timeline = 0,
  signature = false,
}) => {
  const step = {
    ordered: timeline >= 0 || true,
    oncharge: timeline >= 1 || false,
    sent: timeline >= 2 || false,
    ongoing: timeline >= 3 || false,
    delivered: timeline >= 4 || false,
  };

  return (
    <div className={styles.container}>
      <div className={styles.trackfield}>
        <div className={styles.trackfield__inner}>
          <div className={styles.trackfield__left}>
            <span className={styles.milestone__bar}>
              <span className={styles.bar_background}></span>
              <span
                className={
                  step.oncharge
                    ? styles.bar_foreground_final
                    : styles.bar_foreground_reached
                }
              ></span>
            </span>
            <span
              className={
                step.ordered
                  ? styles.milestone__maker_reached
                  : styles.milestone__maker
              }
            ></span>
          </div>
          <div className={styles.trackfield__right}>
            <div className={styles.trackfield__right_inner}>
              <div className={styles.content}>
                <span
                  className={step.ordered ? styles.text__reached : styles.text}
                >
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
              <span
                className={
                  !step.oncharge
                    ? styles.bar_foreground
                    : step.sent
                    ? styles.bar_foreground_final
                    : styles.bar_foreground_reached
                }
              ></span>
            </span>
            <span
              className={
                step.oncharge
                  ? styles.milestone__maker_reached
                  : styles.milestone__maker
              }
            ></span>
          </div>
          <div className={styles.trackfield__right}>
            <div className={styles.trackfield__right_inner}>
              <div className={styles.content}>
                <span
                  className={step.oncharge ? styles.text__reached : styles.text}
                >
                  Pris en charge
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
              <span
                className={
                  !step.sent
                    ? styles.bar_foreground
                    : step.ongoing
                    ? styles.bar_foreground_final
                    : styles.bar_foreground_reached
                }
              ></span>
            </span>
            <span
              className={
                step.sent
                  ? styles.milestone__maker_reached
                  : styles.milestone__maker
              }
            ></span>
          </div>
          <div className={styles.trackfield__right}>
            <div className={styles.trackfield__right_inner}>
              <div className={styles.content}>
                <span
                  className={step.sent ? styles.text__reached : styles.text}
                >
                  Expédié
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
              <span
                className={
                  !step.ongoing
                    ? styles.bar_foreground
                    : step.delivered
                    ? styles.bar_foreground_final
                    : styles.bar_foreground_reached
                }
              ></span>
            </span>
            <span
              className={
                step.ongoing
                  ? styles.milestone__maker_reached
                  : styles.milestone__maker
              }
            ></span>
          </div>
          <div className={styles.trackfield__right}>
            <div className={styles.trackfield__right_inner}>
              <div className={styles.content}>
                <span
                  className={step.ongoing ? styles.text__reached : styles.text}
                >
                  En cours de Livraison
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.trackfield}>
        <div className={styles.trackfield__inner}>
          <div className={styles.trackfield__left}>
            <span
              className={
                step.delivered
                  ? styles.milestone__maker_reached
                  : styles.milestone__maker
              }
            ></span>
          </div>
          <div className={styles.trackfield__right}>
            <div className={styles.trackfield__right_inner}>
              <div className={styles.content}>
                <span
                  className={
                    step.delivered ? styles.text__reached : styles.text
                  }
                >
                  {signature ? "Livré" : "Disponible en point relais"}
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
