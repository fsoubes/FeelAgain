import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import { Tooltip } from "@material-ui/core";
import { ToggleThemeContext } from "../theme";
import SunIcon from "@material-ui/icons/WbSunnyOutlined";
import MoonIcon from "@material-ui/icons/Brightness2Outlined";
import styles from "../styles/Footer.module.scss";
import { NAME } from "../constants/constants";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  const { toggleTheme, isDark } = useContext(ToggleThemeContext);
  return (
    <footer>
      <div className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          @ {NAME} - 2021
        </a>
        <Tooltip title="Toggle Theme">
          <Button variant="text" color="inherit" onClick={toggleTheme}>
            {isDark ? <SunIcon /> : <MoonIcon />}
          </Button>
        </Tooltip>
      </div>
    </footer>
  );
};
