import { Layout } from "../components/Layout";
import { withApollo } from "../utils/withApollo";
import Head from "../components/SEO/Head";
import styles from "../styles/Brand.module.scss";

interface MarqueProps {}

const Marque: React.FC<MarqueProps> = ({}) => {
  return (
    <Layout>
      <Head
        title={"Histoire de la marque feelagain"}
        description={
          "Pourquoi Feelagain est une marque unique dans la vente de chaussures?"
        }
      />
      <section className={`${styles.section__1} ${styles.brand__header}`}>
        <div className={` ${styles.sheet}`}>
          <div className={styles.header__info}>
            <h1>FeelAgain</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
              maiores quaerat dicta, nostrum ducimus iusto? Repudiandae tempore
              maxime exercitationem temporibus expedita quibusdam, magni, quasi
              vitae quae laborum commodi cupiditate molestiae?
            </p>
          </div>
          <div className={`${styles.shape__1}`}></div>
        </div>
      </section>
      <section className={`${styles.section__2} `}>
        <div className={`${styles.sheet}`}>
          <div className={`${styles.shape__2}`} />
          <div className={`${styles.container}`}>
            <div className={styles.layout}>
              <div className={styles.layout__row}>
                <div className={`${styles.cell__1} `}>
                  <div className={styles.container__layout}>
                    <h3>Vision futuriste</h3>
                    <div className={styles.white__line} />
                    <p>
                      Accusantium laudantium adipisci officiis expedita illum
                      enim rem nam.
                    </p>
                  </div>
                </div>
                <div className={`${styles.cell__2} `}>
                  <div className={styles.container__layout}>
                    <h3>Conception innovante</h3>
                    <div className={styles.white__line} />
                    <p>
                      Accusantium laudantium adipisci officiis expedita illum
                      enim rem nam.
                    </p>
                  </div>
                </div>
                <div className={`${styles.cell__3} `}>
                  <div className={styles.container__layout}>
                    <h3>Produits responsables</h3>
                    <div className={styles.white__line} />
                    <p>
                      Accusantium laudantium adipisci officiis expedita illum
                      enim rem nam.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.vertical__line}></div>
      </section>
      <section>
        <div className={`${styles.section__3} ${styles.sheet}`}>
          <div className={`${styles.sheet}`}>
            <div className={`${styles.container}`}>
              <div className={styles.content}>
                <h2>Des idées aux chaussures</h2>
                <div className={styles.info}>
                  <div className={styles.horizontal__line}>
                    <div></div>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Reprehenderit veritatis asperiores alias dicta nemo aliquid
                    sunt cum. Quidem reprehenderit, accusamus amet dignissimos
                    alias obcaecati deserunt vel voluptatem. Aliquam, itaque
                    maxime! Quisque fringilla sit amet dolor commodo efficitur.
                    Aliquam et sem odio. In ullamcorper nisi nunc, et molestie
                    ipsum iaculis sit amet.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className={styles.section__4}></div>
      </section>
      <section>
        <div className={styles.section__5}>
          <div className={`${styles.sheet}`}>
            <h2>Pourquoi nos chaussures ?</h2>
          </div>
        </div>
      </section>
      <section>
        <div className={styles.section__6}>
          <div className={`${styles.sheet}`}>
            <h2>Contactez Nous</h2>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default withApollo({ ssr: false })(Marque);
