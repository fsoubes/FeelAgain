import { useApolloClient } from "@apollo/client";
import React, { ReactElement, Fragment, useState, useEffect } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Link from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import Logo from "../svg/feelagain";
import { isServer } from "../utils/isServer";
import styles from "../styles/TopBar.module.scss";
import MenuIcon from "@material-ui/icons/Menu";
import useResponsive from "../utils/useResponsive";
import { makeStyles } from "@material-ui/core/styles";
import SearchShoes from "./Search/Search";
import Basket from "../svg/basket";
import SearchIcon from "@material-ui/icons/Search";

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
  const client = useApolloClient();
  const [logout] = useLogoutMutation();
  const { data } = useMeQuery({
    skip: isServer(),
  });

  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   if (open) {
  //     document.documentElement.style.overflow = "hidden";
  //     document.body.style.overflow = "hidden";
  //   }
  //   return () => {
  //     document.documentElement.style.overflow = "scroll";
  //     document.body.style.overflow = "unset";
  //   };
  // }, [open]);

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
      <Link href="/connexion">
        <Button
          variant="text"
          color="inherit"
          style={{ marginRight: "0.5rem" }}
        >
          Connexion
        </Button>
      </Link>
      <Link href="/inscription">
        <Button variant="text" color="inherit" style={menuStyling.notlog}>
          Inscription
        </Button>
      </Link>
    </Fragment>
  );

  const unloged = (
    <Fragment>
      {!isTabletorMobile && (
        <Link href={`/profile/${data?.me?.nickname}`}>
          <Button
            variant="text"
            color="inherit"
            style={{
              fontSize: "0.7rem",
              lineHeight: "1.25",
            }}
          >
            Bonjour {data?.me?.nickname}
            <br />
            Mon Compte
          </Button>
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
        Deconnexion
      </Button>
    </Fragment>
  );

  return (
    <AppBar className={trigger ? classes.hide : classes.show} position="sticky">
      <Toolbar className={styles.navbar__content}>
        <div className={styles.navbar__left}>
          <Link href="/">
            <div
              style={{
                height: "100%",
                width: "30px",
                display: "flex",
                alignItems: "center",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <Logo />
            </div>
          </Link>

          <div className={styles.hamburger}>
            <SearchShoes>
              <SearchIcon />
            </SearchShoes>
            <Link href="/">
              <Button>
                {data && (
                  <Basket
                    total={data?.me?.items ? (data?.me?.items as number) : 0}
                  />
                )}
              </Button>
            </Link>
            <Button style={{ color: "white" }} onClick={() => setOpen(!open)}>
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
            <Link href="/shop">
              <Button variant="text" color="inherit">
                &nbsp;Shop
              </Button>
            </Link>

            <Link href="/blog">
              <Button variant="text" color="inherit">
                &nbsp;Blog
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
        </div>
        {!isTabletorMobile && (
          <div className={styles.navbar__right}>
            <div className={styles.search}>
              <SearchShoes>
                <SearchIcon />
              </SearchShoes>
              <Link href="/panier">
                <Button>
                  {data && (
                    <Basket
                      total={data?.me?.items ? (data?.me?.items as number) : 0}
                    />
                  )}
                </Button>
              </Link>
            </div>
            <div className={styles.navbar__auth}>
              <Fragment>{!data?.me ? logged : unloged}</Fragment>
            </div>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};
