import { Layout } from "../components/Layout";
import { withApollo } from "../utils/withApollo";

interface DeliveryreturnProps {}

const Deliveryreturn: React.FC<DeliveryreturnProps> = ({}) => {
  return (
    <Layout>
      <h1>Politique de retour</h1>
    </Layout>
  );
};
export default withApollo({ ssr: false })(Deliveryreturn);
