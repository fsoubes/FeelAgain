import React, { Fragment, useEffect, useRef, useState } from "react";
import { debounce } from "@material-ui/core";
import NavigationIcon from "@material-ui/icons/Navigation";
import styles from "../../styles/UpwardScroll.module.scss";

interface UpwardScrollProps {}

const UpwardScroll: React.FC<UpwardScrollProps> = ({}) => {
  const scrollButton = useRef<HTMLButtonElement>(null);

  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const onScroll = (e: any) => {
      setScrolling(
        e.target.documentElement.scrollTop >
          e.target.documentElement.scrollHeight / 6
      );
    };
    window.addEventListener("scroll", debounce(onScroll, 200));
    return () => window.removeEventListener("scroll", debounce(onScroll, 200));
  }, [scrolling]);

  useEffect(() => {
    const handleClick = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    scrollButton?.current?.addEventListener("click", handleClick);
  });

  return (
    <Fragment>
      <div
        className={
          scrolling
            ? `${styles.scroll_top} ${styles.show_button}`
            : `${styles.scroll_top}`
        }
      >
        <button ref={scrollButton}>
          <NavigationIcon></NavigationIcon>
        </button>
      </div>
    </Fragment>
  );
};
export default UpwardScroll;
