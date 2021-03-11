import React, { ReactElement, useContext, Fragment, useState } from "react";
import { useApolloClient } from "@apollo/client";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Link from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { ToggleThemeContext } from "../theme";
import Logo from "../svg/feelagain";
import { isServer } from "../utils/isServer";
import styles from "../styles/TopBar.module.scss";
import MenuIcon from "@material-ui/icons/Menu";
import useResponsive from "../utils/useResponsive";
import { makeStyles } from "@material-ui/core/styles";
import { NAME } from "../constants/constants";

const useStyles = makeStyles({
  show: {
    transform: "translateY(0)",
    transition: "transform .5s",
  },
  hide: {
    transform: "translateY(-110%)",
    transition: "transform .5s",
  },
});

export const TopBar = (): ReactElement => {
  const trigger = useScrollTrigger();
  const classes = useStyles();

  const { isTabletorMobile } = useResponsive();

  const { isDark } = useContext(ToggleThemeContext);
  const client = useApolloClient();
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const { data } = useMeQuery({
    skip: isServer(),
  });

  const [open, setOpen] = useState(false);

  const menuStyling = !isTabletorMobile
    ? {
        notlog: { border: "1px solid white ", borderRadius: "6px" },
        log: {
          marginLeft: "1rem",
          border: "1px solid white ",
          borderRadius: "6px",
        },
      }
    : {};

  const logged = (
    <Fragment>
      <Link href="/login">
        <Button
          variant="text"
          color="inherit"
          style={{ marginRight: "0.5rem" }}
        >
          Sign in
        </Button>
      </Link>
      <Link href="/register">
        <Button variant="text" color="inherit" style={menuStyling.notlog}>
          Sign up
        </Button>
      </Link>
    </Fragment>
  );

  const unloged = (
    <Fragment>
      {!isTabletorMobile && (
        <Link href={`/profile/${data?.me?.nickname}`}>
          {data?.me?.nickname}
        </Link>
      )}
      {isTabletorMobile && (
        <Link href={`/profile/${data?.me?.nickname}`}>
          <Button variant="text" color="inherit">
            Profile
          </Button>
        </Link>
      )}
      <Button
        className={styles.navbar__auth_logout}
        onClick={async () => {
          await logout();
          await client.resetStore();
        }}
        variant="text"
        color="inherit"
        style={menuStyling.log}
      >
        Logout
      </Button>
    </Fragment>
  );

  return (
    <AppBar className={trigger ? classes.hide : classes.show} position="sticky">
      <Toolbar className={styles.navbar__content}>
        <div className={styles.navbar__logo}>
          <Link href="/">
            <div
              style={{
                height: "100%",
                width: "30px",
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Logo />
            </div>
          </Link>

          <Button className={styles.hamburger} onClick={() => setOpen(!open)}>
            <MenuIcon />
          </Button>
        </div>
        <div
          className={
            !open && isTabletorMobile
              ? `${styles.hide}`
              : `${styles.navbar__links}`
          }
        >
          <Link href="/dashboard">
            <Button variant="text" color="inherit">
              &nbsp;Article
            </Button>
          </Link>

          <Link href="/topics">
            <Button variant="text" color="inherit">
              &nbsp;STUDIO
            </Button>
          </Link>

          <Link href="/topics">
            <Button variant="text" color="inherit">
              &nbsp;CONTACT
            </Button>
          </Link>
          {isTabletorMobile && (
            <Fragment>{!data?.me ? logged : unloged}</Fragment>
          )}
        </div>
        {!isTabletorMobile && (
          <div className={styles.navbar__auth}>
            <Fragment>{!data?.me ? logged : unloged}</Fragment>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};
