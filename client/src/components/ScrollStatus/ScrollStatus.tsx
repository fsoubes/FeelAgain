import { useState, useEffect } from "react";

interface ScrollStatusProps {
  articleRef: React.MutableRefObject<HTMLInputElement>;
}

import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles({
  barColorPrimary: {
    backgroundColor: "darkorange",
  },
  root: {
    position: "fixed",
    width: "100%",
    bottom: "0",
    zIndex: 9,
    marginLeft: "-14px",
  },
});

const ScrollStatus: React.FC<ScrollStatusProps> = ({ articleRef }) => {
  const classes = useStyles();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let computeProgress = (): void => {
      const scrollBottom = articleRef?.current.getBoundingClientRect().bottom;
      const height = articleRef?.current.getBoundingClientRect().height;
      const offsetTop = articleRef?.current.offsetTop + 100;

      if (
        articleRef &&
        typeof articleRef.current === "object" &&
        scrollBottom - window.innerHeight < 0
      ) {
        return;
      }

      const scrolled = document.documentElement.scrollTop - offsetTop;
      const scrollLength = height - offsetTop + 150;
      const progress = (100 * scrolled) / scrollLength;

      setProgress(progress > 100 ? 100 : progress);
    };

    window.addEventListener("scroll", computeProgress);

    return () => window.removeEventListener("scroll", computeProgress);
  });

  return (
    <div className={classes.root}>
      <LinearProgress
        role={"progressbar"}
        variant="determinate"
        aria-label={"Article Progression"}
        classes={{
          barColorPrimary: classes.barColorPrimary,
        }}
        value={progress}
      />
    </div>
  );
};
export default ScrollStatus;
