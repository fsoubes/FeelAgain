import React, { Fragment, useEffect } from "react";
import { ThemeProvider } from "../src/theme";
import "../src/styles/global.scss";
import Head from "next/head";
import { Footer } from "../src/components/Footer";
import { useRouter } from "next/router";
import Dashboard from "./dashboard";

function MyApp({ Component, pageProps }: any) {
  const router = useRouter();

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  console.log(router.pathname.startsWith("/dashboard/"));

  return (
    <Fragment>
      <Head>
        <title>FSoWeb Boilerplate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <ThemeProvider>
          {router.pathname.startsWith("/dashboard/") ? (
            <Dashboard>
              <Component {...pageProps} />
            </Dashboard>
          ) : (
            <Component {...pageProps} />
          )}
          <Footer></Footer>
        </ThemeProvider>
      </div>
    </Fragment>
  );
}

export default MyApp;
