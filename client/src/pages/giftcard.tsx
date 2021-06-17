import { Layout } from "../components/Layout";
import { withApollo } from "../utils/withApollo";

interface GiftcardProps {}

const Giftcard: React.FC<GiftcardProps> = ({}) => {
  return (
    <Layout>
      <h1>Carte cadeau</h1>
    </Layout>
  );
};
export default withApollo({ ssr: false })(Giftcard);
