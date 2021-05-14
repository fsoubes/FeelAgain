import React, { Fragment, useEffect } from "react";
import { ThemeProvider } from "../src/theme";
import "../src/styles/global.scss";
import Head from "next/head";
import { Footer } from "../src/components/Footer";
import { useRouter } from "next/router";
import Dashboard from "./dashboard";
import UpwardScroll from "../src/components/ScrollUp/UpwardScroll";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "../src/libs/AlertTemplate/index";

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_RIGHT,
  timeout: 3000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

function MyApp({ Component, pageProps }: any) {
  const router = useRouter();

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
        <AlertProvider template={AlertTemplate} {...options}>
          <ThemeProvider>
            <UpwardScroll />
            {router.pathname.startsWith("/dashboard/") ? (
              <Dashboard>
                <Component {...pageProps} />
              </Dashboard>
            ) : (
              <Component {...pageProps} />
            )}
            <Footer></Footer>
          </ThemeProvider>
        </AlertProvider>
      </div>
    </Fragment>
  );
}

export default MyApp;
