import { Layout } from "../components/Layout";
import { withApollo } from "../utils/withApollo";

interface DeliveryreturnProps {}

const Deliveryreturn: React.FC<DeliveryreturnProps> = ({}) => {
  return (
    <Layout>
      <h1>Hello</h1>
    </Layout>
  );
};
export default withApollo({ ssr: false })(Deliveryreturn);
