import React from "react";
import { withApollo } from "../src/utils/withApollo";
import { Layout } from "../src/components/Layout";
import styles from "../src/styles/LandingPage.module.scss";
import Button from "@material-ui/core/Button";

const Home: React.FC = ({}) => {
  return (
    <Layout>
      <div className="container__shop">
        <div className={styles.container}>
          <div className={`${styles.presentation} ${styles.presentation__row}`}>
            <div
              className={`${styles.presentation__col} ${styles.presentation__left}`}
            >
              <h2>FeelAgain</h2>
              <div className={styles.presentation__line}></div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Obcaecati commodi dolore amet odio possimus necessitatibus
                excepturi laudantium voluptatibus sunt nam aliquid, alias
                expedita velit omnis sequi fugiat a eligendi nemo!
              </p>
              <Button disableRipple>SHOP</Button>
            </div>
            <div className={styles.presentation__col}>
              <div className={styles.presentation_20}>
                <div className={styles.presentation__row}>
                  <div className={styles.presentation_24}></div>
                  <div className={styles.presentation_36}></div>
                </div>
              </div>
              <div className={styles.presentation_40}>
                <div>
                  <div>
                    <img src="/shoes_landing.jpeg"></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.collection}>
            <h2>Shoes Collection</h2>
            <h4>Summer 2021</h4>
            <div className={styles.collection__grid}>
              <div className={styles.item__1}>
                <div className={styles.slide}></div>
              </div>
              <div className={styles.item__2}>
                <div className={styles.slide}></div>
              </div>
              <div className={styles.item__3}>
                <div className={styles.slide}></div>
              </div>
            </div>
          </div>
          <div className={styles.reviews}>
            <h2>Le choix des clients</h2>
            <div className={styles.presentation__line}></div>
            <div>
              <p>
                “Twenty years from now you will be more disappointed by the
                things that you didn’t do than by the ones you did do. So throw
                off the bowlines. Sail away from the safe harbor. Catch the
                trade winds in your sails. Explore. Dream. Discover.”
              </p>
            </div>
          </div>
          <div className={styles.brand}>
            <h2>La marque</h2>
            <div className={styles.presentation__line}></div>
            <div>
              <p>
                FeelAgain sit amet consectetur, adipisicing elit. Molestiae
                aliquid, fugit et voluptate aperiam quas sunt corporis eligendi
                esse sit soluta.
              </p>
            </div>
            <Button style={{ margin: "5px", padding: "10px 15px" }}>
              Lire La Suite
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Home);
