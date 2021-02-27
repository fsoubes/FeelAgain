import React, { Fragment, useEffect } from "react";
import { ThemeProvider } from "../src/theme";
import "../src/styles/global.scss";
import Head from "next/head";
import { Footer } from "../src/components/Footer";

function MyApp({ Component, pageProps }: any) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <title>FSoWeb Boilerplate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <ThemeProvider>
          <Component {...pageProps} />
          <Footer></Footer>
        </ThemeProvider>
      </div>
    </Fragment>
  );
}

export default MyApp;
