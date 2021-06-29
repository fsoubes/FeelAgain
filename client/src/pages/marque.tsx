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
      <section className={styles.brand__header}>
        <div className={styles.content}>
          <div className={styles.header__info}>
            <h1>FeelAgain</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
              maiores quaerat dicta, nostrum ducimus iusto? Repudiandae tempore
              maxime exercitationem temporibus expedita quibusdam, magni, quasi
              vitae quae laborum commodi cupiditate molestiae?
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default withApollo({ ssr: false })(Marque);
