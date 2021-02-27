import { createMuiTheme, ThemeOptions } from "@material-ui/core";

export const paletteColorsDark = {
  primary: "#24292e",
  secondary: "#3282b8",
  error: "#E44C65",
  background: "#0d1117",
  background_secondary: "#121f31",
  background_border: "#0a101a",
  background_hover: "#1f2e41",
  text: "#8b949e",
};

export const paletteColorsLight = {
  primary: "#24292e",
  secondary: "#ffe0ac",
  error: "#E44C65",
  background: "#ECF0F5",
  background_secondary: "#f0f0f0",
  background_border: "#0a101a",
  background_hover: "#d4d3d3",
  text: "#050505",
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
      MuiCssBaseline: {
        "@global": {
          ".Article_container__article__2aXmw": {
            height: "100%",
            background: paletteColors.background_secondary,
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
