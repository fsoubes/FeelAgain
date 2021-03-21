import React from "react";
import { Layout } from "../src/components/Layout";
import { withApollo } from "../src/utils/withApollo";

interface PanierProps {}

const Panier: React.FC<PanierProps> = ({}) => {
  return (
    <Layout>
      <div className="container__shop">
        <h1>Votre panier</h1>
      </div>
    </Layout>
  );
};
export default withApollo({ ssr: true })(Panier);
