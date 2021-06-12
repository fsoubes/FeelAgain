import { createMuiTheme, ThemeOptions } from "@material-ui/core";

export const paletteColorsDark = {
  primary: "rgba(13,17,23)",
  header: "rgba(13,17,23,0.85)",
  secondary: "#3282b8",
  error: "#E44C65",
  background: "#0d1117",
  background_secondary: "#121f31",
  background_border: "#0a101a",
  background_hover: "#1f2e41",
  text: "#8b949e",
  logo: "#f0f0f0",
};

export const paletteColorsLight = {
  primary: "rgba(236,240,245)",
  header: "rgba(236,240,245,0.85)",
  secondary: "#ffe0ac",
  error: "#E44C65",
  background: "#ECF0F5",
  background_secondary: "#f0f0f0",
  background_border: "#0a101a",
  background_hover: "#d4d3d3",
  text: "#050505",
  logo: "#000",
};

const options = (dark: boolean): ThemeOptions => {
  const paletteColors = dark ? paletteColorsDark : paletteColorsLight;
  return {
    palette: {
      type: dark ? "dark" : "light",
      primary: {
        main: paletteColors.primary,
      },
      secondary: {
        main: paletteColors.secondary,
      },
      error: {
        main: paletteColors.error,
      },
      background: {
        default: paletteColors.background,
      },
      text: {
        primary: paletteColors.text,
      },
    },

    typography: {
      fontFamily: "Lato",
      h1: {
        fontFamily: "Roboto Slab",
        fontWeight: 300,
        fontSize: "96px",
        lineHeight: "127px",
        letterSpacing: "-1.5px",
      },
      h2: {
        fontFamily: "Roboto Slab",
        fontWeight: 300,
        fontSize: "60px",
        lineHeight: "79px",
        letterSpacing: "-0.5px",
      },
      h3: { fontFamily: "Roboto Slab", fontSize: "48px", lineHeight: "63px" },
      h4: {
        fontFamily: "Roboto Slab",
        fontSize: "34px",
        lineHeight: "45px",
        letterSpacing: "0.25px",
      },
      h5: { fontFamily: "Lato", fontSize: "24px", lineHeight: "32px" },
      h6: {
        fontFamily: "Lato",
        fontWeight: 500,
        fontSize: "20px",
        lineHeight: "26px",
        letterSpacing: "0.15px",
      },
      subtitle1: {
        fontFamily: "Lato",
        fontSize: "16px",
        lineHeight: "19px",
        letterSpacing: "0.15px",
      },
      subtitle2: {
        fontFamily: "Lato",
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "16.41px",
        letterSpacing: "0.1px",
      },
      body1: {
        fontFamily: "Lato",
        fontSize: "18px",
        lineHeight: "200%",
        letterSpacing: "0.5px",
      },
      body2: {
        fontFamily: "Lato",
        fontSize: "14px",
        lineHeight: "24px",
        letterSpacing: "0.25px",
      },
      button: {
        fontFamily: "Lato",
        fontWeight: 500,
        fontSize: "14px",
        letterSpacing: "1.25px",
      },

      caption: {
        fontFamily: "Lato",
        fontSize: "12px",
        lineHeight: "14px",
        letterSpacing: "0.4px",
      },
      overline: {
        fontFamily: "Lato",
        fontSize: "10px",
        lineHeight: "12px",
        letterSpacing: "1.5px",
      },
    },

    overrides: {
      MuiButton: {
        containedPrimary: {
          backgroundColor: paletteColors.logo,
          color: paletteColors.background,
          "&:hover": {
            backgroundColor: "none",
          },
        },
        root: {
          /* backgroundColor: paletteColors.logo,
          color: paletteColors.background, */
          "&:hover": {
            backgroundColor: "none",
          },
        },
      },
      MuiCssBaseline: {
        "@global": {
          ".topbar__nav": {
            background: ` ${paletteColors.header} !important`,
          },

          ".Blog_load__more__QKcLm button": {
            color: paletteColors.logo,
            border: `1px solid ${paletteColors.logo} !important`,
          },

          ".Article_container__article__2aXmw": {
            height: "100%",
            background: paletteColors.background_secondary,
          },

          ".TopBar_navbar__media__3rHEr": {
            background: `${paletteColors.header} !important`,
          },
          ".SubMenu_container__1zZPZ": {
            background: paletteColors.background,
          },

          ".TopBar_navbar__content__1oFdZ .TopBar_inscription__2NQX8": {
            borderColor: paletteColors.logo,
          },
          ".TopBar_navbar__content__1oFdZ .TopBar_navbar__links__1g4N8 a:before": {
            backgroundColor: paletteColors.logo,
          },
          ".Home_articles__container_item__3OBYe": {
            background: paletteColors.background_secondary,
          },
          ".Home_articles__container_item__3OBYe:hover": {
            textDecoration: "none",
            color: paletteColors.text,
            background: paletteColors.background_hover,
            fontWeight: 900,
          },
          ".Footer_footer__9WsPL::before": {
            background: paletteColors.text,
          },
          ".TopBar_hamburger__2Eu_G": {
            color: paletteColors.text,
          },
          ".TopBar_navbar__content__1oFdZ::before": {
            background: paletteColors.logo,
          },
          ".TopBar_navbar__auth__3H0RW button::after": {
            color: paletteColors.logo,
          },
          ".TopBar_navbar__links__1g4N8 > button > span:hover": {
            borderBottom: `1px solid ${paletteColors.logo}`,
          },
          ".TopBar_search__1abMT": {
            borderRight: `1px solid ${paletteColors.logo}`,
          },
          ".DashboardMenu_sidebar__container__20Y3N": {
            background: paletteColors.primary,
          },
          ".cls-1, .cls-2, .cls-3": {
            stroke: paletteColors.logo,
          },

          "#basket .cls-1, #basket .cls-2": {
            stroke: paletteColors.logo,
          },
          "html body div#__next div.container footer div.Footer_footer__9WsPL div.Footer_logo__2n8aq svg#Calque_1 path.cls-1": {
            stroke: `${paletteColors.logo} !important`,
          },
          html: {
            height: "100%",
            padding: 0,
            margin: 0,
            width: "100vw",
          },
          body: {
            height: "100%",
            padding: 0,
            margin: 0,
            width: "100vw",
            overflowX: "hidden",
          },
          a: {
            textDecoration: "none",
            fontWeight: 900,
            color: paletteColors.text,
          },
        },
      },
    },
  };
};

export const darkTheme = createMuiTheme(options(true));
export const lightTheme = createMuiTheme(options(false));

export default darkTheme;
