import { Layout } from "../components/Layout";
import { withApollo } from "../utils/withApollo";

interface FaqProps {}

const Faq: React.FC<FaqProps> = ({}) => {
  return (
    <Layout>
      <h1>FAQ</h1>
    </Layout>
  );
};
export default withApollo({ ssr: false })(Faq);
