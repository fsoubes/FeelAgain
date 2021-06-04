import React from "react";
import { Layout } from "../components/Layout";
import { withApollo } from "../utils/withApollo";

interface MarqueProps {}

const Marque: React.FC<MarqueProps> = ({}) => {
  return (
    <Layout>
      <h1>Marque FeelAgain</h1>
    </Layout>
  );
};
export default withApollo({ ssr: false })(Marque);
