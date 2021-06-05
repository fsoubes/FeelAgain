import { Layout } from "../components/Layout";
import { withApollo } from "../utils/withApollo";

interface CgvProps {}

const Cgv: React.FC<CgvProps> = ({}) => {
  return (
    <Layout>
      <h1>Hello</h1>
    </Layout>
  );
};
export default withApollo({ ssr: false })(Cgv);
