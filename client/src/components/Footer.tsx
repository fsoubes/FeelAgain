import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import { Tooltip } from "@material-ui/core";
import { ToggleThemeContext } from "../theme";
import SunIcon from "@material-ui/icons/WbSunnyOutlined";
import MoonIcon from "@material-ui/icons/Brightness2Outlined";
import styles from "../styles/Footer.module.scss";
import Logo from "../svg/feelagain";
import Link from "next/link";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  const { toggleTheme, isDark } = useContext(ToggleThemeContext);
  return (
    <footer>
      <div className={styles.footer}>
        <div
          className={styles.logo}
          style={{
            height: "100%",
            width: "30px",
            display: "flex",
            alignItems: "center",
            position: "relative",
            cursor: "pointer",
          }}
        >
          <Link href="/">
            <div>
              <Logo />
            </div>
          </Link>
        </div>
        <div className={styles.copyright}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            @FeelAgain - 2021
          </a>
          <Tooltip title="Toggle Theme">
            <Button variant="text" color="inherit" onClick={toggleTheme}>
              {isDark ? <SunIcon /> : <MoonIcon />}
            </Button>
          </Tooltip>
        </div>
      </div>
    </footer>
  );
};
