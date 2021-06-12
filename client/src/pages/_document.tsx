import { ReactElement, Children, ReactEventHandler } from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/core/styles";
import { darkTheme as theme } from "../theme";
import { name } from "../constants/constants";

export default class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <meta name="apple-mobile-web-app-title" content={name} />
          <meta name="application-name" content={name} />
          <meta property="og:locale" content="en_GB" />
          <link rel="icon" type="image/png" href="/devx.png" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            type="text/css"
            as="style"
            onLoad={
              ("this.rel=`stylesheet`" as unknown) as ReactEventHandler<
                HTMLLinkElement
              >
            }
          ></link>
          {/* <link
            rel="prefetch"
            as="font"
            type="font/woff2"
            href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0"
            onLoad={
              ("this.rel=`stylesheet`" as unknown) as ReactEventHandler<
                HTMLLinkElement
              >
            }
            crossOrigin={"anonymous"}
          /> */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Alex+Brush|Roboto+Slab:300,400,500,700&display=swap|Lato:300,400,500,700&display=swap|Spectral&display=swap"
            type="text/css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};
