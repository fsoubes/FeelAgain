import { useApolloClient } from "@apollo/client";
import {
  ReactElement,
  Fragment,
  useState,
  useEffect,
  useRef,
  memo,
} from "react";
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
import SubMenu from "./SubMenu/SubMenu";
import { debounce } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import BackDropShadow from "./BackDrop/BackDropShadow";

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

interface TopBarProps {
  isBasket?: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ isBasket }): ReactElement => {
  const trigger = useScrollTrigger();
  const classes = useStyles();
  const { isTabletorMobile } = useResponsive();
  const client = useApolloClient();
  const [logout] = useLogoutMutation();
  const { data } = useMeQuery({
    skip: isServer(),
  });

  const handleLogout = async () => {
    await logout();
    await client.resetStore();
  };

  const [open, setOpen] = useState(false);

  const [triggerSubMenu, setTrigger] = useState<boolean>(false);
  const subMenuRef = useRef<HTMLDivElement>(null);

  const subMenu = {
    commandes: "/order",
    panier: "/panier",
    evaluer: "/order/comments",
    deconnexion: "",
  };

  useEffect(() => {
    subMenuRef?.current?.addEventListener(
      "mouseenter",
      debounce(() => setTrigger(true), 200)
    );
    subMenuRef?.current?.addEventListener(
      "mouseleave",
      debounce(() => setTrigger(false), 200)
    );

    return () => {
      subMenuRef?.current?.removeEventListener("mouseenter", () =>
        debounce(() => setTrigger(true), 200)
      );
      subMenuRef?.current?.removeEventListener("mouseleave", () =>
        debounce(() => setTrigger(false), 200)
      );
    };
  });

  useEffect(() => {
    if (!isTabletorMobile) {
      return;
    }
    // let tmpScrollY = 0;
    if (open && isTabletorMobile) {
      // tmpScrollY = window.scrollY;
      // document.documentElement.style.scrollBehavior = "unset";
      document.documentElement.style.overflowY = "hidden";
      document.body.style.overflowY = "hidden";
    }
    return () => {
      document.documentElement.style.overflowY = "visible";
      document.body.style.overflowY = "visible";
      // window.scrollTo(0, tmpScrollY as number);
      // document.documentElement.style.scrollBehavior = "smooth";
    };
  }, [open, isTabletorMobile]);

  const unlogged = (
    <Fragment>
      <Link href="/connexion">Connexion</Link>
      <Link href="/inscription">Inscription</Link>
    </Fragment>
  );

  const logged = (
    <Fragment>
      {!isTabletorMobile && (
        <div ref={subMenuRef}>
          <Button
            disableRipple
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
          {triggerSubMenu && (
            <SubMenu options={subMenu} logout={handleLogout} />
          )}
        </div>
      )}
    </Fragment>
  );

  return (
    <>
      {open && <BackDropShadow />}
      <AppBar
        className={
          trigger && !isBasket
            ? `${classes.hide} topbar__nav`
            : `${classes.show} topbar__nav`
        }
        position={isBasket ? "fixed" : "sticky"}
      >
        <Toolbar
          style={{ overflowX: isTabletorMobile ? "hidden" : "inherit" }}
          className={
            isBasket
              ? `${styles.navbar__content} ${styles.navbar__basket}`
              : styles.navbar__content
          }
        >
          <div className={styles.navbar__logo}>
            <Link href="/">
              <div
                style={{
                  height: "100%",
                  width: "40px",
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  cursor: "pointer",
                  margin: "15px",
                }}
              >
                <Logo />
              </div>
            </Link>
          </div>
          <div className={styles.navbar__left}>
            {isTabletorMobile && (
              <div className={styles.hamburger}>
                <SearchShoes>
                  <SearchIcon />
                </SearchShoes>
                <Link href="/panier">
                  <Button aria-label="shopping basket" disableRipple>
                    <Basket
                      total={data?.me?.items ? (data?.me?.items as number) : 0}
                    />
                  </Button>
                </Link>
                <Button
                  disableRipple
                  style={{ zIndex: 1500 }}
                  onClick={() => setOpen(!open)}
                  aria-label="menu"
                >
                  {open ? <CloseIcon /> : <MenuIcon />}
                </Button>
              </div>
            )}
            {data && (
              <div
                className={
                  !isTabletorMobile
                    ? `${styles.navbar__links}`
                    : open
                    ? `${styles.navbar__links_small} ${styles.navbar__media}`
                    : `${styles.hide} `
                }
              >
                {!isTabletorMobile && (
                  <>
                    <Link href="/shop">&nbsp;Shop</Link>
                    <Link href="/blog">&nbsp;Blog</Link>
                    <Link href="/marque">&nbsp;MARQUE</Link>
                  </>
                )}
                {isTabletorMobile && (
                  <>
                    <Link href="/shop">&nbsp;Shop</Link>
                    <Link href="/blog">&nbsp;Blog</Link>
                    <Link href="/marque">&nbsp;MARQUE</Link>
                    {data.me && (
                      <>
                        <Link href="/order">&nbsp;Commandes</Link>
                        <Link href="/panier">&nbsp;Panier</Link>
                        <Link href="/order/comments">&nbsp;Evaluer</Link>
                        <a
                          href="/"
                          onClick={(e) => {
                            e.preventDefault();
                            handleLogout();
                          }}
                        >
                          Deconnexion
                        </a>
                      </>
                    )}
                  </>
                )}
                {isTabletorMobile && (
                  <Fragment>{!data?.me ? unlogged : logged}</Fragment>
                )}
              </div>
            )}
          </div>
          {!isTabletorMobile && data && typeof data === "object" && (
            <div className={styles.navbar__right}>
              <div className={styles.search}>
                <SearchShoes>
                  <SearchIcon />
                </SearchShoes>
                <Link href="/panier">
                  <Button disableRipple aria-label="shopping basket">
                    {data && (
                      <Basket
                        total={
                          data?.me?.items ? (data?.me?.items as number) : 0
                        }
                      />
                    )}
                  </Button>
                </Link>
              </div>

              <div
                className={
                  data && data?.me
                    ? styles.navbar__auth
                    : styles.navbar__unlogged
                }
              >
                {data && typeof data === "object" && (
                  <Fragment>{!data?.me ? unlogged : logged}</Fragment>
                )}
              </div>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default memo(TopBar);
