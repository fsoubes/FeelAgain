import { withApollo } from "../src/utils/withApollo";
import { Layout } from "../src/components/Layout";

const Home: React.FC = ({}) => {
  return (
    <Layout>
      <h1>Home Page</h1>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Home);
