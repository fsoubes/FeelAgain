import { Layout } from "../components/Layout";
import { withApollo } from "../utils/withApollo";
import Head from "../components/SEO/Head";

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
      <h1>Marque FeelAgain</h1>
    </Layout>
  );
};
export default withApollo({ ssr: false })(Marque);
